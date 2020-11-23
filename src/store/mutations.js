import { 
    ADD_TO_CART, 
    ADD_TO_COUNTER
} from './constant';

export default {
    [ADD_TO_CART](state,payload){
        state.cartList.push(payload);
    },
    [ADD_TO_COUNTER](state, payload){
        payload.num ++ ;
    }
}