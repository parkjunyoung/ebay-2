import Checkout from '../components/Checkout';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cartList : state.cart.cartList,
    totalAmount : state.cart.totalAmount,
});

const mapDispatchToProps = (dispatch) => ({
    
});

const CheckoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);

export default CheckoutContainer;