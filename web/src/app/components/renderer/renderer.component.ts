import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { environment } from '@environments/environment';
import { ITab } from '@typings/Tab';
import { IProcessedTemplate, IProcessedTemplateError, ITemplate } from '@typings/Template';
import { IVariable } from '@typings/Variable';
import * as Handlebars from 'handlebars';
import _get from 'lodash/get';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'cg-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.sass']
})
export class RendererComponent implements OnInit {

  tabs = this.dataSvc.tabs;
  template = this.dataSvc.template;
  variables = this.dataSvc.variables;

  private variablesReduced = new BehaviorSubject<any>({});

  active = 0;
  processedTemplates = new BehaviorSubject<IProcessedTemplate>({});
  errors = new BehaviorSubject<IProcessedTemplateError>({});

  constructor(
    private readonly dataSvc: DataService,
  ) { }

  ngOnInit(): void {
    this._reduceVariables();
    this._watchInputChanges();
  }

  private _watchInputChanges(): Subscription {
    const variablesChangesSubscription = this.variables.valueChanges.subscribe(() => {
      return this._reduceVariables();
    });

    return merge(
      this.tabs,
      this.variablesReduced,
    ).pipe(
      debounceTime(environment.debounceTime),
    ).subscribe(() => {
      this._renderTabTemplates();
    }).add(variablesChangesSubscription);
  }

  private _reduceVariables(): any {
    const variablesReduced = this.variables.value.reduce((acc, variable: IVariable) => {
      acc[variable.name] = variable.value;
      return acc;
    }, {});
    this.variablesReduced.next(variablesReduced);
    return variablesReduced;
  }

  private _renderTabTemplates(): IProcessedTemplate {
    const processedTemplates = this.tabs.value.reduce((acc, tab) => {
      try {
        const templateText = _get(tab, 'template.text');
        const processedTemplate = Handlebars.compile(templateText)(this.variablesReduced.value);
        acc[tab.id] = processedTemplate;
      } catch (error) {
        this.errors.next({
          ...this.errors.value,
          [tab.id]: error,
        });
      }
      return acc;
    }, {});
    this.processedTemplates.next(processedTemplates);
    return processedTemplates;
  }

}
