import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { environment } from '@environments/environment';
import { ITemplate } from '@typings/Template';
import { IVariable } from '@typings/Variable';
import { BehaviorSubject, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  private _renderTemplate() {
    const template: string = this.variables.value.reduce((acc: string, variable: IVariable) => {
      const variablePattern = [
        this.template.value.variablePatternStart,
        variable.name,
        this.template.value.variablePatternEnd,
      ].join('\\s*');
      const variableRegex = new RegExp(variablePattern, 'g');

      return acc.replace(variableRegex, variable.value);
    }, this.template.value.text || '');

    this.processedTemplate.next(template);
  }

}
