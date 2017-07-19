import React, { Component } from 'react';
import axios from 'axios';
import getDate from '../../helper/getDate';
import numberFormat from '../../helper/numberFormat';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

class Order extends Component {

    constructor(){
        super();
        this.state = { 
            orderList : []
        };
    }

    componentDidMount(){

        axios.get('/api/checkout/order', {
        }).then( (res) => {
            this.setState({
                orderList : res.data.orderList
            });
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
                            <th>주문자(이메일)</th>
                            <th>결재상태</th>
                            <th>금액</th>
                            <th>주소</th>
                            <th>주문일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orderList.map( (order, key)=>{  
                            let createdAt = getDate(order.createdAt);

                            return (
                                <tr key={key}>
                                    <td>
                                        <Link to={`/admin/order/${order.id}`}>
                                            { order.buyer_name }
                                            <br />
                                            ( { order.buyer_email } )
                                        </Link>
                                    </td>
                                    <td>
                                        { order.status }
                                    </td>
                                    <td>{ numberFormat(order.paid_amount) }</td>
                                    <td>{ order.buyer_addr }</td>
                                    <td>
                                        { createdAt.year } - 
                                        { createdAt.month } - 
                                        { createdAt.day }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Order;