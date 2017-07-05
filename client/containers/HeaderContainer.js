import Header from '../components/Header';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLogin : state.authentication.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
    
});

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;