export interface Filter {id:string, content:string}

export interface Files {
  fileName: string;
  date: Date;
  size: number;
  selected: boolean;
  content: string;
  index: number;
}
