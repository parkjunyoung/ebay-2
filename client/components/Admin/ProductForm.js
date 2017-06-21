import React, { Component } from 'react';

class ProductWrite extends Component {
    
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
                                    <input type="text" className="form-control" name="product_name" ref="product_nameRef"  />
                                </td>
                            </tr>
                            <tr>
                                <th>제품이미지</th>
                                <td>
                                    <input type="file" />
                                </td>
                            </tr>
                            <tr>
                                <th>가격</th>
                                <td>
                                    <input type="text" className="form-control" style={{ width : "15%" }}  name="price"  />
                                </td>
                            </tr>
                            <tr>
                                <th>할인가</th>
                                <td>
                                    <input type="text" className="form-control" style={{ width : "15%" }} name="sale_price"  />
                                </td>
                            </tr>
                            <tr>
                                <th>설명</th>
                                <td>
                                    <textarea className="form-control" name="description" ></textarea>
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