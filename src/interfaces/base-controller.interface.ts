import { UpdateResult } from 'typeorm';

export interface IParameters{ data?: any, file?: any, query?: any, parameter?: any, req?: any, res?: any }

export interface BaseController<T> {
  create(...IParameters): Promise<T>;
  getAll(...IParameters): Promise<T[]>;
  update(...IParameters): Promise<UpdateResult>;
  delete(...IParameters);
  getById(...IParameters): Promise<T>;
}
