import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CurrentIterationFormComponent } from './current-iteration-form/current-iteration-form.component';
import { ProjectPropertiesAdapter } from './models/project-properties';
import { WorkItemFieldsAdapter } from './models/work-item';
import { WorkItemsDisplayComponent } from './work-items-display/work-items-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentIterationFormComponent,
    WorkItemsDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [WorkItemFieldsAdapter, ProjectPropertiesAdapter],
  bootstrap: [AppComponent]
})
export class AppModule { }
