import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserType } from '../../types/UserType';
import { addNewUser } from '../../services/Users';
import Loader from '../Common/Loader';

const CreateUser = () => { 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: ''
    });

    //Update the state of user by creating new ...user obj to keep immutable component
    const handelInput = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handelSubmit = async(event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const payload: UserType = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value
        };
        // Call addNewUser api from userService
        addNewUser(payload).then((res) => {          
                alert('Form submitted successfully!');
                console.log('form submit: ', res);
                setUser({name: "",email: "",phone: ""});
                setIsLoading(false);
                navigate('/react');
            })
            .catch((err) => {
                  setIsLoading(false);
                  console.log(err);
            });
        // axios.post(createUserApi, {
        //     method:"POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify(payload)
        // })
        // .then((res) => {          
        //     alert('Form submitted successfully!');
        //     console.log('form submit: ', res);
        //     setUser({name: "",email: "",phone: ""});
        //     setIsLoading(false);
        //     navigate('/');
        // })
        // .catch((err) => {
        //   setIsLoading(false);
        //   console.log(err);
        // });
    };

    return (
        <div className='user-form'>
        <div className='heading'>
           { isLoading && <Loader /> }
            <p>User Form</p>
        </div>
        <form onSubmit={handelSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
            </div>
            <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Phone</label>
                <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handelInput} />
            </div>
            <button type="submit" className="btn btn-primary submit-btn">Submit</button>
        </form>
    </div>
    );
}

export default CreateUser;