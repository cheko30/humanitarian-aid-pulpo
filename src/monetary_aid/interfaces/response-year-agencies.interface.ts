export interface ResponseYearAgencies {
  year: number;
  responseSorted: AgencySum[];
}

export interface AgencySum {
  agencyref: string;
  sum: number;
}
