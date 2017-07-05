import Login from '../routes/Login';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLogin : state.authentication.isLogin,
    message : state.authentication.message,
});

const mapDispatchToProps = (dispatch) => ({
    requestLogin : ( useranme , password ) => dispatch( actions.requestLogin( useranme , password ) )
});

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;