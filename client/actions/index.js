import * as types from './ActionTypes';
import axios from 'axios';

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