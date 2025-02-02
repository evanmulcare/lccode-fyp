import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
})
export class CodeEditorComponent {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  selectedLanguage: string = 'JavaScript';
  dropdownOpen: boolean = false;
  editorInstance: any;
  private defaultCode: string =
    'function x() {\nconsole.log("Hello world!");\n}';

  private defaultEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
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

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.updateEditorHeight();
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
}
