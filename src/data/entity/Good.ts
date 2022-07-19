import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Category } from "./Category"
import { Orders } from "./Orders"

@Entity()
export class Good {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({type:"varchar", length:100, nullable:false})
    name: string

    @ManyToOne(()=>Category, (cate)=>cate.goods, {cascade:true})
    cate_id: Category

    @OneToMany(()=>Orders, (order)=>order.good_id)
    orders: Orders[]

}
