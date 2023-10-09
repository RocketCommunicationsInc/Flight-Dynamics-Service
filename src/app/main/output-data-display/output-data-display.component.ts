import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstroComponentsModule } from '@astrouxds/angular';
import type { Tabs } from 'src/app/types/Tabs';
import { SolutionGraphComponent } from './solution-graph/solution-graph.component';
import { SolutionTableComponent } from './solution-table/solution-table.component';
import { OutputDataDisplayService } from './output-data-display.service';
import { CurrentView } from './output-data-display.model';
import { PerformanceTableComponent } from './performance-table/performance-table.component';
import { ToastService } from 'src/app/shared/toast.service';
import { CustomSegmentedButtonComponent } from 'src/app/shared/custom-segmented-button/custom-segmented-button.component';

@Component({
  selector: 'fds-output-data-display',
  standalone: true,
  imports: [
    CommonModule,
    AstroComponentsModule,
    SolutionGraphComponent,
    SolutionTableComponent,
    PerformanceTableComponent,
    CustomSegmentedButtonComponent,
  ],
  templateUrl: './output-data-display.component.html',
  styleUrls: ['./output-data-display.component.css'],
})
export class OutputDataDisplayComponent implements OnInit {
  currentView: CurrentView = 'View Table';
  tabsId = 'output-data-display-tabs';
  tabs: Tabs[] = [
    { label: 'OD Solution', id: 'od-solution', selected: true },
    { label: 'OD Performance', id: 'od-performance' },
  ];

  showBanner: boolean = false;
  dateAndTime = new Date();

  @Output() rightClick: EventEmitter<any> = new EventEmitter();

  leftIcon = 'notes';
  leftText = 'Table';
  rightIcon = 'show-chart';
  rightText = 'Graph';

  ngOnInit(): void {
    this.bannerService.showBanner$.subscribe((visible) => {
      this.showBanner = visible;
      if (visible) {
        setTimeout(() => {
          this.showBanner = false;
        }, 8000);
      }
    });
  }

  constructor(
    public outputDataDisplayService: OutputDataDisplayService,
    private toasts: ToastService,
    private bannerService: OutputDataDisplayService
  ) {}

  showGraph: boolean = false;
  showTable: boolean = true;

  viewTable() {
    this.showGraph = false;
    this.showTable = true;
  }

  viewGraph() {
    this.showGraph = true;
    this.showTable = false;
  }

  handleTLE() {
    this.toasts.addToast({
      message: 'TLE Created',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  handleEphemeris() {
    this.toasts.addToast({
      message: 'Ephemeris Created',
      hideClose: false,
      closeAfter: 3000,
    });
  }

  handleDataSelect(event: any) {
    if (event.target.value) {
      this.toasts.addToast({
        message: 'This feature has not been implemented',
        hideClose: false,
        closeAfter: 3000,
      });
    }
  }


  @ViewChild('cumulative') cumulative?: ElementRef;
  @ViewChild('pass1') pass1?: ElementRef;
  @ViewChild('pass2') pass2?: ElementRef;
  @ViewChild('pass3') pass3?: ElementRef;

  handleAntennaSelect(event: any) {
    const target = event.target.value;

    if (target === 'cumulative' && this.cumulative) {
      this.cumulative.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass1' && this.pass1) {
      this.pass1.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass2' && this.pass2) {
      this.pass2.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (target === 'pass3' && this.pass3) {
      this.pass3.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
