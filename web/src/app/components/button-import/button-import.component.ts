import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { ITab } from '@typings/Tab';
import { IVariable } from '@typings/Variable';

@Component({
  selector: 'cg-button-import',
  templateUrl: './button-import.component.html',
  styleUrls: ['./button-import.component.sass']
})
export class ButtonImportComponent implements OnInit {

  fileReader: FileReader;

  constructor(
    private readonly dataSvc: DataService,
  ) { }

  ngOnInit(): void {
    this._setupFileReader();
  }

  _setupFileReader() {
    this.fileReader = new FileReader();
    this.fileReader.onload = e => {
      return this._parseFile(this.fileReader.result.toString());
    };
  }

  _parseFile(content: string) {
    try {
      const parsedContent = JSON.parse(content);
      const tabs: Array<ITab> = parsedContent.tabs;
      const variables: Array<IVariable> = parsedContent.variables;

      this.dataSvc.tabs.next(tabs);
      variables.forEach((variable, i) => {
        this.dataSvc.setVariableValue(variable, i);
      });

    } catch (error) {
      // TODO: show error message
      alert('Unable to parse file');
      console.error(error);
    }
  }

  handleImport(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files);
    files.forEach(file => {
      this.fileReader.readAsText(file);
    });
  }

}
