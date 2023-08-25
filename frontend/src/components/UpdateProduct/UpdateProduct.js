import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();

    useEffect(() => {
        getProductDetail();
    }, []);

    const getProductDetail = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = () => {
        console.log(name, price, category, company);
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input className="input-box" type="text" value={ name } onChange={ (e)=>setName(e.target.value) } placeholder="Enter Product Name..." />
            {/* { error && !name && <span className="invalid-err-msg">Enter valid name</span>} */}
            <input className="input-box" type="text" value={ price } onChange={ (e)=>setPrice(e.target.value) } placeholder="Enter Product Price..." />
            {/* { error && !price && <span className="invalid-err-msg">Enter valid price</span>} */}
            <input className="input-box" type="text" value={ category } onChange={ (e)=>setCategory(e.target.value) } placeholder="Enter Product Category..." />
            {/* { error && !category && <span className="invalid-err-msg">Enter valid category</span>} */}
            <input className="input-box" type="text" value={ company } onChange={ (e)=>setCompany(e.target.value) } placeholder="Enter Product Company..." />
            {/* { error && !company && <span className="invalid-err-msg">Enter valid company name</span>} */}

            <button className="add-product-btn" type="button" onClick={ updateProduct }>Update Product</button>
        </div>
    )
}
export default UpdateProduct;