import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Orders } from "./Orders"

@Entity()
export class User {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({type:"varchar", length:32, nullable:false})
    name: string

    @Column({type:"varchar", length:1, nullable:false})
    gender: string

    @Column()
    age: number

    @Column()
    purch_cnt: number

    @Column({type:"bigint"})
    purch_tot: number

    @OneToMany(()=>Orders, (order)=>order.user)
    orders: Orders
}
