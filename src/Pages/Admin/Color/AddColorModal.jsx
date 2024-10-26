'use client';
import * as Yup from 'yup';
import { BsX } from 'react-icons/bs';
import { Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';

import { InputField } from '../../../Components/Forms/InputField';

import { API_URLS } from '../../../Axios/constants';
import { AxiosPatch, AxiosPost } from '../../../Axios/axiosService';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter color name').matches(/^\S|[^*\s]\S*[^*\s]$/g, '* This field cannot contain only blank spaces')
});

const AddColorModal = ({ toggleModal, title, data, setTableFilter }) => {

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        let param = { ...values };

        try {
            const response = (title === 'Add Color')
                ? await AxiosPost(`${API_URLS.COLOR.COLOR_ADD}`, values)
                : await AxiosPatch(`${API_URLS.COLOR.COLOR_UPDATE}/${data?._id}`, param);

            if (response && response.statusCode === 201 || response.statusCode === 200) {
                setSubmitting(false);
                resetForm();
                toggleModal();
                setTableFilter((prev) => ({ ...prev, updateData: !prev.updateData }));
                toast.success(`New color added successfully`, { duration: 2000 });
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
                        initialValues={{ name: data?.name ? data?.name : '', code: data?.code ? data?.code : '' }}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting, resetForm }) => (
                            <Form>

                                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                                    <h3 className="text-xl font-normal text-neutral-600-700 ">{title}</h3>
                                    <button type="button" className="btn-modal-header-cancel btn_font" onClick={() => { resetForm(); toggleModal(); }}><BsX size={24} /></button>
                                </div>

                                <div className="p-4">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                        <div className='w-full mb-2'>
                                            <InputField lable='Product Color Name' className='input_font' required={true} name={'name'} id={'name'} type={'text'} placeholder={'Product Color Name'} />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <InputField lable='Product Color Code (HEX)' className='input_font' required={true} name={'code'} id={'code'} type={'text'} placeholder={'Product Color code'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end items-center py-3 pr-6 space-x-2 border-t border-gray-200 rounded-b">
                                    <button type='button' className='border text-black p-2 w-20' onClick={() => { resetForm(); toggleModal(); }}>Cancel</button>
                                    <button type='submit' className='border bg-black text-white p-2 w-20
                                    ' disabled={isSubmitting}>
                                        {isSubmitting ? "Loading..." : title !== 'Add Color' ? 'Update' : 'Submit'}
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

export default AddColorModal;
