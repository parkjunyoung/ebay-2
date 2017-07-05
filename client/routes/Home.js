import React, { Component } from 'react';
import axios from 'axios';
import Gallery from '../components/Gallery';
import { Route } from 'react-router-dom';
import ProductModal from '../components/ProductModal';

class Home extends Component {
    constructor(){
        super();
        this.state = { 
            products : []
        };
    }

    componentDidMount(){
        
        axios.get('/api/admin/products')
        .then( (res) => {
            this.setState({
                products : res.data.products
            });
        }).catch( (error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Gallery products={ this.state.products }/>
                <Route path="/products/:id" component={ProductModal} />
            </div>
        );
    }
}
export default Home;