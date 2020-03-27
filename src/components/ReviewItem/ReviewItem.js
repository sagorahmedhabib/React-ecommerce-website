import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, price, key}=props.product
    return (
        <div style={{
            borderBottom:'1px solid green',
            margin: '0 200px 5px 10px',
            padding:'5px',
            marginLeft: '150px'
       }} className="review-item">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button className="main-button" onClick={()=> props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;