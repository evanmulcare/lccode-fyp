import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CodeExecutionService } from '../../services/firebase/code-execution.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent {
  @Input() placeholder: string | undefined;
  @Input() basecodesource: string | undefined;
  @Input() testcases: { input: string; expected_output: string }[] = [];
  results: {
    input: string;
    output: string;
    expected: string;
    passed: boolean;
  }[] = [];

  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  selectedLanguage: string = 'Python';
  dropdownOpen: boolean = false;
  editorInstance: any;
  isLoading = false;

  private defaultCode: string = '';

  private defaultEditorOptions = {
    theme: 'vs-dark',
    language: 'python',
    fontSize: 18,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
      alwaysConsumeMouseWheel: false,
    },
    lineNumbers: 'on',
    wordWrap: 'on',
    glyphMargin: false,
    folding: true,
    renderLineHighlight: 'all',
    cursorSmoothCaretAnimation: true,
    scrollBeyondLastLine: false,
  };

  editorOptions = { ...this.defaultEditorOptions };
  code: string = this.defaultCode;
  testResults: {
    input: string;
    expectedOutput: string;
    userOutput: string;
    passed: boolean;
  }[] = [];

  constructor(
    private codeExecutionService: CodeExecutionService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('LOGGED', this.basecodesource, this.testcases);

    this.updateEditorHeight();
    this.loadDefaultCode();
  }

  updateCodeFromPlaceholder() {
    if (this.placeholder) {
      this.defaultCode = this.placeholder;
      this.code = this.defaultCode;
    }
  }

  onEditorInit(editor: any) {
    this.editorInstance = editor;
    this.updateEditorHeight();
    editor.onDidScrollChange(() => this.adjustEditorHeight());
  }

  updateEditorHeight() {
    if (this.editorInstance) {
      const contentHeight = this.editorInstance.getContentHeight();
      const minHeight = 400;
      this.editorContainer.nativeElement.style.height = `${Math.max(
        minHeight,
        contentHeight
      )}px`;
      this.editorInstance.layout();
    }
  }

  adjustEditorHeight() {
    if (this.editorInstance) {
      const viewport = this.editorInstance.getVisibleRanges()[0];
      if (viewport) {
        const contentHeight = this.editorInstance.getContentHeight();
        const currentLine = this.editorInstance.getPosition().lineNumber;
        const totalLines = this.editorInstance.getModel().getLineCount();
        const linesFromBottom = totalLines - currentLine;

        if (linesFromBottom <= 10) {
          const additionalHeight = 200;
          this.editorContainer.nativeElement.style.height = `${Math.max(
            contentHeight + additionalHeight,
            400
          )}px`;
          this.editorInstance.layout();
        }
      }
    }
  }

  onCodeChange() {
    setTimeout(() => this.updateEditorHeight(), 0);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.dropdownOpen = false;
    this.editorOptions = {
      ...this.editorOptions,
      language: language.toLowerCase(),
    };
  }

  resetEditor() {
    if (this.editorInstance) {
      this.editorOptions = { ...this.defaultEditorOptions };
      this.code = this.defaultCode;
      this.editorInstance.setValue(this.defaultCode);
      this.editorInstance.updateOptions(this.defaultEditorOptions);
      this.updateEditorHeight();
    }
  }

  runCode() {
    this.isLoading = true;
    this.results = [];

    this.codeExecutionService.runCode(this.code, this.testcases).subscribe(
      (response: any) => {
        console.log('Results from Backend:', response);

        this.testcases.forEach((testcase, index) => {
          const result = response[index];

          this.results.push({
            input: testcase.input,
            output: result.userOutput,
            expected: testcase.expected_output,
            passed: result.passed,
          });
        });

        this.isLoading = false;
      },
      (error) => {
        console.error('Error in running code:', error);
        this.isLoading = false;
      }
    );
  }

  loadDefaultCode() {
    console.log('CALLED DEFAULT', this.basecodesource);
    const markdownURL = this.basecodesource;
    if (markdownURL) {
      this.fetchDefaultCodeFromUrl(markdownURL).subscribe(
        (code: string) => {
          console.log('FETCHED', code);
          this.defaultCode = code;
          this.code = this.defaultCode;
        },
        (error) => {
          console.error('Error fetching default code:', error);
        }
      );
    }
  }

  fetchDefaultCodeFromUrl(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  get allPassed(): boolean {
    return this.results.every((result) => result.passed);
  }
}
