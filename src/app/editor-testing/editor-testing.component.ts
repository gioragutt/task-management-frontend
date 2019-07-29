import { Component, ViewChild } from '@angular/core';
import { MonacoOptions, MonacoEditorComponent } from '@materia-ui/ngx-monaco-editor';
import { editor } from 'monaco-editor';

@Component({
  selector: 'app-editor-testing',
  templateUrl: './editor-testing.component.html',
  styleUrls: ['./editor-testing.component.scss'],
})
export class EditorTestingComponent {
  @ViewChild(MonacoEditorComponent, { static: false }) editor: MonacoEditorComponent;

  opts: editor.IEditorConstructionOptions;
  themes = ['vs', 'vs-dark', 'hc-black'];

  editorOptions: MonacoOptions = {
    theme: 'high-contrast-dark',
    language: 'json',
    minimap: 'false',
  };

  code = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode = 'function x() { // TODO }';

  onThemeChanged(event: any) {
    this.changeEditorSetting('theme', event.target.value);
  }

  onMinimapChanged(event: any) {
    const minimap: editor.IEditorMinimapOptions = {
      enabled: event.target.checked,
    };
    this.editor.editor.updateOptions({ minimap });
  }

  private changeEditorSetting<K extends keyof MonacoOptions>(setting: K, value: MonacoOptions[K]) {
    this.editorOptions = {
      ...this.editorOptions,
      [setting]: value,
    };
  }

  // https://github.com/fge/json-schema-avro
}
