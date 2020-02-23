import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { RendererComponent } from '@components/renderer/renderer.component';
import { TemplateComponent } from '@components/template/template.component';
import { VariablesComponent } from '@components/variables/variables.component';
import { GeneratorComponent } from '@pages/generator/generator.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    TemplateComponent,
    RendererComponent,
    VariablesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
