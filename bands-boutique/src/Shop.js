import React, { useState, useEffect } from 'react';
import ringdata from './ringdata.json'
//import ringtree from './images/ring2.PNG'


const Shop = () => {
    const [cart, setCart] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch token from local storage or wherever you store it after login
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    useEffect(() => {
        fetchPurchaseHistory();
    }, []);

    //const products = [
    //    { id: 1, name: 'Gold Ring', price: 100 },
    //    { id: 2, name: 'Silver Ring', price: 50 },
    //    { id: 3, name: 'Diamond Ring', price: 500 },
    //];
    useEffect(() => {
        setProducts(ringdata);
    }, []);


    const handlePurchase = async () => {
        try {
            await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(cart)
            });
            setPurchaseHistory([...purchaseHistory, ...cart]); // Add purchased items to purchase history
            setCart([]); // Clear the cart after purchase
        } catch (error) {
            console.error('Error purchasing items:', error);
        }
    };

    const fetchPurchaseHistory = async () => {
        try {
            const response = await fetch('/api/purchase-history', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPurchaseHistory(data);
        } catch (error) {
            console.error('Error fetching purchase history:', error);
        }
    };

    return (
        <div className="container mx-auto p-8 mt-16">
            <h2 className="text-3xl font-semibold mb-4">Welcome to the Shop</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.name} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <img 
                        src={product.picture} 
                        alt="bruh" 
                        className="w-32 h-32 object-cover" // Set a fixed width and height for the images
                    />
                    <p className="text-gray-600">${product.price}</p>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        onClick={() => setCart([...cart, product])} // Add item to cart
                    >
                        Add to Cart
                    </button>
                    </div>
                ))}
            </div>
            {/* Display the cart */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Shopping Cart:</h3>
                <ul>
                    {cart.map(item => (
                        <li key={item.id} className="mb-2">
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
                {cart.length > 0 && (
                    <button 
                        className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        onClick={handlePurchase}
                    >
                        Purchase
                    </button>
                )}
            </div>
            {/* Display purchase history */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Purchase History:</h3>
                <ul>
                    {purchaseHistory.map((purchase, index) => (
                        <li key={index} className="mb-2">
                            {purchase.item} - ${purchase.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Shop;
