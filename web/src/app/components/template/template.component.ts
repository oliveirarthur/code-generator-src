import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import _get from 'lodash/get';

@Component({
  selector: 'cg-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  tabs = this.dataSvc.tabs;

  active = 1;

  constructor(
    private formBuilder: FormBuilder,
    private readonly dataSvc: DataService,
  ) { }

  ngOnInit(): void {
    this.addTab();
    this._watchTabsChanges();
  }

  private _watchTabsChanges() {
    return this.tabs.subscribe(tabs => {
      const tabsWithNewFormControls = tabs
        .filter(tab => !tab.formControl)
        .map(tab => {
            tab.formControl = this.formBuilder.control(_get(tab, 'template.text', ''));
            tab.formControl.valueChanges.subscribe(value => {
              tab.template.text = value;
              this.dataSvc.dataChanged$.next();
            });
        });

      if (tabsWithNewFormControls.length > 0) {
        this.tabs.next(tabs);
      }

    });
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
