import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { environment } from '@environments/environment';
import { ITab } from '@typings/Tab';
import { IProcessedTemplate, IProcessedTemplateError } from '@typings/Template';
import { IVariable } from '@typings/Variable';
import * as Handlebars from 'handlebars';
import _get from 'lodash/get';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'cg-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.sass']
})
export class RendererComponent implements OnInit {

  tabs = this.dataSvc.tabs;
  variables = this.dataSvc.variables;

  private variablesReduced = new BehaviorSubject<any>({});

  active = 0;
  processedTemplates = new BehaviorSubject<IProcessedTemplate>({});
  errors = new BehaviorSubject<IProcessedTemplateError>({});

  constructor(
    private readonly dataSvc: DataService,
    private readonly clipboardService: ClipboardService,
  ) { }

  ngOnInit(): void {
    this._reduceVariables();
    this._watchInputChanges();
  }

  private _watchInputChanges(): Subscription {
    const variablesChangesSubscription = this.variables.valueChanges.subscribe(() => {
      return this._reduceVariables();
    });

    return this.dataSvc.dataChanged$
      .pipe(
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

  copyToClipboard(tab: ITab) {
    const text = this.processedTemplates.value[tab.id];
    try {
      this.clipboardService.copy(text);
      alert('Copied!');
    } catch (error) {
      alert('Error while copying =/');
    }
  }

}
