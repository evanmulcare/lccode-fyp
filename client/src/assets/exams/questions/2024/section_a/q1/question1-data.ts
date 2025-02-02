export const question1Data = {
  examId: '001',
  questions: [
    {
      id: 'q1',
      questionSrc: 'assets/exams/questions/2024/section_a/q1/question1.md',
      questionText:
        'Please study the code carefully and then answer the following question. Given the following six lines of code from a program, for each line, fill in the value stored in the variable answer.',
      codeLines: [
        'answer = 7',
        "name = 'Robin'",
        'answer += 1',
        'name = answer',
        "answer = 'Charlie'",
        'answer = name',
      ],
      template:
        '<div class="space-y-6">\n  <div class="p-6 mx-auto bg-white rounded-lg shadow-md markdown-body">\n    <table class="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">\n      <thead>\n        <tr class="border-b border-gray-200 bg-gray-50">\n          <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Lines of Python Code</th>\n          <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Value stored in “answer” at each line</th>\n        </tr>\n      </thead>\n      <tbody>\n        {{rows}}\n      </tbody>\n    </table>\n  </div>\n</div>',
      answers: ['7', '7', '8', '8', 'Charlie', '8'],
    },
  ],
};
