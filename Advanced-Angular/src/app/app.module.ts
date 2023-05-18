import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeViewModule } from "@progress/kendo-angular-treeview";
import { TreeViewComponent } from './treeview/treeview.component';
import { NodeInfoComponent } from './node_info/nodeinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    NodeInfoComponent
  ],
  imports: [
    GridModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    TreeViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
