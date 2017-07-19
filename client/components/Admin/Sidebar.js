import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className="col-sm-2">
                <div className="panel panel-default">
                    <div className="panel-heading">메뉴</div>
                    <div className="panel-body">
                        <ul>
                            <li><Link to="/admin/products">제품리스트</Link></li>
                            <li><Link to="/admin/order">주문리스트</Link></li>
                        </ul>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Sidebar;