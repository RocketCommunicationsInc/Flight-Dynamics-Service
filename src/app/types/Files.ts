export interface Filter {id:string, checked: boolean, filtered: boolean, content:string}

export interface Files {
  fileName: string;
  date: Date;
  size: number;
  selected: boolean;
  content: string;
  index: number;
}
