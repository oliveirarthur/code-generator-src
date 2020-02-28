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

  exportURL = new BehaviorSubject<SafeUrl>('');

  constructor(
    private readonly dataSvc: DataService,
    private readonly domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._watchDataChanges();
    });
  }

  private _watchDataChanges() {
    this.dataSvc.data.subscribe(() => {
      const data = this.dataSvc.exportAll();
      const dataJSON = JSON.stringify(data, null, 2);
      const fileURI = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataJSON);
      const fileURISanitized = this.domSanitizer.bypassSecurityTrustUrl(fileURI);
      this.exportURL.next(fileURISanitized);
    });
  }

}
