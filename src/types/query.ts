export interface IQueryUser {
  page: number;
  perPage: number;
  total?: number;
  name?: string;
  email?: string;
  phone?: string;
}

export interface IQuerySong {
  page: number;
  perPage: number;
  total?: number;
}

