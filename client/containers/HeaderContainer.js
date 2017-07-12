import Header from '../components/Header';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLogin : state.authentication.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
    requestStatus : ( useranme , password ) => dispatch( actions.requestStatus() ),
    requestLogout : ( useranme , password ) => dispatch( actions.requestLogout() ),
    getCart : () => dispatch( actions.getCart() )
});

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;