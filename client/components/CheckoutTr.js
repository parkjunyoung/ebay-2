import React, { Component } from 'react';
import axios from 'axios';
import numberFormat from '../helper/numberFormat';

class CheckoutTr extends Component {

    constructor(){
        super();
        this.state = { 
            product : []
        };
    }

    componentDidMount() {

        axios.get(`/api/admin/products/${this.props.cartId}`, {
        }).then( (res) => {
           this.setState({
                product: res.data.product
            });
        }).catch( (error) => {
            console.log(error); 
        });
    }


    render() {
        return (
            <tr>
                <td>
                    {this.state.product.thumbnail ? 
                        <img src={`/uploads/${this.state.product.thumbnail}`}  
                        width="50" height="50" alt="" /> : ''
                    }
                </td>
                <td>
                    {this.state.product.product_name}
                </td>
                <td>
                    { 
                        this.state.product.sale_price ?
                        numberFormat(this.state.product.sale_price) :
                        numberFormat(this.state.product.price) 
                    } 원
                </td>
                <td>
                    {this.props.cart.number}
                </td>
                <td>
                    { numberFormat(this.props.cart.amount) } 원
                </td>
            </tr>
        );
    }
}

export default CheckoutTr;