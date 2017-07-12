import React, { Component } from 'react';
import CartTr from './CartTr';
import numberFormat from '../helper/numberFormat';
import { Link } from 'react-router-dom';

class Cart extends Component {

    constructor(){
        super();
        this.removeCart = this.removeCart.bind(this);
    }

    removeCart( cartId , event){
        event.preventDefault();
        if(confirm('장바구니에서 제거하시겠습니까?')){ 
            this.props.removeCart(cartId);
            alert("제거 되었습니다.");
        }
    }

    render() {
        return (
            <div>
                <h3 className="page-header">장바구니</h3>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>상품명</th>
                            <th>판매가격</th>
                            <th>갯수</th>
                            <th>주문가격</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys( this.props.cartList ).map( (cartId, key)=>{  
                            return (
                                <CartTr 
                                    cartId={cartId} key={key} 
                                    cart={this.props.cartList[cartId]} 
                                    removeCart={ this.removeCart }/>
                            )
                        })}
                    </tbody>
                </table>
                <div className="text-center" style={{ fontSize: "30px" , marginBottom : "20px"}}>
                    결제금액 : <span style={{ color : "red"  }}> { numberFormat(this.props.totalAmount) } 원 </span>
                </div>
                <div className="text-center">
                    <Link to="/" className="btn btn-default" style={{ marginRight : "10px" }}>계속쇼핑하기</Link>
                    <Link to="/checkout" className="btn btn-primary">결제하기</Link>
                </div>
            </div>
        );
    }
}

export default Cart;