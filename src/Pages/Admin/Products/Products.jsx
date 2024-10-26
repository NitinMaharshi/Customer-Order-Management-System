import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";

import AddProductModal from './AddProductModal';
import CustomTable from '../../../Components/Table/CustomTable';
import ConfirmModal from "../../../Components/CommenModal/Comfirm"
import { API_URLS } from '../../../Axios/constants';
import { AxiosDelete, AxiosGet } from '../../../Axios/axiosService';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState({ AddEditModal: false, ConfirmModal: false });
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [currentCell, setCurrentCell] = useState({});

    // State's for table
    const [tableData, setTableData] = useState({ data: [], isSuccess: false, error: '', isLoading: false, updateData: false });

    const toggleModal = () => setShowModal(prev => ({ ...prev, AddEditModal: !prev.AddEditModal }));
    const toggleConfirmModal = () => setShowModal(prev => ({ ...prev, ConfirmModal: !prev.ConfirmModal }));

    useEffect(() => {
        fetchUserData();
    }, [tableData?.updateData]);

    const fetchUserData = async () => {
        try {
            const response = await AxiosGet(`${API_URLS.PRODUCT.PRODUCT_LIST}`);
            if (response) {
                setTableData({ ...tableData, isSuccess: true, data: response.data, isLoading: false });
            }
        } catch (error) {
            toast.error('Something Went Wrong', { id: 'nodata', duration: 2000 });
        }
    };

    // When someone clik add user button then this function called first
    const handleAddMore = () => {
        setTitle('Add Product');
        setCurrentCell({});
        toggleModal();
    };
    const handleEditProduct = (data) => {
        setTitle('Edit Product');
        setCurrentCell(data);
        toggleModal();
    };
    const Columns = useMemo(() => [
        {
            header: 'Name',
            name: 'name',
            value: (cell) => (<span className='text-uppercase'>{cell?.name ? cell?.name : '--'} </span>)
        },
        {
            header: 'Price',
            name: 'price',
            value: (cell) => (<span className='text-uppercase'>{cell?.price ? cell?.price : '--'} </span>)
        },
        {
            header: 'Action',
            width: '5%',
            value: (cell) => (
                <div className='flex items-center justify-between gap-x-3'>
                    <MdDeleteOutline size={25} color='#C54726' className='cursor-pointer' onClick={() => { setCurrentCell(cell); toggleConfirmModal(); }} />

                    <FaRegEdit size={18} className=' cursor-pointer' onClick={() => handleEditProduct(cell)} />

                    <FaEye size={18} className='cursor-pointer transition duration-300 hover:scale-125' onClick={() => navigate(`/products/${cell?._id}`)} />
                </div>
            )
        },
    ], []);

    const handleDeletProduct = async () => {
        setLoadingStatus(true);
        try {
            const response = await AxiosDelete(`${API_URLS.PRODUCT.PRODUCT_DELETE}/${currentCell._id}`);
            if (response && response.statusCode === 200) {
                toast.success('Product deleted successfully!', { id: 'updated', duration: 2000 });
                toggleConfirmModal();
                setCurrentCell({});
                setLoadingStatus(false);
                setTableData((prev) => ({ ...prev, updateData: !prev.updateData }));
            } else {
                toggleConfirmModal();
                setLoadingStatus(false);
            }
        } catch (error) {
            toggleConfirmModal();
            setLoadingStatus(false);
            toast.error('Something went wrong', { id: 'nodata', duration: 2000 });
        }
    };

    return (
        <>
            <div className='shadow-lg rounded-md'>
                <div className='p-5 bg-white  rounded-md'>
                    <CustomTable
                        tableData={tableData}
                        headerData={Columns}
                        addMoreBtnText={"Add Product"}
                        addMoreButtonFunc={handleAddMore}
                    />
                </div>
            </div>
            {showModal.AddEditModal && <AddProductModal toggleModal={toggleModal} title={title} data={currentCell} setTableFilter={setTableData} />}
            {showModal.ConfirmModal && <ConfirmModal toggleModal={toggleConfirmModal} handelFunction={handleDeletProduct} modalContent="Are you sure" buttonDisable={loadingStatus} />}
        </>
    );
};

export default Products;
