import React, { useEffect, useState } from 'react';
import { AxiosGet, AxiosPost } from '../../Axios/axiosService';
import { API_URLS } from '../../Axios/constants';
import toast from 'react-hot-toast';

const ProductList = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [list, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState();


    const openModal = (product) => {
        setSelectedProduct(product);
        setSelectedColor(''); // Reset color and size on each open
        setSelectedSize('');
        setQuantity(1);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosGet(`${API_URLS.PRODUCT.PRODUCT_LIST}`);
                if (response && response.statusCode === 200) {
                    setProductList(response.data);
                }
            } catch (error) {
                toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
            }
        })();
    }, []);


    const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

    const handleConfirmOrder = async () => {
        const orderTotal = selectedProduct.price * quantity;

        const orderData = {
            items: [
                {
                    productId: selectedProduct._id,
                    quantity: quantity,
                    price: selectedProduct.price,
                    colorId: selectedColor,
                    size: selectedSize,
                },
            ],
            orderTotal: orderTotal,
        };

        try {
            const response = await AxiosPost(`${API_URLS.ORDER.ORDER_ADD}`, orderData)
            if (response && response.statusCode === 201) {
                toast.success("Order Created successfully")
                setSelectedProduct();
                setQuantity(1);
                closeModal();
            }
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle order creation failure
        }
    };

    return (
        <>
            {/* Product Card */}
            {list?.map((product, index) => (
                <div key={product._id} className='border rounded-lg shadow-md p-4 m-4 w-64'>
                    <div className='text-lg font-bold mb-2'>{product?.name}</div>
                    <div className='text-gray-600 mb-2'>Price: ₹{product?.price}</div>
                    <div className='mb-2'>
                        Colors: {product?.colors?.map((color) => color.name).join(', ')}
                    </div>
                    <div className='mb-2'>
                        Sizes: {product?.sizes?.map((size) => size).join(', ')}
                    </div>
                    <button
                        onClick={() => openModal(product)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
                        Buy Now
                    </button>
                </div>))}

            {/* Order Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Order Product</h2>

                        {/* Color Selection */}
                        <label className="block mb-2">Select Color:</label>
                        <select
                            className="w-full p-2 border rounded mb-4"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Select a color
                            </option>
                            {selectedProduct?.colors?.map((color) => (
                                <option key={color._id} value={color._id}>
                                    {color?.name}
                                </option>
                            ))}
                        </select>

                        {/* Size Selection */}
                        <label className="block mb-2">Select Size:</label>
                        <select
                            className="w-full p-2 border rounded mb-4"
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Select a size
                            </option>
                            {selectedProduct?.sizes?.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>

                        {/* Quantity Selection */}
                        <label className="block mb-2">Quantity:</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded mb-4"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                        />

                        <div className="mb-4 text-lg font-bold">
                            Total Price: ₹{totalPrice}
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={() => handleConfirmOrder(selectedProduct)}
                            className="bg-primary-600 text-white px-4 py-2 rounded w-full hover:bg-primary-800 transition duration-300"
                        >
                            Confirm Order
                        </button>

                        <button
                            onClick={closeModal}
                            className="mt-2 text-red-500 w-full text-center hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};


export default ProductList;
