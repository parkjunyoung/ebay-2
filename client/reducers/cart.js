import * as types from '../actions/ActionTypes';

const initialState = {
    count : 0 , //현재 장바구니에 담긴 갯수
    cartList : {}, //장바구니의 상세 정보, 제품아이디, 갯수등등
    totalAmount : 0 // 전체 장바구니의 담긴 총 금액
};

const Cart = ( state = initialState , action ) => {
    switch(action.type) {
        case types.ADD_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        case types.GET_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        case types.REMOVE_CART :
            return {
                count : action.count,
                cartList : action.cartList,
                totalAmount : action.totalAmount
            }
        default :
            return state;
    }
};

export default Cart;