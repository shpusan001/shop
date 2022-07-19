import * as express from 'express';
import {Request, Response, NextFunction} from 'express';
import { AppDataSource } from '../data/DataSource';
import { Category } from '../data/entity/Category';
import { Good } from '../data/entity/Good';
import { Orders } from '../data/entity/Orders';
import { User } from '../data/entity/User';

export default class DefaultController {
    app: express.Express;
    constructor(app:express.Express){
        this.app = app
    }

    activate():void {

        //1.전체 상품 목록을 얻을 수 있습니다.
        this.app.get('/good', async(req:Request, res:Response, next:NextFunction)=>{
            const goods:Good[] = await AppDataSource.manager.find("Good");
            res.send(goods)
        });

        //2.특정 카테고리별로 상품을 얻을 수 있습니다. (type으로 항목을 식별합니다.)
        this.app.get('/good/cate/one', async(req:Request, res:Response, next:NextFunction)=>{
            const type = req.body.type;
            if(type == null){
                res.status(500).send("type값이 없습니다.")
                return;
            }
            let goods:Good[] = await AppDataSource
            .getRepository(Good)
            .createQueryBuilder("good")
            .where("good.cateId = (select id from category where category.name = :type)", {type})
            .getMany()
            res.send(goods)
        });

        //3.각 카테고리별 상품을 1가지씩 랜덤으로 얻을 수 있습니다. (각 상품은 객체에 담아 보내주세요.)
        this.app.get('/good/cate/randOne', async(req:Request, res:Response, next:NextFunction)=>{
            let result:Good[] = new Array();
            let categorys:Category[] = await AppDataSource
            .getRepository(Category)
            .createQueryBuilder("cate")
            .getMany()
            for(const category of categorys){
                const good:Good[] = await AppDataSource
                .getRepository(Good)
                .createQueryBuilder("good")
                .where("good.cateId = :cateId", {cateId:category.id})
                .orderBy("rand()")
                .limit(1)
                .getMany()
                result.push(...good)
            }
            res.send(result)
        });

        //4.판매된 상품들 중 여성(female) 회원에게 판매된 횟수가 가장 많은 상품의 이름을 얻을 수 있습니다.
        this.app.get('/good/bestOfW/one', async(req:Request, res:Response, next:NextFunction)=>{
            const goods:Good[] = await AppDataSource
            .getRepository(Good)
            .createQueryBuilder("good")
            .where("id = ( \
                select goodId as csum from orders o join user u on o.userId = u.id \
                group by goodId, gender \
                having sum(cnt) = ( \
                select max(csum) from(select goodId, gender, sum(cnt) as csum from orders o join user u on o.userId = u.id \
                where u.gender = 'F' \
                group by goodId, gender)as tab))")
            .getMany();
            res.send(goods);
        });

        //5.3월 판매 총액이 가장 높은 상품을 얻을 수 있습니다. (상품은 객체에 담아 보내주세요.)
        this.app.get('/good/bestOfTot/one', async(req:Request, res:Response, next:NextFunction)=>{
            const month = req.body.month;
            if(month == null){
                res.status(500).send("month값이 없습니다.")
                return;
            }
            const goods:Good[] = await AppDataSource
            .getRepository(Good)
            .createQueryBuilder("good")
            .where("id = (select goodId from orders \
                group by goodId \
                having sum(tot) = ( \
                select max(tsum) from \
                (select goodId, sum(tot) as tsum from orders \
                where month(ordTime) = :month \
                group by goodId) as t))", {month})
            .getMany();
            res.send(goods);
        });

        //6.구매 횟수가 가장 적은 회원과, 구매 총액이 가장 높은 회원의 이름을 각각 얻을 수 있습니다. (두 가지 조건에 해당하는 회원이 동일한 회원이라면, 해당 회원의 이름을 보내주세요.)
        this.app.get('/user/MinCntMaxTot/EachOne', async(req:Request, res:Response, next:NextFunction)=>{
            const result:User[] = new Array();

            const cntMinUser:User[] = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.purch_cnt = (select min(purch_cnt) from user)")
            .getMany();

            const totMaxUser:User[] = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.purch_tot = (select max(purch_tot) from user)")
            .getMany();

            //중복되는 요소의 아이디 -1로 초기화
            for(const minUser of cntMinUser){
                result.push(minUser);
                for(const index in totMaxUser){
                    if(minUser.id==totMaxUser[index].id){
                       totMaxUser[index].id=-1;
                    }
                }
            }

            //아이디가 -1이 아닐 때, 즉 중복되지 않는 요소만 결과에 추가
            for(const user of totMaxUser){
                if(user.id!=-1){
                    result.push(user)
                }
            }

            res.send(result)
        });

        
    }
}