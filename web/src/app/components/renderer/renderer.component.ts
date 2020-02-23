import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { environment } from '@environments/environment';
import { ITemplate } from '@typings/Template';
import { IVariable } from '@typings/Variable';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as Handlebars from 'handlebars';

@Component({
  selector: 'cg-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.sass']
})
export class RendererComponent implements OnInit {

  @Input() template: BehaviorSubject<ITemplate>;
  @Input() variables: FormArray;

  private variablesReduced = new BehaviorSubject<any>({});

  processedTemplate = new BehaviorSubject<string>('');

  constructor(
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
      this.template,
      this.variablesReduced,
    ).pipe(
      debounceTime(environment.debounceTime),
    ).subscribe(() => {
      this._renderTemplate();
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

  private _renderTemplate(): string {
    try {
      const template = Handlebars.compile(this.template.value.text)(this.variablesReduced.value);
      this.processedTemplate.next(template);
      return template;
    } catch (error) {
      console.error(error);
    }
    return this.processedTemplate.value;
  }

}
