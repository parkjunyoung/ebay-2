import React, { Component } from 'react';
import io from 'socket.io-client'; //모듈 불러옴

//socket통신할 url 지정
let socket = io(`http://localhost:3000`);


class Chat extends Component {

    constructor(){
        super();
        this.state = { 
            message : "",
            chatBody : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {    
        socket.on('chat message', (data)=>{
            let chatBody = this.state.chatBody;
            chatBody.push(data);
            this.setState({
                chatBody: chatBody
            });
        });
    }

    handleChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }

    handleSubmit(event){
        event.preventDefault();
        socket.emit('chat message', { message : this.state.message } );
        this.setState({
            message: ""
        });
        
    }
    
    render() {
        return (
            <div>
                <div className="panel panel-default" id="chatWrap">
                    <div className="panel-heading">대화내용</div>
                    <div className="panel-body" 
                        style={{ minHeight: "350px", maxHeight: "350px",  overflowY: "scroll" }}>
                        <ul id="chatBody">
                            {this.state.chatBody.map( (chat, key)=>{  
                                return (
                                    <li>{chat}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>   

                <div>
                    <form action="" method="post" id="sendForm" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <input type="hidden" name="socketId" />

                            <input type="text" name="message" className="form-control" 
                                placeholder="대화내용을 입력해주세요."
                                value={this.state.message} onChange={this.handleChange}/>

                            <span className="input-group-btn">
                                <button className="btn btn-primary">작성하기</button>
                            </span>
                        </div>
                    </form>  

                </div>


            </div>
        );
    }
}

export default Chat;