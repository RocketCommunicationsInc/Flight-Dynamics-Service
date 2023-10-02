import { TrackFile } from "./data.types";

export interface Files extends TrackFile {
  selected: boolean;
  content: string;
}

export interface Filter {id:string, checked: boolean, filtered: boolean, content:string}

export interface Files2 {
  fileName: string;
  date: Date;
  size: number;
  selected: boolean;
  content: string;
  index: number;
}
