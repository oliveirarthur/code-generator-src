import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ITemplate } from '@typings/Template';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cg-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  @Input() template: BehaviorSubject<ITemplate>;

  templateInput = this.formBuilder.control('');

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._initInputValue();
    this._watchInputChanges();
  }

  private _initInputValue() {
    if (!this.template) {
      return;
    }
    this.templateInput.setValue(this.template.value.text);
  }

  _watchInputChanges() {
    this.templateInput.valueChanges.subscribe(text => {
      const template = this.template.value;
      template.text = text;
      this.template.next(template);
    });
  }

}
