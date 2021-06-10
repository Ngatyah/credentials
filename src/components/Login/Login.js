import React, { useState, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


const emailReducer = (state, action) => {

  console.log(action.val)
  console.log(state.val)
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  console.log(state.value)
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.val.includes('@') }
  }
  return { value: '', isValid: false }
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.val.trim().length > 6 }
  }
  return { value: '', isValid: false }
};

const Login = (props) => {


  const [formIsValid, setFormIsValid] = useState(false);

  const authCxt = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false });


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });



  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      passwordState.isValid && event.target.value.includes('@')
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCxt.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();

    }


  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        {/* Refactoring login inputs */}

        <Input
          ref={emailInputRef}
          id='email'
          label='Email'
          type='text'
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}

        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default Login;
