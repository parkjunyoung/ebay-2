import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {

    render() {
        return (
            <div className="row">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>제품명</th>
                            <th>가격</th>
                            <th>등록일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/admin/products/write" className="btn btn-primary">등록하기</Link>
            </div>
        );
    }
}

export default ProductList;