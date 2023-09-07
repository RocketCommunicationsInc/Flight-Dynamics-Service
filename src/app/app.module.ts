import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AstroComponentsModule } from '@astrouxds/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GsbComponent } from './gsb/gsb.component';
import { ScenariosTreeComponent } from './scenarios-tree/scenarios-tree.component';
import { SpacecraftPropertiesComponent } from './spacecraft-properties/spacecraft-properties.component';
import { SpacecraftFileComponent } from './spacecraft-file/spacecraft-file.component';
import { SpacecraftComponent } from './spacecraft/spacecraft.component';
import { SpacecraftTableComponent } from './spacecraft-table/spacecraft-table.component';
import { SpacecraftGraphComponent } from './spacecraft-graph/spacecraft-graph.component';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { IfAuthorizedDirective } from './if-authorized.directive';

@NgModule({
  declarations: [
    AppComponent,
    GsbComponent,
    ScenariosTreeComponent,
    SpacecraftPropertiesComponent,
    SpacecraftComponent,
    SpacecraftFileComponent,
    SpacecraftTableComponent,
    SpacecraftGraphComponent,
    DialogComponent,
    IfAuthorizedDirective,
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
