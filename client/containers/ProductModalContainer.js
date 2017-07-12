import ProductModal from '../components/ProductModal';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    addCart : ( productId , number, amount ) => dispatch( actions.addCart( productId , number, amount ) )
});

const ProductModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductModal);

export default ProductModalContainer;