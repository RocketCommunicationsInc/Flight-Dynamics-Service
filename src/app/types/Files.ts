import { TrackFile } from "./data.types";

export interface Files extends TrackFile {
  selected: boolean;
  content: string;
}

export interface Filter {id:string, selected: boolean, filtered: boolean, content:''}

export interface Files2 {
  fileName: string;
  date: Date;
  size: number;
  selected: boolean;
  content: string;
  index: number;
}
