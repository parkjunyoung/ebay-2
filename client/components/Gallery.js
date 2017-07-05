import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import Styles from './Gallery.css';
import { Link } from 'react-router-dom';

let masonryOptions = {
    transitionDuration: 0,
};

class Gallery extends Component {
    render() {
        let childElements = this.props.products.map( (product, key) => {
           return (
                <li key={key} className={ Styles.li_max }>
                    <Link to={`/products/${product.id}`}>
                        <img src={`/uploads/${product.thumbnail}`} className={ Styles.img_max } />
                    </Link>
                    <p className={ Styles.p_padding }>
                        { product.product_name }<br />
                        가격 : { product.sale_price ? product.sale_price  : product.price } 원
                    </p>
                </li>
            );
        });

        return (
            <Masonry
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
                {childElements}
            </Masonry>
        );
    }
}

export default Gallery;