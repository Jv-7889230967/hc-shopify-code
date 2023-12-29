"use client"
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';
import Image from 'next/image';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { FaRegEye } from "react-icons/fa6";
import InputAdornment from "@mui/material/InputAdornment";

function Login() {
  const router = useRouter();
  const [show,setShow]=React.useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password is too short'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
  };

  async function onSubmit({ username, password }) {
    // alertService.clear();
    
    return userService
      .login(username, password)
      .then(() => {
       
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
  }

  return (
    <Layout>
      <Container>
        <div className="parent-div">
          <div className="login-form">
          <div className='logo'>
          <Image
              src="https://imgs.search.brave.com/LgvtwAFO0c3nPnkX-sjrI3jZaTMIn1-wEqcGhrx0Fy8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGl0ZWNodHVyZS5h/Z2VuY3kvYnJhbmQt/bG9nb3Mvd3AtY29u/dGVudC91cGxvYWRz/L3dwZG0tY2FjaGUv/SGFycGVyQ29sbGlu/cy1QdWJsaXNoZXJz/LTkwMHgwLnBuZw"
              alt="logo"
              width={370}
              height={300}
            />
            </div>
            <div className="heading">
            <p>Login to your account..</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field mb-3">
                <div className="input-container">
                  <TextField id="standard-basic" label="Username" variant="standard"   {...register('username')}
                    onChange={handleChange}/>
                  <div className="error-message">{errors.username && errors.username.message}</div>
                </div>
              </div>
    
              <div className="form-field mb-3">
                <div className="input-container">
                  {/* <TextField id="standard-basic" label="Password" variant="standard"  {...register('password')}
                    onChange={handleChange}/> */}
                    <TextField
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    type={show ? "text" : "password"} // Show or hide the password based on the 'show' state
                    {...register('password')}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FaRegEye size={18}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShow(!show)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className="error-message">{errors.password && errors.password.message}</div>
                </div>
              </div>
              <br />
              <Link href={'/account/forgotpass'}>forgotpassword?</Link>
              <div className="buttons">
              <button>LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  .parent-div {
    background-color: #e5f7da;
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .form-label {
    margin-right: 2rem;
  }

  .logo {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0;
  }
  .logo img {
    width: 100%;
    max-width: 370px;
    height: auto;
  }
  form{
    margin-top:15%;
  }

  .heading {
    height: 2rem;
    width: 105%;
  }


  .login-form {
    border-radius:20px;
    height: 65%;
    width: 26%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
  }
  .form-field {
    display: flex;
    align-items: center;

  }
  .form-label {
    width: 100px;
    text-align: right;
    margin-right: 15px;
  }
  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  input{
    width:20vw;
    padding:4px;
    border-radius:6px;
  }
  .error-message {
    color: red;
    font-size: small;
    margin-right: 20px;
    position: absolute;
    bottom: -20px;
  }
  .buttons {
     display:flex;
     justify-content:center;
     margin:20px;

  }
  button{
    height:2.5rem;
    width:70%;
    padding:4px;
    background-color:#006AFF;
    border:none;
    border-radius:8px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    color: white;
    font-weight: bold;
  }
  button:hover{
    transform: scale(1.04);
  }
  a{
    text-decoration: none;
    underline:none;
  }
`;

export default Login;
