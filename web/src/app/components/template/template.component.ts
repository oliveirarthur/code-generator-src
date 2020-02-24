import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { ITemplate } from '@typings/Template';
import { BehaviorSubject } from 'rxjs';
import _get from 'lodash/get';

@Component({
  selector: 'cg-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  @Input() template: BehaviorSubject<ITemplate>;
  @Input() tabs: BehaviorSubject<Array<ITab>>;
  active = 1;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addTab();
  }

  templateInput(tab: ITab): FormControl {
    const formControl = this.formBuilder.control(_get(tab, 'template.text', ''));
    formControl.valueChanges.subscribe(value => tab.template.text = value);
    return formControl;
  }

  addTab(event: MouseEvent = null) {
    if (event) {
      event.preventDefault();
    }

    const tabs = this.tabs.value;
    const name = (new Date()).toLocaleString();
    tabs.push({
      id: tabs.length,
      name,
      template: {
        text: 'Test text {{ a }} ' + name,
      },
    });
    this.tabs.next(tabs);
    this.active = this.tabs.value[0].id;
  }


  closeTab(event: MouseEvent, toRemove: number) {
    event.preventDefault();
    event.stopImmediatePropagation();

    // if (!confirm('Are you sure?')) {
    //   return;
    // }

    const tabs = this.tabs.value.filter(tab => tab.id !== toRemove);
    this.tabs.next(tabs);
  }

}
