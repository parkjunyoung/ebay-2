import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getDate from '../helper/getDate';
import CountBox from './CountBox';

class ProductModal extends Component {

    constructor() {
        super();
        this.state = { 
            product : [],
            cartNum : 1, //장바구니의 담을 갯수
            totalPrice : 0, // 가격 * 갯수 = 최종가격
            lastPrice : 0 //현재하나당 판매가 - 세일가가 있으면 세일가를 저장
        };
        this.historyBack = this.historyBack.bind(this);
        this.changeCartNum = this.changeCartNum.bind(this);
    }

    componentDidMount(){

        axios.get(`/api/admin/products/${this.props.match.params.id}`, {
        }).then( (res) => {
            
            //세일가가 있으면 세일가를 저장
            let lastPrice = (
                res.data.product.sale_price ?
                res.data.product.sale_price :
                res.data.product.price 
                            );
            //제품 정보 및 현재 판매가를 저장한다
            this.setState({
                product: res.data.product,
                totalPrice : lastPrice,
                lastPrice : lastPrice
            });
        }).catch( (error) => {
            console.log(error);
        });

    }

    changeCartNum( type , event ){
        event.preventDefault();
        let cartNum = this.state.cartNum; //현재 장바구니의 담은수
        if(type==="plus"){
            cartNum++; 
            // 이벤트 타입이 plus면 장바구니 갯수를 더한다
        }else if(type==="minus"){
            cartNum -= ( (cartNum==1) ? 0 : 1 ); 
            // 이벤트 타입이 minus면 장바구니 갯수를 뺀다
            // 단 0 이하로는 내려가게 하지 않는다
        }
        this.setState({
            cartNum : cartNum,
            totalPrice : (this.state.lastPrice * cartNum)
        });
    }

    historyBack(){
        this.props.history.push('/');
    }

    render(){

        let createdAt = getDate(this.state.product.createdAt);

        return (
            <Modal show={true} onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        {this.state.product.product_name}
                            - 판매가 
                            { this.state.product.sale_price ? this.state.product.sale_price  : this.state.product.price } 원
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        작성일 :
                        {createdAt.year} - {createdAt.month} - {createdAt.day}
                    </div>
                    <img src={`/uploads/${this.state.product.thumbnail}`} alt=""/>
                    <div>{this.state.product.description}</div>

                    <hr />
                    
                    {/* 
                        cartNum : 현재 장바구니의 갯수
                        totalPrice : 갯수 * 판매가
                        changeCartNum : 장바구니의 갯수를 변화 시키는 함수 
                    */}
                    <CountBox 
                        cartNum = { this.state.cartNum }
                        totalPrice = { this.state.totalPrice }
                        changeCartNum = { this.changeCartNum } 
                    />

                </Modal.Body>

                

                <Modal.Footer>
                    <Button onClick={ this.historyBack }>목록으로</Button>
                    <Button className="btn btn-primary">장바구니 담기</Button>
                </Modal.Footer>

            </Modal>

        );
    }
}

export default ProductModal;