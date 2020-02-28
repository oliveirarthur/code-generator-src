import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { IVariable } from '@typings/Variable';

@Component({
  selector: 'cg-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.sass']
})
export class VariablesComponent implements OnInit {

  variables = this.dataSvc.variables;

  constructor(
    private formBuilder: FormBuilder,
    private readonly dataSvc: DataService,
  ) { }

  ngOnInit(): void {
    this.addVariable({
      name: `a`,
      value: '10'
    });
  }

  addVariable(params: IVariable = {
    name: '',
    value: '',
  }): FormGroup {
    const formGroup = this.formBuilder.group(params);
    this.variables.push(formGroup);
    return formGroup;
  }

  removeVariable(
    variable: FormGroup,
    index: number,
  ) {
    const variableName = variable.get('name').value;
    if (!confirm(`Remove variable ${variableName}?`)) {
      return;
    }
    this.variables.removeAt(index);
  }

}
