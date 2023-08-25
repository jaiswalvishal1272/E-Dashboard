import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ProductList.css';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let userId = localStorage.getItem("user");
        userId = JSON.parse(userId);
        // console.log(userId);
        let result = await fetch(`http://localhost:5000/products/${userId._id}`);
        result = await result.json();
        setProducts(result);
        // console.log(result);
    }
    
    const search = async (e) => {
        let key = e.target.value;
        let userId = localStorage.getItem("user");
        userId = JSON.parse(userId);
        console.log(key);
        // console.log(userId._id);
        let searchProduct = await fetch(`http://localhost:5000/search/${userId._id}/${key}`);
        searchProduct = await searchProduct.json(); 
        setProducts(searchProduct);
        // console.log(userId._id);
        console.log(searchProduct);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"

        });
        result = await result.json();
        if(result) {
            getProducts();
        }
    }


    return (
        <div className="product-list">
            <h1>Products</h1>
            <input className="search-box" type="text" onChange={ search } placeholder="Search..." />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                products && products.length > 0 &&
                products.map((item, index) => 
                <ul key={item._id}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>${item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li>
                        <button onClick={ ()=>deleteProduct(item._id) }>Delete</button>
                        <Link to={"/update/"+item._id}>Update</Link>
                    </li>
                </ul>
                )
            }
        </div>
    )
}
export default ProductList;