export interface ResourceModel {
  count: number;
  next: string;
  previous: string;
  results: ResultsModel[]
}

export interface ResultsModel {
  name: string;
  url: string;
}
