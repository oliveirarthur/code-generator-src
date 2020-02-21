import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'cg-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit {
  variables = this.formBuilder.array([
    this.formBuilder.control(''),
  ]);

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {}
}
