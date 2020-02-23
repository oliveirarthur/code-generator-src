import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IVariable } from '@typings/Variable';

@Component({
  selector: 'cg-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.sass']
})
export class VariablesComponent implements OnInit {

  @Input() variables: FormArray;

  constructor(
    private formBuilder: FormBuilder,
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
