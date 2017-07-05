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