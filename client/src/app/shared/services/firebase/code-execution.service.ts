import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeExecutionService {
  constructor(private http: HttpClient) {}

  runCode(
    code: string,
    testcases: { input: string; expected_output: string }[]
  ) {
    const payload = {
      code,
      language_id: 71,
      testCases: testcases,
    };

    return this.http.post(
      'https://runcode-aechosnosa-uc.a.run.app/runCode',
      payload
    );
  }
}
