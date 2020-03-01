import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataService } from '@app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cg-button-export',
  templateUrl: './button-export.component.html',
  styleUrls: ['./button-export.component.sass']
})
export class ButtonExportComponent implements OnInit {

  exportURL = new BehaviorSubject<SafeUrl>('');

  constructor(
    private readonly dataSvc: DataService,
    private readonly domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this._watchDataChanges();
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
