
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
import { signInWithGooglePopup, createUserDocumentFromAuth,
signInAuthUserWithEmailAndPassword
 } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm =  () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
         await signInWithGooglePopup();
        };

    const handleSubmit =async (event) => {
    event.preventDefault();


    try{
         await signInAuthUserWithEmailAndPassword(email, password);
        resetFormFields();
    }catch(error) {
        switch(error.code) {
            case 'auth/wrong-password':
            alert('incorrect password for email');
            break
            case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
                default:
                    console.log(error);
    }
    }
    };

const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value })
};

    return (
     <div className='sign-up-container'>
    <h2>Already Have An Account?</h2>
    <span>Sign in with email and password</span>
 <form onSubmit={handleSubmit}>    
<FormInput
        label="Email"
         type="email" 
         required
         onChange={handleChange}
          name="email" 
          value={email} 
          />
 <FormInput
        label="Password"
         type="password" 
         required
         onChange={handleChange}
          name="password" 
          value={password} 
          />
<div className='buttons-container'>
 <Button type='submit'>Sign In</Button>
<Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
</div>
</form>
</div>
    );
};

export default SignInForm;