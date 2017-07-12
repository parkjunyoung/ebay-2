import Cart from '../components/Cart';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cartList : state.cart.cartList,
    totalAmount : state.cart.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
    
});

const CartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);

export default CartContainer;