import './All.css';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
 const navigate = useNavigate();
 const GoToLogin = () =>{
  navigate("/login");
 }
  return (
    <div> 
    
        <div className='overall-Nav bg-gray-900'>
              <div className='Nav'>
            <div className='logo font-bold' style={{textShadow:'0 0 2px'}}><span style={{fontSize:50, color:'orange'}}>H</span><span style={{fontSize:30}}>R</span><span style={{fontSize:20}}>M</span></div>
         
            <div className='flex flex-wrap justify-center-safe'>
                <ul>
                <li className='flex flex-wrap justify-center'><a href=''>Home</a></li>
                <li><a href=''>About</a></li>
                <li><a href=''>FAQs</a></li>
            </ul>
            </div>
         
        </div>
         <div className='button flex flex-wrap justify-end'>
             <button onClick={GoToLogin}>Sign-In</button>
           </div>
       
        <div className='content'>
         <h1 className='text-center text-2xl'><span style={{color:'orange', fontSize:60, fontWeight:'bold'}}>M</span>anage the staffs in your organisation with ease.</h1>
         <p className='text-center'>Build, record and establish an effective human resources management
          system for your staffs.
         </p>
        <div className='flex flex-wrap justify-center'>
           <button onClick={GoToLogin}>Let's go</button>
        </div>
        </div>

        <div className='about'>
         
        </div>

        <div>
          <div className='card'>
            <div className='one bg-gray-950' >
<p style={{marginTop:30}} className='text-center'>Give out and effective <br /> staffs management with varieties of modules and specifications.</p>
            </div>
            <div className='two bg-gray-950' >
<p style={{marginTop:30}} className='text-center'>Showcases analytics of modules <br />that makes it up through chart leading to well-known records.</p>
            </div>
            <div className='three bg-gray-950'>
<p style={{marginTop:30}} className='text-center'>Provide insights that enable <br /> business decisions to be made on the <br /> human resources department.</p>
            </div>
          </div>
        </div>

        <div className='footer bg-gray-950'>
          <p>copyright 2025, All rights reserved.</p>
        </div>

    </div>
    </div>
  )
}

export default Nav;