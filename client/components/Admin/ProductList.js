import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import getDate from '../../helper/getDate';

class ProductList extends Component {

    constructor(){
        super();
        this.state = { 
            products : []
        };
    }

    componentDidMount(){

        axios.get('/api/admin/products', {
        }).then( (res) => {
            this.setState({
                products : res.data.products
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    removeProduct(key , event){
        event.preventDefault();
        axios.delete( event.target.href)
        .then( (res) => {
            if(res.data.message==="success"){
                alert('삭제되었습니다');
                this.state.products.splice(key, 1);
                this.setState({
                    products : this.state.products
                });
            }
        }).catch( (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="row">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>제품명</th>
                            <th>가격</th>
                            <th>등록일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map( (product, key)=>{  
                            let createdAt = getDate(product.createdAt);
                            return (
                                <tr key={key}>
                                    <td>
                                        <Link to={`/admin/products/${product.id}`}>
                                            {product.product_name}
                                        </Link>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>
                                        { createdAt.year } - 
                                        { createdAt.month } - 
                                        { createdAt.day }
                                    </td>
                                    <td>
                                        <a href={`/api/admin/products/${product.id}`} className="btn btn-danger" onClick={ this.removeProduct.bind(this, key ) }>삭제</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/admin/products/write" className="btn btn-primary">등록하기</Link>
            </div>
        );
    }
}

export default ProductList;