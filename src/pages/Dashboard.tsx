import '../components/All.css'
import Sidebar from '../components/Sidebar.tsx'
import DashboardRadar from "../components/DashboardRadar.tsx";
import {  FaMapMarkerAlt, } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { MdBeachAccess } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { MdGavel } from "react-icons/md";
import { MdLabel } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";


const Dashboard = () => {
  const [stats, setStats] = useState({
  users: 0,
  sites: 0,
  department:0,
  position:0,
  salary:0,
  personnel:0,
  fine:0,
  fineType:0,
  leave:0,
  leaveType:0,
  cnps:0,
  contract:0,
  contractType:0
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get("/dashboard/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats");
    }
  };

  fetchStats();
}, []);

  return (
    <div style={{backgroundColor:'white'}}>
        <div className='dashboard bg-gray-900 flex h-screen overflow-hidden'>


<div className="left-dashboard bg-gray-950 w-[250px] h-full overflow-y-auto no-scrollbar">
  <div style={{ marginLeft: 20 }} className="logo font-bold">
    <span style={{ fontSize: 50, color: 'orange' }}>H</span>
    <span style={{ fontSize: 30 }}>R</span>
    <span style={{ fontSize: 20 }}>M</span>
  </div>
  <Sidebar />
</div>


 
        <div className='right-dashboard flex-1 h-full overflow-y-auto no-scrollbar'>
      <p className='text-center text-3xl font-bold' style={{marginTop:10,}}><span className='text-5xl' style={{color:'orange'}}>H</span>uman Resources Management Statistics.</p>
      <br />
      <div className='flex flex-wrap justify-center' style={{marginTop:30, gap:15}}>

        <div className='right-dashboard1'>
         <div className='flex justify-center'>
           <FaMapMarkerAlt className='inline' size={20} color="orange" />
        <p className='inline text-center' style={{textAlign:'center', marginLeft:4}}>Sites</p>
         </div>
          <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.sites}</p>
      </div>


      <div className='right-dashboard2'>
        <div className='flex justify-center'>
        <MdApartment className='inline' size={20} color='orange' />
          <p className='inline text-center' style={{marginLeft:4}}>Departments</p>
        </div>
 <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.department}</p>
      </div>


      <div className='right-dashboard3'>
       <div className='flex justify-center'>
        <MdWork className='inline' size={20} color='orange' />
         <p className='inline text-center' style={{marginLeft:4}}>Positions</p>
       </div>
      <p className='text-center' style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.position}</p>
      </div>


     <div className='right-dashboard3'>
        <div className='flex justify-center'>
          <FaMoneyBillWave className='inline' size={20} color='orange' />
          <p className='inline text-center' style={{marginLeft:4}}>Salaries</p> 
        </div>
    <p className='text-center' style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.salary}</p>
      </div>


     <div className='right-dashboard3'>
        <div className='flex justify-center'>
        <FaUsers className='inline' size={20} color='orange' />
          <p className='inline text-center' style={{marginLeft:4}}>Personnels</p>
        </div>
  <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.personnel}</p>
      </div>

   </div>

       <div className='flex flex-wrap justify-center' style={{marginTop:30, gap:15,}}>

        <div className='right-dashboard1'>
         <div className='flex justify-center'>
          <MdGavel className='inline' size={20} color='orange' />
          <p className='inline text-center' style={{marginLeft:4}}>Fines</p>
         </div>
 <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.fine}</p>
      </div>

      <div className='right-dashboard2'>
      <div className='flex justify-center'>
   <MdLabel className='inline' size={20} color='orange' />
         <p className='inline text-center' style={{marginLeft:4}}>Fine-Types</p>
      </div>
  <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.fineType}</p>
      </div>

      <div className='right-dashboard3'>
      <div className='flex justify-center'>
        <MdBeachAccess className='inline' size={20} color='orange' />
        <p className='inline text-center' style={{marginLeft:4}}>Leaves</p>
      </div>
   <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.leave}</p>
      </div>

     <div className='right-dashboard3'>
       <div className='flex justify-center'>
        <FaTags className='inline' size={20} color='orange' />
         <p className='inline text-center' style={{marginLeft:4}}>Leave-Types</p>
       </div>
  <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.leaveType}</p>
      </div>
 
      </div>

    <div className='flex flex-wrap justify-center' style={{marginTop:30, gap:15,}}>

        <div className='right-dashboard1'>
       <div className='flex justify-center'>
        <HiDocumentText className='inline' size={20} color='orange' />
          <p className='text-center inline' style={{marginLeft:4}}>Contracts</p>
       </div>
   <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.contract}</p>
      </div>

      <div className='right-dashboard2' style={{width:'calc(22% - 20px)'}}>
     <div className='flex justify-center'>
      <MdCategory className='inline' size={20} color='orange' />
        <p className='inline text-center' style={{marginLeft:4}}>Contract-Types</p>
     </div>
 <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.contractType}</p>
      </div>

      <div className='right-dashboard3'>
     <div className='flex justify-center'>
      <MdSecurity className='inline' size={20} color='orange' />
       <p className='inline text-center' style={{marginLeft:4}}>CNPS</p>
     </div>
     <p style={{fontSize:21, color:'white', fontWeight:'bold', fontStyle:'normal'}}>{stats.cnps}</p>
      </div>

      </div>


<br />
<br />
  {/* <ChatWidget /> */}
  <DashboardRadar />
        </div>
 </div>



    </div>
  )
}

export default Dashboard