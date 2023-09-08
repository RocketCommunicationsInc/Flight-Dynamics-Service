import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AstroComponentsModule } from '@astrouxds/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalStatusBar } from './global-status-bar/global-status-bar';
import { ScenariosLibrary } from './scenarios-library/scenarios-library';
import { ScenarioData } from './scenario-data/scenario-data';
import { DataInputsOutputs } from './data-inputs-outputs/data-inputs-outputs';
import { UtilityToolkit } from './utility-toolkit/utility-toolkit';
import { OutputTable } from './output-table/output-table';
import { OutputDataDisplay } from './output-data-display/output-data-display';
import { PropertiesDialog } from './properties-dialog/properties-dialog';
import { CommonModule } from '@angular/common';
import { IfAuthorizedDirective } from './if-authorized.directive';
import { LogUtilityDialog } from './log-utility-dialog/log-utility-dialog';
import { OutputGraph } from './output-graph/output-graph';

@NgModule({
  declarations: [
    AppComponent,
    GlobalStatusBar,
    ScenariosLibrary,
    ScenarioData,
    UtilityToolkit,
    DataInputsOutputs,
    OutputTable,
    OutputDataDisplay,
    PropertiesDialog,
    IfAuthorizedDirective,
    LogUtilityDialog,
    OutputGraph,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AstroComponentsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
