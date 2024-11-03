// React Imports
import { toast } from 'react-hot-toast';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Formik, Form, ErrorMessage, Field } from 'formik';

import { PasswordValidation } from './../../ValidationSchema/index';

// axios imports
import { API_URLS } from '../../Axios/constants';
import { AxiosPost } from '../../Axios/axiosService';
import { InputField } from '../../Components/Forms/InputField';

const SignUp = () => {
    // Set the meta title
    document.title = 'Login';

    // States
    const navigate = useNavigate(); // Initialize navigate function for routing
    const [inputVisibility, setInputVisibility] = useState(false); // Toggle password visibility

    // Function to handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await AxiosPost(`${API_URLS.AUTH.SIGNUP}`, values);
            if (response && response.statusCode === 201) {
                navigate('/login'); // Redirect to the home page
                setSubmitting(false);
                toast.success("Signup succesfully", { duration: 2000 });
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            setSubmitting(false);
            toast.error('Something Went Wrong', { id: 'nodata', duration: 1000 });
        }
    };

    // Renders the eye icon based on visibility
    const renderIcon = () => {
        if (inputVisibility === false) {
            return <BsEyeSlash />;
        } else {
            return <BsEye />;
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="w-full max-w-md m-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-6 dark:bg-gray-800 dark:border-gray-700">
                <Formik
                    initialValues={{ firstName: "", lastName: "", email: '', password: '' }}
                    validationSchema={PasswordValidation}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6" action="#">
                            <h5 className="text-xl text-start font-medium text-button-200 dark:text-white">Sign Up!</h5>
                            <p className='text-sm text-start text-gray-900' style={{ marginTop: '5px' }}>Sign Up in New India.</p>

                            <div>
                                <InputField lable={'First Name'} name={'firstName'} id={'login-firstName'} placeholder={'Enter Your first name'} type={'text'} required={true} />
                            </div>
                            <div>
                                <InputField lable={'Last Name'} name={'lastName'} id={'login-lastName'} placeholder={'Enter Your last name'} type={'text'} required={true} />
                            </div>
                            <div>
                                <InputField lable={'Email'} name={'email'} id={'login-email'} placeholder={'Enter Your Email'} type={'email'} required={true} />
                            </div>

                            <div>
                                <label htmlFor="login-password" className="form-label">Password <span className='text-red-500'>*</span></label>
                                <div className='relative'>
                                    <Field type={inputVisibility === false ? 'password' : 'text'} name="password" id="login-password"
                                        placeholder="Enter Your Password" className="border border-gray-300 p-2.5 rounded-lg block w-full focus:outline-none py-2 " />
                                    <button type="button" className="absolute right-0 top-0 p-3 rounded-e-md" onClick={() => setInputVisibility(!inputVisibility)}>
                                        {renderIcon()}
                                    </button>
                                </div>
                            </div>
                            <ErrorMessage component="span" name="password" className='text-sm text-red-500' />


                            <button type="submit" className="btn-primary" disabled={isSubmitting}>Sign in</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignUp;

