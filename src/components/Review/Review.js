import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const auth = useAuth();
    const [cart, setCart]=useState([]);
   //Get selected item 
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys= Object.keys(saveCart);
        
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
         setCart(cartProducts)
      }, [])

      //Remove selected Item
      const removeProduct=(productKey)=>{
          const newCart = cart.filter(pd => pd.key !== productKey);
          setCart(newCart);
          removeFromDatabaseCart(productKey)
      } 

      //
      const handlePlaceOrder =()=>{
        setCart([]);
        processOrder();
      }
    return (
        <div className="twin-container">
               <div className="product-container">
               {
                cart.map(pd => <ReviewItem 
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}>
                        </ReviewItem>)     
               }
               {
                 !cart.length && <h1>Your cart is Empty .. <a href="/">Keep Shoping</a></h1>
               }
               </div> 
               <div className="cart-container">
                 <Cart cart={cart}>
                    <Link to="/shipment">
                      {
                        auth.user ? 
                          <button className="main-button">Proceed to Shipment</button>
                        : <button className="main-button">login to Proceed</button>
                      }
                    </Link>
                 </Cart>
               </div>       
        </div>
    );
};

export default Review;