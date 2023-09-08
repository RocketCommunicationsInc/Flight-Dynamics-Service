import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AstroComponentsModule } from '@astrouxds/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalStatusBarComponent } from './Components/global-status-bar/global-status-bar.component';
import { ScenarioLibraryComponent } from './Components/scenario-library/scenario-library.component';
import { ObjectDataDisplayComponent } from './Components/object-data-display/object-data-display.component';
import { UtilitiesToolkitComponent } from './Components/utilities-toolkit/utilities-toolkit.component';
import { InputsOutputsComponent } from './Components/inputs-outputs/inputs-outputs.component';
import { OutputDataDisplayComponent } from './Components/output-data-display/output-data-display.component';

@NgModule({
  declarations: [AppComponent, GlobalStatusBarComponent, ScenarioLibraryComponent, ObjectDataDisplayComponent, UtilitiesToolkitComponent, InputsOutputsComponent, OutputDataDisplayComponent],
  imports: [BrowserModule, AppRoutingModule, AstroComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
