import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { ITemplate } from '@typings/Template';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  variables = this.formBuilder.array([]);
  template = new BehaviorSubject<ITemplate>({
    text: `Test text {{ a }}`,
  } as ITemplate);
  tabs = new BehaviorSubject<Array<ITab>>([]);

  constructor(
    private formBuilder: FormBuilder,
  ) { }
}
