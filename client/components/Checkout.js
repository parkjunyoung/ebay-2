import React, { Component } from 'react';
import CheckoutTr from './CheckoutTr';
import numberFormat from '../helper/numberFormat';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
    render() {
        return (
            <div>
                <h3 className="page-header">결제하기</h3>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>상품명</th>
                            <th>판매가격</th>
                            <th>갯수</th>
                            <th>주문가격</th>
                        </tr>
                    </thead>
                    <tbody>
                            {Object.keys( this.props.cartList ).map( (cartId, key)=>{  
                                return (
                                    <CheckoutTr 
                                        cartId={cartId} key={key} 
                                        cart={this.props.cartList[cartId]} 
                                     />
                                )
                            })}
                    </tbody>
                </table>
                <div className="text-center" style={{ fontSize: "30px" , marginBottom : "20px"}}>
                    결제금액 : <span style={{ color : "red"  }}> { numberFormat(this.props.totalAmount) } 원 </span>
                </div>
                <CheckoutForm cartList={this.props.cartList} totalAmount={this.props.totalAmount}/>
            </div>
        );
    }
}

export default Checkout;