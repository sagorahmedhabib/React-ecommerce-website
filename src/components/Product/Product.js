import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product)
      const {name, img, price, seller, stock, key}=props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="left-margin">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p> <small> by: {seller}</small></p>
                <p>Price: ${price}</p>
                <p>Only {stock} left in stock order soon</p>
                {
                   props.showAddToCart &&
                    <button className="main-button" onClick={()=>props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;