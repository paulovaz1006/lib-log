import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity()
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    log: string;

    @Column()
    type: string;

    @Column()
    date: Date;

    constructor(log: string, type: string = "log") {
        this.date = new Date();
        this.type = type;
        this.log = log;
        this.id = uuid();
    }
}
