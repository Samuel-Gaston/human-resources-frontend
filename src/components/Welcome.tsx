import './All.css';

const Welcome = () => {
  return (
    <div>
 <div className='content'>
         <h1 className='text-center text-2xl'><span style={{color:'orange', fontSize:60, fontWeight:'bold'}}>M</span>anage the staffs in your organisation with ease.</h1>
         <p className='text-center'>build, record and establish an effective human resources management
          system for your staffs.
         </p>
        <div className='flex flex-wrap justify-center'>
           <button>Let's go</button>
        </div>
        </div>
</div>
  )
}

export default Welcome;