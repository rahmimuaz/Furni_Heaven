import React, { useContext, useState, useRef } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import { StoreContext } from '../../context/StoreContext';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [category, setCategory] = useState("All Products");
  const { featuredProducts } = useContext(StoreContext);
  const productRef = useRef(null);

  const scrollToProducts = () => {
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProduct = (productId) => {
    const productElement = document.getElementById(productId);
    if (productElement) {
      productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredProducts = category === "All Products"
    ? featuredProducts
    : featuredProducts.filter(product => product.category === category);

  return (
    <div className="home">
      <Header scrollToProducts={scrollToProducts} />
      <ExploreMenu category={category} setCategory={setCategory} scrollToProducts={scrollToProducts} />
      <div ref={productRef}>
        <ProductDisplay category={category} products={filteredProducts} scrollToProduct={scrollToProduct} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
