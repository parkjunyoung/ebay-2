import Cart from '../components/Cart';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cartList : state.cart.cartList,
    totalAmount : state.cart.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
    removeCart : ( cartId ) => dispatch( actions.removeCart( cartId ) )
});

const CartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);

export default CartContainer;