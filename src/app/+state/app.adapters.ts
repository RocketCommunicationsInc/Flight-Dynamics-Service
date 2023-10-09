import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Scenario, Spacecraft, TrackFile } from '../types/data.types';

export function sortByName(
  a: Scenario | TrackFile,
  b: Scenario | TrackFile
): number {
  return a.name.localeCompare(b.name);
}

export function sortById(
  a: Scenario | TrackFile | Spacecraft,
  b: Scenario | TrackFile | Spacecraft
): number {
  return a.id.localeCompare(b.id);
}

export const scenarioAdapter: EntityAdapter<Scenario> =
  createEntityAdapter<Scenario>({
    sortComparer: sortByName,
  });

export const spacecraftAdapter: EntityAdapter<Spacecraft> =
  createEntityAdapter<Spacecraft>({
    sortComparer: sortById,
  });

export const trackFileAdapter: EntityAdapter<TrackFile> =
  createEntityAdapter<TrackFile>({
    sortComparer: sortByName,
  });
