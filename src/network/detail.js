import { request } from './request';

export function getGoodsDetail(iid) {
   return request({
       url: '/detail',
       params: {
           iid
       },
   })
}

export function getGoodsRecommend(){
    return request({
        url:'/recommend'
    });
}

export class Goods{
    constructor(itemInfo, columns, services){
        this.iid = itemInfo.iid;
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
