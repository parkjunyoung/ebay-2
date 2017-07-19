import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class ShippingModal extends Component {

    constructor() {
        super();
        this.state = { 
            shippingList : []
        };
        this.historyBack = this.historyBack.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/checkout/shipping/${this.props.match.params.id}`, {
        }).then( (res) => {
            this.setState({
                shippingList : res.data
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    historyBack(){
        this.props.history.push('/admin/order');
    }

    render(){
        return (
            <Modal show={true} onHide={ this.historyBack }>
                <Modal.Header>
                    <Modal.Title>
                        배송위치 추적
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>단계</th>
                                <th>처리</th>
                                <th>상품상태</th>
                                <th>위치</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                           {Object.keys( this.state.shippingList ).map( ( index, key)=>{  
                                return (
                                    <tr key={key}>
                                        <td>{ this.state.shippingList[index].step }</td>
                                        <td>{ this.state.shippingList[index].date }</td>
                                        <td>{ this.state.shippingList[index].status }</td>
                                        <td>{ this.state.shippingList[index].location }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                   </table>
                </Modal.Body>

                

                <Modal.Footer>
                    <Button onClick={ this.historyBack }>목록으로</Button>
                </Modal.Footer>

            </Modal>

        );
    }
}

export default ShippingModal;