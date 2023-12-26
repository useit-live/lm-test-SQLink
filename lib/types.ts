import { IFuseOptions } from 'fuse.js';

export interface Item {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface SearchComponentProps {
  data: any;
}

export type FuseOptions<T> = IFuseOptions<T>;