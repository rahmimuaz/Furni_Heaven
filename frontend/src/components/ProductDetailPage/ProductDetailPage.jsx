import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useContext(StoreContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((p) => p._id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!products) {
    return <div>Loading product list...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={`http://localhost:5001/images/${product.image}`} alt={product.name} />
      <p>Price: LKR {product.retailPrice}</p>
      <p>Quantity in stock: {product.quantity}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetailPage;
