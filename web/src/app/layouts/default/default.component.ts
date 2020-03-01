import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '@app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cg-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
