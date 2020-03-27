import React from 'react';
import { useForm } from 'react-hook-form'
import './Shipment.css'
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();
    return (
        <div>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name"/>
                {errors.name && <span className="error">Name is required</span>}
                <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your E-mail"/>
                {errors.email && <span className="error">E-mail is required</span>}
                <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
                {errors.AddressLine1 && <span className="error">Address is required</span>}
                <input name="AddressLine2" ref={register} placeholder="Address Line 2" />
                <input name="city" ref={register({ required: true })} placeholder="City"/>
                {errors.city && <span className="error">City is required</span>}
                <input name="country" ref={register({ required: true })} placeholder="Country"/>
                {errors.country && <span className="error">Country is required</span>}
                <input name="zip" ref={register({ required: true })} placeholder="Zip Code"/>
                {errors.zip && <span className="error">zipCode is required</span>}
                
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipment;