import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URLS } from '../../../Axios/constants'
import { AxiosGet } from '../../../Axios/axiosService'

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [productData, setProductData] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosGet(`${API_URLS.PRODUCT.PRODUCT_DETAILS}/${id}`);
                if (response && response.statusCode === 200) {
                    setProductData(response.data);
                }
            } catch (error) {
                toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
            }
        })();
    }, []);

    return (
        <div className='w-full'>
            <div className='w-full flex justify-end items-center'>
                <button className='btn-primary !w-16' onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className='grid grid-cols-2 gap-4 text-black'>
                {/* Product Name */}
                <div className='w-full font-semibold'>Name:</div>
                <div className='w-full'>{productData?.name || 'N/A'}</div>

                {/* Product Price */}
                <div className='w-full font-semibold'>Price:</div>
                <div className='w-full'>{productData?.price || 'N/A'}</div>

                {/* Product Sizes */}
                <div className='w-full font-semibold'>Sizes:</div>
                <div className='w-full'>
                    {productData?.sizes?.length > 0
                        ? productData?.sizes?.map((item) => item || 'N/A').join(', ')
                        : 'N/A'}
                </div>

                {/* Product Colors */}
                <div className='w-full font-semibold'>Colors:</div>
                <div className='w-full'>
                    {productData?.colors?.length > 0
                        ? productData?.colors?.map((color) => color?.name || 'N/A').join(', ')
                        : 'N/A'}
                </div>
                {/* Product Description */}
                <div className='w-full font-semibold'>Description:</div>
                <div className='w-full'>{productData?.description || 'N/A'}</div>
            </div>

        </div>
    )
}

export default ProductDetails
