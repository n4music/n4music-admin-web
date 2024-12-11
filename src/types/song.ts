export interface IDataSongList {
  data: ISongInList[];
  total: number
}

export interface ISongInList {
  id: number;
  name: string;
  description: string;
  avatar: string;
  type: number;
  status: number;
  meta: IMeta | null;
  artist: IArtist;
}

export interface ISongDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  avatar: string;
  type: number;
  status: number;
  meta: IMeta;
  artist: IArtist;
}

export interface IArtist {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  status: number;
  meta: IMeta | null;
}

export interface IMeta {
  genre: string;
  length: string;
}