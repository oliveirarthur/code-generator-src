import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { IVariable } from '@typings/Variable';
import { BehaviorSubject, merge } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tabs = new BehaviorSubject<Array<ITab>>([]);
  variables = this.formBuilder.array([]);

  data = merge(
    this.tabs,
    this.variables,
  ).pipe(
    distinctUntilChanged((a, b) => {
      return JSON.stringify(a) !== JSON.stringify(b);
    }),
  );

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  exportAll() {
    return {
      variables: this.variables.value,
      tabs: this.tabs.value,
    };
  }

  addVariable(variableData = {}, index: number = -1) {
    const formGroup = this.formBuilder.group(variableData);
    if (index > -1) {
      this.variables.insert(index, formGroup);
    } else {
      this.variables.push(formGroup);
    }
    return formGroup;
  }

  setVariableValue(variableData: IVariable, index: number) {
    const variable = this.variables.at(index);
    if (!variable) {
      return this.addVariable(variableData, index);
    }
    variable.setValue(variableData);
  }

}
