import React, { useState } from "react";
import './AddProduct.css';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct = async () => {

        console.log(!name);
        if(!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="input-box" type="text" value={ name } onChange={ (e)=>setName(e.target.value) } placeholder="Enter Product Name..." />
            { error && !name && <span className="invalid-err-msg">Enter valid name</span>}
            <input className="input-box" type="text" value={ price } onChange={ (e)=>setPrice(e.target.value) } placeholder="Enter Product Price..." />
            { error && !price && <span className="invalid-err-msg">Enter valid price</span>}
            <input className="input-box" type="text" value={ category } onChange={ (e)=>setCategory(e.target.value) } placeholder="Enter Product Category..." />
            { error && !category && <span className="invalid-err-msg">Enter valid category</span>}
            <input className="input-box" type="text" value={ company } onChange={ (e)=>setCompany(e.target.value) } placeholder="Enter Product Company..." />
            { error && !company && <span className="invalid-err-msg">Enter valid company name</span>}

            <button className="add-product-btn" type="button" onClick={ addProduct }>Add Product</button>
        </div>
    )
}
export default AddProduct;