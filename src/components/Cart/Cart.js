import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    const total= cart.reduce((total,product)=> total+product.price *product.quantity,0);
    // let total=0;
    // for(let i=0; i<cart.length; i++){
    //     const product = cart[i];
    //     total=total+product.price * product.quantity;
    // }

    let shipping=0;
    if(total>35){
        shipping=0;
    }
    else if(total>15){
        shipping=4.99
    }
    else if(total>0){
        shipping=12.99
    }
    const text=(total/10).toFixed(2)
    const granTotal=(total+shipping+Number(text)).toFixed(2);
    function formatNumber(num){
        const precision=num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Item Order {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cast: {formatNumber(shipping)}</p>
            <p>Text + Vat: {text}</p>
            <p>Total Price: {Number(granTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;