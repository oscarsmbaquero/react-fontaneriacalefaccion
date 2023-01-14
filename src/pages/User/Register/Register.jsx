import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, useDispatchAuth } from '../../../context';
import "./Register.scss";
import Button from '@mui/material/Button';

const loginInitialState = {
    email: "",
    password: "",
    name: "",
    surname: "",
    account_type: ""
};

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatchAuth();

    const [registerForm, setRegisterForm] = useState(loginInitialState);

    const handleRegisterForm = (event) => {
        const { name, value } = event.target;
        setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            registerUser(dispatch, registerForm);
            setRegisterForm(loginInitialState);
            registerForm.account_type === "User" ? navigate("/Jobs")
                : navigate("/formCompanies");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="sectionRegister">
                  
            <div className="register">
                <form className="register__form" onSubmit={handleRegister}>
                <label className="register__label" htmlFor="email">Email</label>
                    <input
                        className="register__input"
                        type="text"
                        name="email"
                        value={registerForm.email}
                        onChange={handleRegisterForm}
                        required
                    />
                    <label className="register__label" htmlFor="account_type">Accout type</label>
                    <select className="register__input" defaultValue={"DEFAULT"} name="account_type" onChange={handleRegisterForm} required>
                        <option value="DEFAULT" disabled >Select user type</option>
                        <option >Tecnico</option>
                        <option >Dispatch</option>
                    </select>
                    <label className="register__label" htmlFor="name">Name</label>
                    <input
                        className="register__input"
                        type="text"
                        name="name"
                        value={registerForm.name}
                        onChange={handleRegisterForm}
                        required
                    />
                    <label className="register__label" htmlFor="surname">Surname</label>
                    <input
                        className="register__input"
                        type="text"
                        name="surname"
                        value={registerForm.surname}
                        onChange={handleRegisterForm}
                        // required
                    />                    
                    <label className="register__label" htmlFor="password">Password</label>
                    <input
                        className="register__input"
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterForm}
                        required
                    />
                    {/* <button className="register__button">Register</button> */}
                    <Button  
              type="submit"
              fullWidth
              variant="contained"
              sx={{maxWidth: '200px',
                   maxHeight: '30px',
                   margin:'20px 100px 100px 100px' 

                   }}
            >
              Sign In
            </Button>
                </form>
                <p>You already have an account. <Link to={"/users/login"}>Login</Link></p>
            </div>
        </section>
    )
}

export default Register