import React, { Component } from 'react';
import axios from 'axios';
import getDate from '../../helper/getDate';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
    
    constructor(){
        super();
        this.state = {
            product : []
        };
    }

    componentDidMount() {
        let productId = this.props.match.params.id;

        axios.get(`/api/admin/products/${productId}`, {
        }).then( (res) => {
            this.setState({
                product : res.data.product
            });
        }).catch( (error) => {
            console.log(error);
        });
    }
    
    render() {
        let createdAt = getDate(this.state.product.createdAt);
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        { this.state.product.product_name }
                    </div>
                    <div className="panel-body">
                        <div> 
                            등록일 :
                            { createdAt.year } -
                            { createdAt.month } -
                            { createdAt.day }
                        </div>
                        <div>
                            {this.state.product.thumbnail ? 
                                <img src={`/uploads/${this.state.product.thumbnail}`} /> : ''
                            }
                        </div>
                        { this.state.product.description }
                    </div>
                </div>
                <Link to='/admin/products' className='btn btn-default' style={ { marginRight : "10px" } }>목록으로</Link>
                <Link to={`/admin/products/edit/${this.state.product.id}`} className='btn btn-primary'>수정하기</Link>
            </div>
        );
    }
}

export default ProductDetail;