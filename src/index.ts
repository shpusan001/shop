import { AppDataSource } from "./data/DataSource"
import { User } from "./data/entity/User"

AppDataSource.initialize().then(async () => {
    console.log("DB Loaded")
}).catch(error => console.log(error))




 // const user = new User()
    // user.name = "Timber"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")