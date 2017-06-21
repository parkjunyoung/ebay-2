import React, { Component } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import ProductList from '../components/Admin/ProductList';
import ProductForm from '../components/Admin/ProductForm';
import ProductDetail from '../components/Admin/ProductDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Admin extends Component {
    render() {
        return (
            <Router>
                <div className="row">
                    <Sidebar/>
                    <div className="col-sm-9">
                        <Route exact path="/admin/products" component={ProductList} />
                        <Route path="/admin/products/:id(\d+)" component={ProductDetail} />
                        <Route path="/admin/products/edit/:id(\d+)" component={ProductForm} />
                        <Route path="/admin/products/write" component={ProductForm} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default Admin;