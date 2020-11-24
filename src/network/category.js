import { request } from './request';

export function getAllCategory(){
    return request({
        url: '/category'
    })
}
export function getSubCategory(maitKey) {
    return request({
        url: '/category',
        params:{
            maitKey
        }
    })
}