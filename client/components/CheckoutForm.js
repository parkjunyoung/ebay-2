import React, { Component } from 'react';
import axios from 'axios';

class CheckoutFrom extends Component {

    constructor(){
        super();
        this.state = {
            buyer_email : "",
            buyer_name : "",
            buyer_tel : "",
            buyer_addr : "",
            buyer_postcode : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    handleSubmit(event){
        event.preventDefault();

        const IMP = window.IMP; 
        IMP.init('가맹점식별코드'); 
        //아임호트 사이트에서 받아온다( http://www.iamport.kr/ )
        IMP.request_pay({
            pg : 'inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '수업:결제테스트',
            amount : this.props.totalAmount ,
            buyer_email : this.state.buyer_email,
            buyer_name : this.state.buyer_name,
            buyer_tel : this.state.buyer_tel,
            buyer_addr : this.state.buyer_addr,
            buyer_postcode : this.state.buyer_postcode,
            m_redirect_url : 'http://localhost:3000/api/checkout/mobile_complete'
        }, (rsp) => {
            if ( rsp.success ) {
                
                //요청 성공후 ajax POST요청한다.
                axios.post('/api/checkout/complete', {
                    imp_uid : rsp.imp_uid,
                    merchant_uid : rsp.merchant_uid,
                    paid_amount : rsp.paid_amount,
                    apply_num : rsp.apply_num,
                    
                    buyer_email : this.state.buyer_email,
                    buyer_name : this.state.buyer_name,
                    buyer_tel : this.state.buyer_tel,
                    buyer_addr : this.state.buyer_addr,
                    buyer_postcode : this.state.buyer_postcode,

                    status : "결재완료",

                }).then( (res) => {
                    alert("결제가 완료되었습니다.");
                    document.location.href = "/";
                }).catch( (error) => {
                    console.log(error); 
                });

            } else {
                let msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
                alert(msg);
            }
            

        });

    }


    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <h3 className="text-center">배송지정보</h3>
                <table className="table table-bordered table-hover" style={ { maxWidth: "500px" , margin : "0 auto" } }>
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input type="text" name="buyer_email" className="form-control"  placeholder="abc@abc.com" 
                                 value={this.state.buyer_email} onChange={this.handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>구매자이름</th>
                            <td>
                                <input type="text" name="buyer_name" className="form-control" 
                                 value={this.state.buyer_name} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>핸드폰번호</th>
                            <td>
                                <input type="text" name="buyer_tel" className="form-control"  placeholder="010-0000-0000" 
                                 value={this.state.buyer_tel} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input type="text" name="buyer_addr" className="form-control" 
                                 value={this.state.buyer_addr} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>우편번호</th>
                            <td>
                                <input type="text" name="buyer_postcode" className="form-control" placeholder="000-000" 
                                 value={this.state.buyer_postcode} onChange={this.handleChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center" style={ {  margin : "30px 0 100px 0" } }>
                    <button className="btn btn-primary">구매하기</button>
                </div>
            </form>
        );
    }
}

export default CheckoutFrom;