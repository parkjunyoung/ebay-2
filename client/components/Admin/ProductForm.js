import React, { Component } from 'react';
import axios from 'axios';

class ProductWrite extends Component {

    constructor(){
        super();
        this.state = {
            method : "post",
            action : "/api/admin/products",
            product_name : "",
            price : "",
            sale_price : "",
            description : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        let urlSecondPath = this.props.location.pathname.split('/')[3];
        let productId = this.props.match.params.id;
        
        if(urlSecondPath==='edit'){
            axios.get(`/api/admin/products/${productId}`, {
            }).then( (res) => {
                this.setState({
                    method : "put", 
                    action : `/api/admin/products/${productId}`,
                    product_name : res.data.product.product_name,
                    price : res.data.product.price,
                    sale_price : res.data.product.sale_price,
                    description : res.data.product.description
                });
            }).catch( (error) => {
                console.log(error);
            });
        }
    }

    handleFile(event){
        this.setState({thumbnail:event.target.files[0]})
    }

    handleChange(event){
        let result = {};
        result[event.target.name] = event.target.value;
        this.setState(result);
    }


    handleSubmit(event){
        event.preventDefault();
        if(!this.state.product_name){
            alert("제품명을 입력하세요.");
            this.refs.product_nameRef.focus();
            return;
        }
        if(!this.state.price && !this.state.sale_price ){
            alert("가격 또는 할인가를 입력하세요.");
            return;
        }

        const formData = new FormData();
        formData.append('product_name', this.state.product_name);
        formData.append('thumbnail', this.state.thumbnail);
        formData.append('price', this.state.price);
        formData.append('sale_price', this.state.sale_price);
        formData.append('description', this.state.description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios({
            method : this.state.method,
            url : this.state.action,
            data : formData,
            config : config
        }).then( (res) => {
            if(res.data.message==="success"){
                alert('작성되었습니다.');
                this.props.history.push('/admin/products');
            }
        }).catch( (error) => {
            console.log(error);
        });
        
    }

    
    render() {
        return (
            <div>
                <form action="" method="post" onSubmit={this.handleSubmit}>
                    <h3>제품등록</h3>
                    <table className="table table-bordered table-hover">
                        <tbody> 
                            <tr>
                                <th>제품명</th>
                                <td>
                                    <input type="text" className="form-control" name="product_name" ref="product_nameRef" value={this.state.product_name} onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>제품이미지</th>
                                <td>
                                    <input type="file" name="thumbnail" onChange={this.handleFile}/>
                                </td>
                            </tr>
                            <tr>
                                <th>가격</th>
                                <td>
                                    <input type="text" className="form-control" style={{ width : "15%" }}  name="price"  value={this.state.price} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>할인가</th>
                                <td>
                                    <input type="text" className="form-control" style={{ width : "15%" }} name="sale_price"  value={this.state.sale_price} onChange={this.handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <th>설명</th>
                                <td>
                                    <textarea className="form-control" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary">작성하기</button>
                </form>
            </div>
        );
    }
}

export default ProductWrite;