import authentication from './authentication';
import cart from './cart';

import { combineReducers } from 'redux';

const reducers = combineReducers({
    authentication,
    cart
});

export default reducers;