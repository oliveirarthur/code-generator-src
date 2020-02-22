import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IVariable } from '@typings/Variable';

@Component({
  selector: 'cg-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit {
  variables = this.formBuilder.array([]);

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.addVariable();
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
