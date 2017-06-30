import React, { Component } from 'react';
import axios from 'axios';

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username : '' ,
            password : '' ,
            displayname : ''
        };

        // 컴포넌트 접근하기 위해 this binding 해줌
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //상태 변할때마다 state값에 저장
    handleChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    //form 전송
    handleSubmit(event){
        event.preventDefault();
        if(!this.state.username){
            alert("이름을 입력하세요");
            this.refs.usernameRef.focus();
            return;
        }
        if(!this.state.password){
            alert("비밀번호를 입력하세요");
            this.refs.passwordRef.focus();
            return;
        }
        if(!this.state.displayname){
            alert("닉네임을 입력하세요");
            this.refs.displaynameRef.focus();
            return;
        }
        
        //POST /api/accounts/join 요청
        axios.post('/api/accounts/join', {
            username : this.state.username,
            displayname : this.state.displayname,
            password : this.state.password
        }).then( (res) => {
            if(res.data.message==="success"){
                alert('회원가입성공');
                this.props.history.push('/login');
            }
        }).catch( (error) => {
            console.log(error);
        });


    }


    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">회원가입</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" action="" id="join_form" method="post" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="ID" name="username" ref="usernameRef" value={this.state.username} onChange={this.handleChange} type="text" required="" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" ref="passwordRef" value={this.state.password} onChange={this.handleChange} type="password"  required="" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password 확인" name="password2" type="password" required="" />
                                    </div>

                                    <div className="form-group">
                                        <input className="form-control" placeholder="이름" name="displayname" type="text" ref="displaynameRef" value={this.state.displayname} onChange={this.handleChange} required="" />
                                    </div>
                                    
                                    <input type="submit" className="btn btn-lg btn-success btn-block" value="가입하기" />
                                    <div style={{ marginTop: "10px" }}>
                                        <a href="/api/auth/facebook" className="btn btn-lg btn-primary btn-block">
                                            <i className="fa fa-facebook" aria-hidden="true"></i> 페이스북으로 회원가입
                                        </a>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Join;