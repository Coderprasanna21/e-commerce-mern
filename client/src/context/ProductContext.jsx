import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { fetchProducts, getSingleProductApi } from '../api';

const ProductContext = createContext();
export const ProductProvider = ({ children}) => {

    const [productList, setProductList] = useState([]);
    const [productDetail,setProductDetail] = useState(null)
    const [loading,setLoading]  = useState(false);

    useEffect(()=>{
      const getProducts = async () =>{
        setLoading(true);
        try{
          const {data} = await fetchProducts();
          setProductList(data);
        }
        catch(err)
        {
          console.log("Error fetching products", err.message);
        }
        finally{
          setLoading(false)
        }
      }
      getProducts();
    },[])

      const getSingleProduct = async( productId) =>{
        try{
          setLoading(true);
          const response = await getSingleProductApi( productId);
          setProductDetail(response.data.product);
        }
        catch(error)
        {
          console.log("error to get product details",error);
        }
        finally{
          setLoading(false)
        }
      }



  return (
    <ProductContext.Provider value={{productList , loading, getSingleProduct, productDetail}}>
        {children}
    </ProductContext.Provider>
  )
}


export default ProductContext;