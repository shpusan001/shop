import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Good } from "./Good"

@Entity()
export class Category {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({type:"varchar", length:100, nullable:false, unique:true})
    name: string

    @OneToMany(()=>Good, (good)=>good.cate)
    goods: Good[]
}