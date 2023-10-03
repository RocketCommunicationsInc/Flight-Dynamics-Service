import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Status } from '@astrouxds/astro-web-components/dist/types/components';
import { randomNum } from 'src/app/mock-data/generate-data';
import { UnitMenuItems } from 'src/app/shared/units/units.model';
import { ColumnDefs } from 'src/app/shared/table.service';
import { OrbitProperties } from 'src/app/types/data.types';
import { selectCurrentTrackFile } from 'src/app/+state/app.selectors';
import { PerformanceData, SolutionData } from './output-data-display.model';
import { PERFORMANCE_DATA } from './output-data-display.data';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class OutputDataDisplayService {
  currentTrackFile$ = this.store.select(selectCurrentTrackFile);
  performanceData: PerformanceData[] = PERFORMANCE_DATA;
  solutionData: SolutionData[] = [];
  deviations: Status[] = [];
  columnDefs: ColumnDefs<SolutionData>[] = [
    { header: '', field: 'id' },
    { header: 'Solve For', field: 'property', sortable: true },
    { header: 'Initial State', field: 'initial' },
    { header: 'Final State', field: 'final' },
    { header: 'Std Dev', field: 'deviation' },
    { header: 'Difference', field: 'difference' },
    { header: 'Units', field: 'units' },
  ];

  constructor(private store: Store) {
    this.currentTrackFile$.pipe(takeUntilDestroyed()).subscribe((trackFile) => {
      if (!trackFile) return;
      const { degrees, kilometers, meters, miles, radians, revolutions } =
        UnitMenuItems;
      const initial = trackFile.initialOrbitProperties;
      const final = trackFile.processedTrackFile?.finalOrbitProperties;
      this.deviations = []; // clear existing deviations if any
      Object.entries(initial).forEach(([key, { unit, value }], index) => {
        const finalVal = final ? final[key as keyof OrbitProperties].value : 0;
        const status = this.setStatus(index);

        if (status !== 'off') {
          this.deviations.push(status);
        }

        this.solutionData.push({
          deviation: randomNum(100, 300),
          difference: Number((finalVal - value).toPrecision(7)),
          final: finalVal,
          id: crypto.randomUUID(),
          initial: value,
          property: this.camelCaseToTitleCase(key),
          status,
          trackFileId: trackFile.id,
          units: [
            { ...meters, selected: meters.val === unit },
            { ...kilometers, selected: kilometers.val === unit },
            { ...miles, selected: miles.val === unit },
            { ...degrees, selected: degrees.val === unit },
            { ...radians, selected: radians.val === unit },
            { ...revolutions, selected: revolutions.val === unit },
          ],
        });
      });
    });
  }

  private setStatus(index: number): Status {
    if (index % 4 === 0) return 'caution';
    if (index % 10 === 0) return 'critical';
    return 'off';
  }

  private camelCaseToTitleCase(str: string) {
    const reg = /^[a-z]|[A-Z]/g;
    return str.replace(reg, (c, i) => (i ? ' ' : '') + c.toUpperCase());
  }

  get totalDeviations(): number {
    return this.deviations.length;
  }

  get warnings(): number {
    return this.deviations.filter((dev) => dev === 'caution').length;
  }

  get criticals(): number {
    return this.deviations.filter((dev) => dev === 'critical').length;
  }

  private showBannerSubject = new BehaviorSubject<boolean>(false);
  showBanner$ = this.showBannerSubject.asObservable();
  handleBanner() {
    this.showBannerSubject.next(!this.showBannerSubject.value);
  }
}
