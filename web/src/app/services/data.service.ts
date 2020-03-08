import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { IVariable } from '@typings/Variable';
import _cloneDeep from 'lodash/cloneDeep';
import { BehaviorSubject, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tabs = new BehaviorSubject<Array<ITab>>([]);
  variables = this.formBuilder.array([]);

  public dataChanged$ = new BehaviorSubject<void>(null);

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this._watchDataChanges();
  }

  private _watchDataChanges() {
    return merge(this.tabs, this.variables.valueChanges)
      .subscribe(() => {
        this.dataChanged$.next();
      });
  }

  exportAll() {
    const tabs = this.tabs.value.map(tab => {
      const newTab = _cloneDeep(tab);
      delete newTab.formControl;
      return newTab;
    });
    return {
      variables: this.variables.value,
      tabs,
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
