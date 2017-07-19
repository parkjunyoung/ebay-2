import React, { Component } from 'react';
import axios from 'axios';
import getDate from '../../helper/getDate';
import numberFormat from '../../helper/numberFormat';
import { Link } from 'react-router-dom';
import CartTr from '../CartTr';

class OrderDetail extends Component {

    constructor(){
        super();
        this.state = { 
            order : [],
            status : "",
            song_jang : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //로딩시 상품 한개를 불러온다
        let orderId = this.props.match.params.id;
        axios.get(`/api/checkout/order/${orderId}`, {
        }).then( (res) => {
            this.setState({
                order : res.data.order,
                status : res.data.order.status,
                song_jang : res.data.order.song_jang
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    handleChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    handleSubmit(event){
        event.preventDefault();
        axios.put(`/api/checkout/order/${this.props.match.params.id}`, {
            status : this.state.status,
            song_jang : this.state.song_jang
        }).then( (res) => {
            if(res.data.message==="success"){
                alert('작성되었습니다.');
                this.props.history.push('/admin/order');
            }
        }).catch( (error) => {
            console.log(error);
        });
    }

    render() {
        let createdAt = getDate(this.state.order.createdAt);

        return (
            <div className="row">
                <h3>주문상세표</h3>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>주문자</th>
                                <td>
                                    {this.state.order.buyer_name}
                                    ( {this.state.order.buyer_email} )
                                </td>
                            </tr>
                            <tr>
                                <th>금액</th>
                                <td>
                                    {numberFormat(this.state.order.paid_amount)} 원
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    ( {this.state.order.buyer_postcode} )
                                    {this.state.order.buyer_addr}
                                </td>
                            </tr>
                            <tr>
                                <th>주문일</th>
                                <td>
                                    { createdAt.year } - 
                                    { createdAt.month } - 
                                    { createdAt.day }
                                </td>
                            </tr>
                            <tr>
                                <th>결재상태</th>
                                <td>
                                    {/*  value를 지정하면 일치하는 value값의 option을 select해준다 */  }
                                    <select name="status" id="" 
                                        className="form-control" 
                                        style={{ maxWidth: "120px" }} 
                                        value={this.state.status}
                                        onChange={this.handleChange}>
                                        <option value="">없음</option>
                                        <option value="결재완료">결재완료</option>
                                        <option value="배송중">배송중</option>
                                        <option value="배송완료">배송완료</option>
                                        <option value="구매완료">구매완료</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>송장번호</th>
                                <td>
                                    <input type="text" name="song_jang" className="form-control" value={this.state.song_jang || ''} onChange={this.handleChange}  />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/admin/order" className="btn btn-default" style={{ marginRight : "10px" }}>목록으로</Link>
                    <button className="btn btn-primary">상태변경</button>
                </form>
            </div>
        );
    }
}

export default OrderDetail;