import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ButtonExportComponent } from '@components/button-export/button-export.component';
import { ButtonImportComponent } from '@components/button-import/button-import.component';
import { RendererComponent } from '@components/renderer/renderer.component';
import { TemplateComponent } from '@components/template/template.component';
import { VariablesComponent } from '@components/variables/variables.component';
import { DefaultComponent } from '@layouts/default/default.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneratorComponent } from '@pages/generator/generator.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    TemplateComponent,
    RendererComponent,
    VariablesComponent,
    DefaultComponent,
    ButtonImportComponent,
    ButtonExportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbNavModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
