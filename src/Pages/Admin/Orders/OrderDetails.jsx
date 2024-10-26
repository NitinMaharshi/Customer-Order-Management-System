import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../../Axios/constants';
import { AxiosGet, AxiosPatch } from '../../../Axios/axiosService';
import toast from 'react-hot-toast';
import { getCurrentUserDetail } from '../../../Authorisation';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [orderdata, setOrderdata] = useState({})
    const [selectedStatus, setSelectedStatus] = useState();

    // Handle status change
    const handleStatusChange = async (e) => {
        const Param = { status: e.target.value }
        try {
            const response = await AxiosPatch(`${API_URLS.ORDER.ORDER_UPDATE_STATUS}/${id}`, Param)
            if (response && response.statusCode === 200) {
                toast.success("Status Updated successfully")
            }

        } catch (error) {
            toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosGet(`${API_URLS.ORDER.ORDER_DETAILS}/${id}`);
                if (response && response.statusCode === 200) {
                    setOrderdata(response.data);
                    setSelectedStatus(response.data.status)
                }
            } catch (error) {
                toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
            }
        })();
    }, []);


    let UserData = getCurrentUserDetail()
    return (
        <div className='w-full'>
            {UserData?.user?.userType === "Admin" ? <div className='w-full flex justify-between items-center mb-2'>
                <div >
                    <select
                        id="status-select"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="block w-full p-2 border rounded-md"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button className='btn-primary !w-16' onClick={() => navigate(-1)}>Back</button>
            </div> :
                <div className='w-full flex justify-end p-4 mr-10 items-center mb-2'>
                    <button className='btn-primary !w-16' onClick={() => navigate(-1)}>Back</button>
                </div>
            }

            <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
                {/* Customer Details */}
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                    <p><span className="font-semibold">Name:</span> {`${orderdata?.customerId?.firstName} ${orderdata?.customerId?.lastName}`}</p>
                    <p><span className="font-semibold">Email:</span> {orderdata?.customerId?.email}</p>
                </div>

                {/* Order Items */}
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Items</h2>
                    {orderdata?.items?.map((item, index) => (
                        <div key={item._id} className="mb-4 p-4 border rounded-md">
                            <h3 className="text-lg font-medium mb-2">{item?.productId?.name}</h3>
                            <p><span className="font-semibold">Description:</span> {item?.productId?.description}</p>
                            <p><span className="font-semibold">Quantity:</span> {item?.quantity}</p>
                            <p><span className="font-semibold">Size:</span> {item?.size}</p>
                            <p><span className="font-semibold">Color ID:</span> {item?.colorId?.name}</p>
                            <p><span className="font-semibold">Price per item:</span> ₹{item?.price}</p>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                    <p><span className="font-semibold">Order Status:</span> {orderdata?.status}</p>
                    <p><span className="font-semibold">Order Total:</span> ₹{orderdata?.orderTotal}</p>
                    <p><span className="font-semibold">Order Date:</span> {new Date(orderdata?.orderDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
