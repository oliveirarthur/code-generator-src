import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITemplate } from '@typings/Template';
import { IVariable } from '@typings/Variable';
import { BehaviorSubject } from 'rxjs';
import { ITab } from '@typings/Tab';

@Component({
  selector: 'cg-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit {

  variables = this.formBuilder.array([]);
  template = new BehaviorSubject<ITemplate>({
    text: `Test text {{ a }}`,
  } as ITemplate);
  tabs = new BehaviorSubject<Array<ITab>>([]);

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
  }

}
