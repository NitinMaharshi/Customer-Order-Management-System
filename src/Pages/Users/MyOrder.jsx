import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import CustomTable from '../../Components/Table/CustomTable';
import { API_URLS } from '../../Axios/constants';
import { AxiosGet } from '../../Axios/axiosService';

const ProductColor = () => {
    const navigate = useNavigate()
    const [currentCell, setCurrentCell] = useState({});

    // State's for table
    const [tableData, setTableData] = useState({ data: [], isSuccess: false, error: '', isLoading: false, updateData: false });


    useEffect(() => {
        fetchColorList();
    }, [tableData?.updateData]);

    const fetchColorList = async () => {
        try {
            const response = await AxiosGet(`${API_URLS.ORDER.OWNED_ORDER}`);
            if (response) {
                setTableData({ ...tableData, isSuccess: true, data: response.data, isLoading: false });
            }
        } catch (error) {
            toast.error('Something Went Wrong', { id: 'nodata', duration: 2000 });
        }
    };

    const Columns = useMemo(() => [
        {
            header: 'Name',
            value: (cell) => (<span className='text-uppercase'>{cell?.customerId.firstName ? cell?.customerId.firstName : '--'} </span>)
        },
        {
            header: 'Email',
            value: (cell) => (<span className='text-uppercase'>{cell?.customerId.email ? cell?.customerId.email : '--'} </span>)
        },
        {
            header: 'Order Amount',
            value: (cell) => (<span className='text-uppercase'>{cell?.orderTotal ? cell?.orderTotal : '--'} </span>)
        },
        {
            header: 'Status',
            value: (cell) => (<span className='text-uppercase'>{cell?.status ? cell?.status : '--'} </span>)
        },
        {
            header: 'Action',
            width: '5%',
            value: (cell) => (
                <div className='flex items-center justify-between gap-x-3'>
                    <FaEye size={18} className='cursor-pointer transition duration-300 hover:scale-125' onClick={() =>
                        navigate(`/my-order/${cell?._id}`)} />

                </div>
            )
        },
    ], []);


    return (
        <>
            <div className='shadow-lg rounded-md'>
                <div className='p-5 bg-white  rounded-md'>
                    <CustomTable
                        tableData={tableData}
                        headerData={Columns}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductColor;
