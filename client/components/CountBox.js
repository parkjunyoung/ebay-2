import React from 'react';
import styles from './CountBox.css';
import numberFormat from '../helper/numberFormat';
import PropTypes from 'prop-types';

const CountBox = ({ changeCartNum, totalPrice, cartNum  }) => {
    /* 
        ({ changeCartNum, totalPrice, cartNum  }) 
        이렇게 넘겨주면 props를 안써도 된다.
    */
    return (
        <div>
            <div className={styles.printNum}>갯수 : </div>
            <div className={styles.CountBox}>
                <a href="#" onClick={ (event) => changeCartNum("minus", event) } >-</a>
                <p>{ cartNum }</p>
                <a href="#" onClick={ (event) => changeCartNum("plus", event) }>+</a>
            </div>
            <div className={styles.priceWrap}>
                금액 : <span>{ numberFormat( totalPrice ) }</span>
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    );
}

CountBox.propTypes = {
    changeCartNum : PropTypes.func,
    totalPrice : PropTypes.number,
    cartNum : PropTypes.number
};

export default CountBox;