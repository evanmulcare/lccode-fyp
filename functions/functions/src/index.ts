import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import * as cors from "cors";

admin.initializeApp();
const corsHandler = cors({ origin: true });

const JUDGE0_BASE_URL = "http://35.193.57.144:2358";

interface TestCase {
  input: string;
  expected_output: string;
}

interface RequestBody {
  code: string;
  language_id: number;
  testCases: TestCase[];
}

interface Result {
  passed: boolean;
  userOutput?: string;
  expectedOutput?: string;
  error?: string;
}

export const runCode = onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("Request received:", req.body);

    const { code, language_id, testCases }: RequestBody = req.body;
    const results: Result[] = [];

    try {
      for (const testCase of testCases) {
        const payload = {
          source_code: code,
          language_id,
          stdin: testCase.input,
        };

        const response = await axios.post(
          `${JUDGE0_BASE_URL}/submissions/?base64_encoded=false&wait=false`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 201) {
          const token = response.data.token;

          const result = await checkResult(
            token,
            normalizeString(testCase.expected_output)
          );
          results.push(result);
        } else {
          results.push({ passed: false, error: "Error submitting code." });
        }
      }

      res.json(results);
    } catch (error) {
      console.error("Error running test cases:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

const checkResult = async (
  token: string,
  expectedOutput: string
): Promise<Result> => {
  let statusId = 1;
  let response;

  while (statusId === 1 || statusId === 2) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      response = await axios.get(
        `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error fetching submission result:", error);
      return { passed: false, error: "Error fetching submission result" };
    }

    if (response && response.data) {
      statusId = response.data.status_id;
    } else {
      console.error("No response or response data is undefined.");
      return { passed: false, error: "No response from Judge0 service." };
    }
  }

  const userOutput = response?.data.stdout;

  if (!userOutput) {
    console.error("No output from the code execution.");
    return { passed: false, error: "No output from code execution." };
  }

  const passed =
    normalizeString(expectedOutput) === normalizeString(userOutput);

  return {
    passed,
    userOutput,
    expectedOutput,
  };
};

const normalizeString = (str: string): string => {
  try {
    const decodedStr = JSON.parse(`"${str}"`);
    return decodedStr.trim();
  } catch (e) {
    return str.trim();
  }
};
