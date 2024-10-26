import * as Yup from 'yup';

// Regular expression for email validation
const TEXT_REGEX = /^[A-Za-z ]+$/;
const PHONE_NO_REGEX = /^^[0-9]{10}$/;
const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const password = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';

const ClintValidation = Yup.object().shape({
  name: Yup.string().required('Please enter name').max(100, 'you can not add more than 100 character'),
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email'),
  phoneNumber: Yup.string().matches(PHONE_NO_REGEX, 'Phone number must be 10 digits').required('Please enter phone No.'),
  address: Yup.string().required('Please enter address').max(254, 'You can not add more than 250 characters'),
  locationIds: Yup.array().min(1, 'Please select location')
});

// Form validation schema
const DocumentTypeValidation = Yup.object().shape({
  name: Yup.string().required('Please enter document name').max(50, 'you can not add more than 50'),
  description: Yup.string().required('Please enter description').max(254, 'You can not add more than 250 characters'),
  vendorType: Yup.array().min(1, 'Please select vendor type')
});

const LocationValidation = Yup.object().shape({
  name: Yup.string().required('Please enter department name').matches(/^\S|[^*\s]\S*[^*\s]$/g, '* This field cannot contain only blank spaces').max(100, 'You can not add more than 100 characters'),
  clientId: Yup.string().required('Please select a client'),
  description: Yup.string().required('Please enter the description').max(254, 'You can not add more than 250 characters'),
  address: Yup.string().required('Please enter the address').max(254, 'You can not add more than 250 characters'),
  maxusCode: Yup.string().required('Please enter the maxus code')
});

const SendMailValidation = Yup.object().shape({
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email')
});

const PasswordValidation = Yup.object().shape({
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email'),
  password: Yup.string().required('Please enter your password')
});

const ForgetPasswordValidation = Yup.object().shape({
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email')
});

const ResetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .matches(password, 'Password must be at least 8 characters, including UPPER/lowercase, a number, and a special character.')
    .required('Please enter your password'),
  confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Both passwords must match').required('Please enter confirm password')
});

const ChangePasswordValidation = Yup.object().shape({
  // eslint-disable-next-line
  oldPassword: Yup.string().matches(password, 'Password must be at least 8 characters, including UPPER/lowercase a number and a special character.').required('Please enter current password'),
  password: Yup.string().matches(password, 'Password must be at least 8 characters, including UPPER/lowercase a number and a special character.').required('Please enter new password')
});

const CheckPasswordValidation = Yup.object().shape({
  password: Yup.string().required('Please enter your password ')
});

const RegistrationValidation = Yup.object().shape({
  name: Yup.string().matches(TEXT_REGEX, 'Only alphabets are allowed.').required('Please enter name').max(50, 'you can not add more than 50'),
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email'),
  phoneNumber: Yup.string().matches(PHONE_NO_REGEX, 'Phone number must be 10 digits').required('Please enter phone No.'),
  address: Yup.string().required('Please enter address').max(254, 'You can not add more than 250 characters'),
  dateOfBirth: Yup.string().max(new Date(), 'Future date not allowed').required('Please enter your DOB'),
  gender: Yup.string().required('Please select gender'),
  locations: Yup.array().min(1, 'Please select locations'),
  profileImage: Yup.mixed().required('Upload profile image'),
  vendorType: Yup.string().required('Please select vendor type'),
  loiDoc: Yup.mixed().required('Upload LOI')
});

const BankDetailsValidation = Yup.object().shape({
  bankName: Yup.string().matches(TEXT_REGEX, 'Only alphabets are allowed.').required('Please enter bank name').max(50, 'you can not add more than 50'),
  accountNumber: Yup.string().required('Please enter account number').max(30, 'You can not add more than 30 characters'),
  bankBranch: Yup.string().required('Please enter branch name').max(50, 'You can not add more than 50 characters'),
  ifscCode: Yup.string().required('Please enter IFSI code').max(11, 'you can not add more than 11')
});

const BasicDetailsValidation = Yup.object().shape({
  name: Yup.string().matches(TEXT_REGEX, 'Only alphabets are allowed.').required('Please enter name').max(50, 'you can not add more than 50'),
  phoneNumber: Yup.string().matches(PHONE_NO_REGEX, 'Phone number must be 10 digits').required('Please enter phone No.'),
  address: Yup.string().required('Please enter address').max(254, 'You can not add more than 250 characters'),
  dateOfBirth: Yup.string().max(new Date(), 'Future date not allowed').required('Please enter your DOB'),
  gender: Yup.string().required('Please select gender'),
  nationality: Yup.string().required('Please enter your nationality').max(50, 'you can not add more than 50'),
  maritalStatus: Yup.string().required('Please select marital status')
});

const identifyDetailsValidation = Yup.object().shape({
  gstNumber: Yup.string().required('Please enter bank name').max(50, 'you can not add more than 50'),

  documentList: Yup.array().of(
    Yup.object().shape({
      documentName: Yup.string().matches(TEXT_REGEX, 'Only alphabets are allowed.').required('Please enter document name').max(100, 'you can not add more than 50'),
      documentPath: Yup.mixed().required('Upload document')
    })
  )
});

const AddDocumentValidation = Yup.object().shape({
  title: Yup.string().required('Please enter title').max(100, 'you can not add more than 50'),
  description: Yup.string().required('Please enter address').max(254, 'You can not add more than 250 characters'),
  invoiceDate: Yup.string().max(new Date(), 'Future date not allowed').required('Please enter your DOB'),
  documentList: Yup.array().of(
    Yup.object().shape({
      documentPath: Yup.mixed().test('check-first-element', 'Upload Document', function (value) {
        if (value === undefined) return false;
        return true;
      })
    })
  ),
  otherDocumentList: Yup.array().of(
    Yup.object().shape({
      documentName: Yup.string().required('Please enter document name').max(100, 'you can not add more than 50'),
      documentPath: Yup.mixed().required('Upload document')
    })
  )
});

const VerifyEmailValidation = Yup.object().shape({
  email: Yup.string().email('Email must be valid').matches(EmailRegex, 'Email must be valid').required('Please enter your email')
});

export {
  ClintValidation, DocumentTypeValidation, LocationValidation, SendMailValidation, PasswordValidation, ForgetPasswordValidation,
  ResetPasswordValidation, RegistrationValidation, ChangePasswordValidation, CheckPasswordValidation, BankDetailsValidation,
  identifyDetailsValidation, BasicDetailsValidation, AddDocumentValidation, VerifyEmailValidation
};