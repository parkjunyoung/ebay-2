import * as types from './ActionTypes';
import axios from 'axios';
import getCookie from '../helper/getCookie';
import setCookieHour from '../helper/setCookieHour';

export const requestLogin = ( username , password ) => dispatch => {

    return axios.post( '/api/accounts/login', 
            { username : username, password : password}
        ).then(
            (res) => dispatch({
                type : types.REQUEST_LOGIN,
                message : res.data.message
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_LOGIN,
                message : error
            })
        
        );
    
};

export const requestStatus = () => dispatch => {

    return axios.get( '/api/accounts/status')
        .then(
            (res) => dispatch({
                type : types.REQUEST_STATUS,
                isLogin : res.data.isLogin
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_STATUS,
                error : error
            })
        
        );
    
};

export const requestLogout = () => dispatch => {

    return axios.get( '/api/accounts/logout')
        .then(
            (res) => dispatch({
                type : types.REQUEST_LOGOUT,
                isLogin : false
            })
        ).catch( 
            (error) => dispatch({
                type : types.REQUEST_LOGOUT,
                error : error
            })
        
        );
    
};

export const addCart = ( productId , number, amount ) => {

    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ 
        //쿠키에서 검색후 있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
    }

    cartList[productId] = { 
        number : number , 
        amount : amount 
    };
    
    // 배열의 경우 map, forEach가 사용가능하지만
    // {}객체의 경우 아래와 같이 반복시킨다.
    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    // string으로 저장되는데 나중에 {}형식으로 받기위해 stringfy로 저장
    setCookieHour( "cartList" , JSON.stringify(cartList) , 3 );

    return ({
        type : types.ADD_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};

export const getCart = () => {

    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ //있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
    }

    //장바구니 리스트만 받아와서 state에 저장만 한다.

    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    return ({
        type : types.GET_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};

export const removeCart = ( cartId ) => {
    //cartId로 찾아서 delete로 날린다
    let cartList = {};
    let totalAmount = 0;
    if( getCookie('cartList') ){ //있으면 json 파싱함
        cartList = JSON.parse(getCookie('cartList'));
        delete cartList[cartId];  //지우는 부분
    }

    if( Object.keys(cartList).length ){
        for( let key in cartList){
            totalAmount += cartList[key].amount;
        }
    }

    setCookieHour( "cartList" , JSON.stringify(cartList) , 3 );

    return ({
        type : types.REMOVE_CART,
        cartList : cartList,
        count : Object.keys(cartList).length,
        totalAmount : totalAmount
    });
    
};