import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '@app/services/data.service';
import * as moment from 'moment';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cg-button-export',
  templateUrl: './button-export.component.html',
  styleUrls: ['./button-export.component.sass']
})
export class ButtonExportComponent implements OnInit {

  exportURL = new BehaviorSubject<SafeUrl>('');
  exportName: Observable<string>;

  constructor(
    private readonly dataSvc: DataService,
    private readonly domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this._watchDataChanges();
    this._generateExportName();
  }

  private _watchDataChanges() {
    this.dataSvc.dataChanged$.subscribe(() => {
      const data = this.dataSvc.exportAll();
      const dataJSON = JSON.stringify(data, null, 2);
      const fileURI = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataJSON);
      const fileURISanitized = this.domSanitizer.bypassSecurityTrustUrl(fileURI);
      this.exportURL.next(fileURISanitized);
    });
  }

  private _generateExportName() {
    this.exportName = interval(1000)
      .pipe(
        map(() => {
          const dateFormatted = moment().format('Y-MM-DD_HH-mm-ss');
          return `code-generator_export_${dateFormatted}.json`;
        }),
      );
  }

}
