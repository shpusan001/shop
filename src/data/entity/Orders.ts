import { Entity, PrimaryGeneratedColumn, Column, Long, ManyToOne } from "typeorm"
import { Good } from "./Good"
import { User } from "./User"

@Entity()
export class Orders {

    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @ManyToOne(()=>Good, (good)=>good.orders)
    good_id: Good

    @ManyToOne(()=>User, (user)=>user)
    user_id: User

    @Column({type:"varchar", length:1, nullable:false})
    spec: string

    @Column({type:"datetime", nullable:false})
    ord_tinme: string

    @Column()
    cnt: number

    @Column({type:"bigint"})
    tot: number
}
