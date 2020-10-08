import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { listProducts, saveProduct, deleteProduct } from '../actions/productActions';


function ProductsScreen(props) {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo}=userSignin;
  const[modalVisible,setModalVisible] = useState(false);
  const[id,setId]=useState();
  const[name,setName]=useState();
  const[price,setPrice]=useState();
  const[image,setImage]=useState();
  const[brand,setBrand]=useState();
  const[category,setCategory]=useState();
  const[countInStock,setCountInStock]=useState();
  const[description,setDescription]=useState();
  const productSave=useSelector(state=>state.productSave);
  const productDelete=useSelector(state=>state.productDelete);
  const productList = useSelector(state=>state.productList);
  const {loading,products,error} = productList;
  const{loading:loadingSave, success:successSave,error:errorSave} = productSave;
  const{loading:loadingDelete, success:successDelete,error:errorDelete} = productDelete;
   const dispatch = useDispatch();
   useEffect(()=>{
       if(successSave){
           setModalVisible(false);
       }
      dispatch(listProducts());

   },[successSave, successDelete])
   const openModal = (product)=>{
       setModalVisible(true);
       setId(product._id);
       setName(product.name);
       setPrice(product.price);
       setImage(product.image);
       setBrand(product.brand);
       setCategory(product.category);
       setCountInStock(product.countInStock);
       setDescription(product.description);
   }

   const submitHandler=(e)=>{
       e.preventDefault();
       dispatch(saveProduct({
           _id:id,
           name, price,image,brand,category,countInStock,description}));
   }

   const deleteHandler = (product)=> {
       dispatch(deleteProduct(product._id));
   }

    return <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                
                {
                    userInfo && userInfo.isAdmin? <button id="create-btn" className="button primary" onClick={()=>openModal({})}>
                                                    Create Product
                                                </button> 
                                               : <div>
                                                    <strong style={{color:"red"}}>You need Admin access to create a product</strong>
                                                </div>
                }
                
            </div>
            {modalVisible &&  <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                        {loadingSave && <div> Loading...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id="name" onChange={(e)=>setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" value={price} id="price" onChange={(e)=>setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" value={image}id="image" onChange={(e)=>setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" value={brand} id="brand" onChange={(e)=>setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="countinstock">
                            Number of Items
                        </label>
                        <input type="text" name="countinstock" value={countInStock} id="countinstock" onChange={(e)=>setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" id="category" value={category}onChange={(e)=>setCategory(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea  name="description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </li>
                   
                    <li>
                        <button type="submit" className="button primary">{id ?"Update":"Create"}</button>
                    </li>
                    <li>
                        <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                    </li>
                </ul>    
            </form>
        </div>}
           

            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Brand
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>(
                               <tr key={product._id}>
                               <td>
                                   {product._id}
                               </td>
                               <td>
                                {product.name}
                               </td>
                               <td>
                               {product.price}
                               </td>
                               <td>
                                {product.category}
                               </td>
                               <td>
                                {product.brand}
                               </td>
                               <td>
                               {
                    userInfo && userInfo.isAdmin?   <div><button className="button" onClick={()=>openModal(product)}>Edit</button>{'  '}
                                                    <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
                                               </div>: <div>
                                                    <strong style={{color:"red"}}>You need Admin access to Edit/Delete a product</strong>
                                                </div>
                }
                                 
                               </td>
                           </tr>
                        ))}
                     
                    </tbody>
                </table>
            </div>
         
        </div>
}

export default ProductsScreen;