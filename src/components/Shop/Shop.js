import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const fakeData10 = fakeData.slice(0,10);
    const [products, setProducts]=useState(fakeData10);
    const [cart, setCart] = useState([]);
  
    //Add data to database
    const handleAddProduct=(product)=>{
        /*product add one time| and |
          quantity add with 
          quantity count add Again Again*/

          const toBeAddedKey = product.key;
          const sameProduct=cart.find(pd => pd.key ===toBeAddedKey);
          let count=1;
          let newCart;
          if(sameProduct){
              count = sameProduct.quantity + 1;
              sameProduct.quantity= count;
              const others = cart.filter(pd =>pd.key !== toBeAddedKey);
              newCart=[...others, sameProduct]
          }
          else{
            product.quantity = 1;
            newCart=[...cart, product ]
         }
           setCart(newCart);
           addToDatabaseCart(product.key, count);

        /* Again and again added product with Again and again added but quantity not found*/ 
        // const newCart=[...cart,product]
        // setCart(newCart)
        // const sameProduct=newCart.filter(pd => pd.key === product.key);
        // const count=sameProduct.length
        // addToDatabaseCart(product.key, count);
    }

    //get show data from database
      useEffect(()=>{
         const saveCart = getDatabaseCart();
         const productKeys = Object.keys(saveCart);
         const previousCart = productKeys.map(existingKey =>{
               const product = fakeData.find(pd=> pd.key === existingKey);
               product.quantity = saveCart[existingKey];
               return product;
         })
         setCart(previousCart);
      },[]);
    return (
        <div className="twin-container">
            <div className="product-container">
            {
              products.map(product =><Product
                      key={product.key}
                      showAddToCart={true}
                      handleAddProduct={handleAddProduct}
                      product={product}>
                      </Product>
                      )
            }
            </div>
            <div className="cart-container">
              <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review</button></Link>
              </Cart>
            </div>
        </div>
    );
};

export default Shop;