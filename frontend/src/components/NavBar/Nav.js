import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div>
            <img className='logo' src='https://media.istockphoto.com/id/1286680331/vector/adoption-and-community-care.jpg?s=1024x1024&w=is&k=20&c=Yx44juwp4ecCydRe9QhQlCl_uOY8cXGuRswevIj2SE8=' alt='Logo' />
            { auth ?
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    {/* <li>{ auth ? <Link to="/signup" onClick={ logout }>Logout</Link> : <Link to="/signup">Sign Up</Link> }</li>
                    <li><Link to="/login">Log In</Link></li> */}
                    <li><Link to="/signup" onClick={ logout }>Logout ({JSON.parse(auth).name})</Link></li>

                    {/* {
                        auth ? <li><Link to="/signup" onClick={ logout }>Logout</Link></li> : <>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                        </>
                    } */}
                
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            }   
        </div>
    )
}
export default Nav;