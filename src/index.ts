import { AppDataSource } from "./data/DataSource"
import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import DefaultController from "./controller/DefaultController";

AppDataSource.initialize().then(async () => {
    console.log("DB Loaded")
}).catch(error => console.log(error))

const app:express.Express = express(); 
app.use(express.json())

app.listen(3000,()=>{
  console.log('Server Started: 3000')
})

const controller = new DefaultController(app);
controller.activate();
