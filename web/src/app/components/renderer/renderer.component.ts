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

  processedTemplate = new BehaviorSubject<string>('');

  constructor(
  ) { }

  ngOnInit(): void {
    this._watchTemplateChanges();
  }

  private _watchTemplateChanges(): Subscription {
    return merge(
      this.template,
      this.variables.valueChanges,
    ).pipe(
      debounceTime(environment.debounceTime),
    ).subscribe(() => {
      this._renderTemplate();
    });
  }

  private _renderTemplate(): string {
    const variables = this.variables.value.reduce((acc, variable: IVariable) => {
      acc[variable.name] = variable.value;
      return acc;
    }, {});

    try {
      const template = Handlebars.compile(this.template.value.text)(variables);
      this.processedTemplate.next(template);
      return template;
    } catch (error) {
      console.error(error);
    }

  }

}
