import '../components/All.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  const HandleSubmit = () =>{
    if(!email || !password){
        Swal.fire({
           title: 'Error!',
           text: 'Inputs are empty. Fill!',
           icon: 'error',
           confirmButtonText: 'OK',
             confirmButtonColor:'var(--color-gray-950)'
             })
    }
    else{
      axios.post("http://localhost:5000/user/auth", {email, password}).then((res) =>{   
Swal.fire({
  title: 'Login successfully!',
  text: res.data.msg,
  icon: 'success',
  confirmButtonText: 'OK',
  confirmButtonColor: 'var(--color-gray-950)',
})

       navigate("/Dashboard");
      }).catch((error) => Swal.fire({
        title:'Error!',
        text: error.response.data.msg,
        icon:'error',
        confirmButtonText:'OK',
        confirmButtonColor:'var(--color-gray-950)'
        
      }));
   
    }
  }
  return (
    <div className='bg-gray-900'>
      <div className='flex flex-wrap justify-center'>
        <div className='login bg-gray-900'>
          <p className='text-white'>Sign-In</p>
          <p style={{marginLeft:10, fontSize:14}} >Authenticate yourself!</p>
          <br />
          <label style={{marginTop:6}} htmlFor='email' >Username/Email</label>
          <br />
        <div className='flex flex-wrap justify-center'>
        <input type='text' placeholder='username/email...' onChange={(e) => setemail(e.target.value)} />
        </div>
          <br />
           <label htmlFor='password' >Password</label>
          <br />
        <div className='flex flex-wrap justify-center'>
            <input type='password' placeholder='password...' onChange={(e) => setpassword(e.target.value)} />
        </div>
          <br />
    <div className='flex flex-wrap justify-center'>
      <button onClick={HandleSubmit}>Submit</button>
      </div>
    <p style={{fontSize:14}}>Forgot Password ? <a style={{color:'orange'}} href=''>Click here</a></p>
     <br />
      </div>
      </div>
    </div>
  )
}

export default Login;