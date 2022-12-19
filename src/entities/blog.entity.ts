import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {

@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column()
description: string;

@Column()
isActive: boolean;

@Column()
createdDate: Date;

@Column()
photos: string;
}