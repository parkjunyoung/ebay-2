import * as types from '../actions/ActionTypes';

const initialState = {
    isLogin : false,
    message : ""
};

const authentication = ( state = initialState , action ) => {
    switch(action.type) {
        case types.REQUEST_LOGIN :
            let isLogin = false;
            if(action.message === 'success'){
                isLogin = true;
            }
            return {
                isLogin : isLogin,
                message : action.message,
                pending : false
            }
        default :
            return state;
    }
};

export default authentication;