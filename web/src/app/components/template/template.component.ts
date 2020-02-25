import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITab } from '@typings/Tab';
import { ITemplate } from '@typings/Template';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cg-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  @Input() template: BehaviorSubject<ITemplate>;
  @Input() tabs: BehaviorSubject<Array<ITab>>;

  active = 1;
  inputs: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addTab();
    this._watchTabsChanges();
  }

  private _watchTabsChanges() {
    this.inputs = this.formBuilder.group({});
    return this.tabs.subscribe(tabs => tabs.forEach(tab => {
      const tabId = tab.id.toString();
      if (this.inputs.get(tabId)) {
        return;
      }
      const control = this.formBuilder.control(_get(tab, 'template.text', ''));
      control.valueChanges.subscribe(value => {
        const currentTabs = this.tabs.value;
        const currentTab = currentTabs.find(cTab => cTab.id === tab.id);
        _set(currentTab, 'template.text', value);
        this.tabs.next(currentTabs);
      });
      this.inputs.addControl(
        tabId,
        control
      );
    }));
  }

  input(tab: ITab) {
    return this.inputs.get(tab.id.toString());
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