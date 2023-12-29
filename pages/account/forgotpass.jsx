"use client"
import styled from "styled-components";
import StyledComponentsRegistry from '../registry';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
import { TextField } from "@mui/material";
import * as Yup from 'yup';

const Page = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'), 
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Email is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value, { shouldValidate: true });
  };
  const onSubmit=(data)=>{
console.log(data.username);
  }

  return (
    <StyledComponentsRegistry>
      <Container>
        <div className="parent-div">

          <div className="form-div">
          <div className='logo'>
          <Image
              src="https://imgs.search.brave.com/LgvtwAFO0c3nPnkX-sjrI3jZaTMIn1-wEqcGhrx0Fy8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGl0ZWNodHVyZS5h/Z2VuY3kvYnJhbmQt/bG9nb3Mvd3AtY29u/dGVudC91cGxvYWRz/L3dwZG0tY2FjaGUv/SGFycGVyQ29sbGlu/cy1QdWJsaXNoZXJz/LTkwMHgwLnBuZw"
              alt="logo"
              width={370}
              height={300}
            />
            </div>
            <div className="heading">
            <p>Enter your email...</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className="input-container">
              <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  {...register('username')}
                  onChange={handleChange}
                  sx={{ width: '20vw' }}
                />
                  <div className="error-message">{errors.username && errors.username.message}</div>
              </div>
              <br/>
              <div className="button-container">
               <button>SEND</button>
              </div>
            </form>
          </div>
         
        </div>
      </Container>
    </StyledComponentsRegistry>
  );
};

const Container = styled.div`
.parent-div {
  background-color:  #e5f7da;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
}
.form-div{
  background-color:white;
border-radius:20px;
height:40vh;
width:30vw;
}
.logo {
  width: 100%;
  height: 15%;
  display: flex;
  margin-top:35px;
  justify-content: center;
  align-items: center;
}
.logo img {
  width: 100%;
  max-width: 370px;
  height: auto;
}
.heading {
  display:flex;
  justify-content:center;
  height: 2rem;
  width: 100%;
}
.input-container {
  width: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
  margin-top:1.5rem;
  flex-direction: column;
  position: relative;
}
.error-message {
  color: red;
  font-size: small;
}
.button-container{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
button{
  height:2.5rem;
  width:35%;
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
  transform:scale(1.03);
}
`;

export default Page;
