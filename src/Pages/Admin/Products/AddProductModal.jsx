'use client';
import * as Yup from 'yup';
import Select from 'react-select';
import { BsX } from 'react-icons/bs';
import { ErrorMessage, Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';

import { InputField, InputNumbrField, NumericField, TextareaField } from '../../../Components/Forms/InputField';

import { API_URLS } from '../../../Axios/constants';
import { AxiosGet, AxiosPatch, AxiosPost } from '../../../Axios/axiosService';
import { useEffect, useState } from 'react';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter product name').matches(/^\S|[^*\s]\S*[^*\s]$/g, '* This field cannot contain only blank spaces')
});

const AddProductModal = ({ toggleModal, title, data, setTableFilter }) => {
    const [colorList, setColorList] = useState([])
    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

    const initialData = {
        name: data?.name ? data?.name : '',
        price: data?.price ? data?.price : '',
        colors: data?.colors?.length > 0
            ? colorList
                .filter((colorObj) => data?.colors.some((dataColor) => dataColor._id === colorObj._id))
                .map((obj) => ({ value: obj._id, label: obj.name }))
            : [],
        sizes: data?.sizes?.length > 0
            ? sizeOptions
                .filter((item) => data?.sizes.includes(item)).map((item) => ({ value: item, label: item }))
            : [],
        description: data?.description ? data?.description : '',
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await AxiosGet(`${API_URLS.COLOR.COLOR_LIST}`);
                if (response && response.statusCode === 200) {
                    setColorList(response.data);
                }
            } catch (error) {
                toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
            }
        })();
    }, []);

    const cleanParams = (params, fields) => {
        fields.forEach(field => {
            if (typeof params[field] === 'string') {
                params[field] = +params[field].replace(/,/g, '');
            }
        });
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        let param = { ...values };
        param.colors = param.colors = param?.colors?.map((item) => item.value);
        param.sizes = param.sizes = param?.sizes?.map((item) => item.value);

        const fieldsToClean = ["price"];
        cleanParams(param, fieldsToClean);

        try {
            const response = (title === 'Add Product')
                ? await AxiosPost(`${API_URLS.PRODUCT.PRODUCT_ADD}`, param)
                : await AxiosPatch(`${API_URLS.PRODUCT.PRODUCT_UPDATE}/${data?._id}`, param);


            if (response && response.statusCode === 201 || response.statusCode === 200) {
                setSubmitting(false);
                resetForm();
                toggleModal();
                setTableFilter((prev) => ({ ...prev, updateData: !prev.updateData }));
                toast.success(response?.message, { duration: 2000 });
            }
            else {
                setSubmitting(false);
            }
        } catch (error) {
            setSubmitting(false);
            toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
        }
    };


    return (
        <div className={'flex justify-center center z-[1000] p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full backdrop-blur-[2px] bg-opacity-40 fixed'}>
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative animate-slide-down bg-white rounded-lg shadow-2xl border text-black mt-[5rem] z-50">
                    <Formik
                        initialValues={initialData}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, resetForm, setFieldValue, values }) => (
                            <Form>

                                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                                    <h3 className="text-xl font-normal text-neutral-600-700 ">{title}</h3>
                                    <button type="button" className="btn-modal-header-cancel btn_font" onClick={() => { resetForm(); toggleModal(); }}><BsX size={24} /></button>
                                </div>

                                <div className="p-4">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                        <div className='w-full mb-2'>
                                            <InputField lable='Product Name' className='input_font' required={true} name={'name'} id={'name'} type={'text'} placeholder={'Product Name'} />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <InputNumbrField lable='Product Price' className='input_font' required={true} name={'price'} id={'product-price'} type={'text'} placeholder={'Enter Price (in Rs)'} onChange={(event) => NumericField(event, setFieldValue)} />
                                        </div>

                                        <div className='w-full mb-2'>
                                            <label htmlFor='product_sizes' className='block form-label'>Select Sizes<span className='text-red-600'>*</span></label>
                                            <Select
                                                isMulti
                                                name='sizes'
                                                isClearable={true}
                                                isSearchable={false}
                                                id='product_sizes'
                                                closeMenuOnSelect={false}
                                                value={values?.sizes}
                                                placeholder='Select Sizes'
                                                options={sizeOptions?.map((item) => ({ value: item, label: item }))}
                                                onChange={(e) => {
                                                    let ans = e.map((item) => ({ value: item.value, label: item.label }));
                                                    setFieldValue('sizes', ans);
                                                }}
                                                styles={{
                                                    input: (base) => ({ ...base, 'input:focus': { boxShadow: 'none' } }),
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? '#65677d' : '#65677d',
                                                        padding: '.15rem',
                                                        borderRadius: '.5rem',
                                                        boxShadow: 'none',
                                                        '&:hover': {
                                                            border: '1px solid #65677d',
                                                            borderColor: '#65677d'
                                                        }
                                                    })
                                                }}
                                            />
                                            <ErrorMessage component='div' name='sizes' className='text-sm text-red-500' />
                                        </div>


                                        <div className='w-full mb-2'>
                                            <label htmlFor='product_colors' className='block form-label'>Select Colors<span className='text-red-600'>*</span></label>
                                            <Select
                                                isMulti
                                                name='colors'
                                                isClearable={true}
                                                isSearchable={false}
                                                id='product_colors'
                                                closeMenuOnSelect={false}
                                                value={values?.colors}
                                                placeholder='Select Colors'
                                                options={colorList?.map((item) => ({ value: item._id, label: item.name }))}
                                                onChange={(e) => {
                                                    let ans = e.map((item) => ({ value: item.value, label: item.label }));
                                                    setFieldValue('colors', ans);
                                                }}
                                                styles={{
                                                    input: (base) => ({ ...base, 'input:focus': { boxShadow: 'none' } }),
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? '#65677d' : '#65677d',
                                                        padding: '.15rem',
                                                        borderRadius: '.5rem',
                                                        boxShadow: 'none',
                                                        '&:hover': {
                                                            border: '1px solid #65677d',
                                                            borderColor: '#65677d'
                                                        }
                                                    })
                                                }}
                                            />
                                            <ErrorMessage component='div' name='colors' className='text-sm text-red-500' />
                                        </div>

                                        <div className='w-full mb-2 col-span-2'>
                                            <TextareaField lable='Description' className='input_font' required={true} name='description' id={'product-description'} placeholder={'Enter product description'} rows={3} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end items-center py-3 pr-6 space-x-2 border-t border-gray-200 rounded-b">
                                    <button type='button' className='border text-black p-2 w-20' onClick={() => { resetForm(); toggleModal(); }}>Cancel</button>
                                    <button type='submit' className='border bg-black text-white p-2 w-20
                                    ' disabled={isSubmitting}>
                                        {isSubmitting ? "Loading..." : title !== 'Add Product' ? 'Update' : 'Submit'}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
