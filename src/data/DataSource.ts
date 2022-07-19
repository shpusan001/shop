import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Good } from "./entity/Good"
import { Orders } from "./entity/Orders"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 13306,
    username: "root",
    password: "root",
    database: "shop",
    synchronize: true,
    logging: true,
    entities: [User, Orders, Good, Category],
    migrations: [],
    subscribers: [],
})
