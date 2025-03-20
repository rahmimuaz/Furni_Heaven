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

    // Ref to scroll to the product section
    const productRef = useRef(null);

    // Function to scroll to the product section
    const scrollToProducts = () => {
        if (productRef.current) {
            productRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to scroll to a specific product
    const scrollToProduct = (productId) => {
        const productElement = document.getElementById(productId);
        if (productElement) {
            productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Filter products based on the selected category
    const filteredProducts = category === "All Products"
        ? featuredProducts
        : featuredProducts.filter(product => product.category === category);

    return (
        <div className="home">
            <Header scrollToProducts={scrollToProducts} />
            <div ref={productRef}>
                <ExploreMenu category={category} setCategory={setCategory} />
                <ProductDisplay category={category} products={filteredProducts} scrollToProduct={scrollToProduct} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
