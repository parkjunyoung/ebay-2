import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import getDate from '../helper/getDate';

class ProductModal extends Component {

    constructor() {
        super();
        this.state = { 
            product : []
        };
        this.historyBack = this.historyBack.bind(this);
    }

    componentDidMount(){

        axios.get(`/api/admin/products/${this.props.match.params.id}`, {
        }).then( (res) => {
            this.setState({
                product: res.data.product
            });
        }).catch( (error) => {
            console.log(error);
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