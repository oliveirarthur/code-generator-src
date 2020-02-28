import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { ITemplate } from '@typings/Template';
import { BehaviorSubject, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tabs = new BehaviorSubject<Array<ITab>>([]);
  template = new BehaviorSubject<ITemplate>({
    text: `Test text {{ a }}`,
  } as ITemplate);
  variables = this.formBuilder.array([]);

  data = merge(
    this.tabs,
    this.template,
    this.variables,
  );

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  exportAll() {
    return {
      variables: this.variables.value,
      template: this.template.value,
      tabs: this.tabs.value,
    };
  }

}
