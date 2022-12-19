import { UpdateResult } from "typeorm";

export interface BaseController <T> {
    create(data: object): Promise<T>;
    getAll(): Promise<T[]>;
    update(id: number, data: object): Promise<UpdateResult>;
    delete(id: number);
    getById(id: number): Promise<T>;
}