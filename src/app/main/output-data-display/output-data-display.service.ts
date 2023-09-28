import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Status } from '@astrouxds/astro-web-components/dist/types/components';

import { PERFORMANCE_DATA } from './output-data-display.data';
import { randomNum } from 'src/app/mock-data/generate-data';
import { UnitMenuItems } from 'src/app/shared/units/units.model';
import { ColumnDefs } from 'src/app/shared/table.service';
import { OrbitProperties, TrackFile } from 'src/app/types/data.types';
import { PerformanceData, SolutionData } from './output-data-display.model';
import {
  selectSelectedTrackFileId,
  selectTrackFiles,
} from 'src/app/+state/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class OutputDataDisplayService {
  selectSelectedTrackFileId$ = this.store.select(selectSelectedTrackFileId);
  trackFiles$ = this.store.select(selectTrackFiles);
  deviations: Status[] = [];
  performanceData: PerformanceData[] = PERFORMANCE_DATA;
  solutionData: SolutionData[] = [];
  columnDefs: ColumnDefs<SolutionData>[] = [
    { header: '', field: 'id' },
    { header: 'Solve For', field: 'property', sortable: true },
    { header: 'Initial State', field: 'initial' },
    { header: 'Final State', field: 'final' },
    { header: 'Std Dev', field: 'deviation' },
    { header: 'Difference', field: 'difference', sortable: true },
    { header: 'Units', field: 'units' },
  ];

  constructor(private store: Store) {
    let selectedTrackFile: TrackFile | undefined;
    this.selectSelectedTrackFileId$.subscribe((id) => {
      this.trackFiles$.subscribe(({ entities }) => {
        if (!id) {
          selectedTrackFile = Object.values(entities)[0];
        } else {
          selectedTrackFile = entities[id];
        }
      });
      if (!selectedTrackFile) return;
      // prettier-ignore
      const { degrees, kilometers, meters, miles, radians, revolutions } = UnitMenuItems;
      const initial = selectedTrackFile.initialOrbitProperties;
      const final = selectedTrackFile.processedTrackFile?.finalOrbitProperties;
      this.deviations = []; // clear existing deviations if any
      Object.entries(initial).forEach(([key, { unit, value }], index) => {
        const finalVal = final ? final[key as keyof OrbitProperties].value : 0;
        const status = this.setStatus(index);

        if (status !== 'off') {
          this.deviations.push(status);
        }

        this.solutionData.push({
          deviation: randomNum(100, 300),
          difference: value - finalVal,
          final: finalVal,
          id: crypto.randomUUID(),
          initial: value,
          property: key,
          status,
          trackFileId: id || '', // TODO: remove when trackFileId is set up
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

  get totalDeviations(): number {
    return this.deviations.length;
  }

  get warnings(): number {
    return this.deviations.filter((dev) => dev === 'caution').length;
  }

  get criticals(): number {
    return this.deviations.filter((dev) => dev === 'critical').length;
  }
}
