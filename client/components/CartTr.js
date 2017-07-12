import React, { Component } from 'react';
import axios from 'axios';
import numberFormat from '../helper/numberFormat';

class CartTr extends Component {

    render() {
        return (
            <tr>
                <td>
                    이미지 영역
                </td>
                <td>
                    상품명
                </td>
                <td>
                    1,200원
                </td>
                <td>
                    1
                </td>
                <td>
                    1,200 원
                </td>
                <td>
                    <a href="#" className="btn btn-danger">
                        장바구니 삭제
                    </a>
                </td>
            </tr>
        );
    }
}

export default CartTr;