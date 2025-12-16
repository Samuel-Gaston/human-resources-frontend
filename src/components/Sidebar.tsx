import '../components/All.css'
import { useNavigate } from 'react-router-dom';
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
import Swal from 'sweetalert2';
const Sidebar = () => {
    const navigate = useNavigate();
   
     const GoToDashboard = () =>{
        navigate("/dashboard");
    }
    const GoToSite = () =>{
        navigate("/site");
    }
    const GoToDepartment = () =>{
        navigate("/department");
    }
    const GoToPosition = () =>{
        navigate("/position");
    }
    const GoToSalary = () =>{
        navigate("/salary");
    }
    const GoToPersonnel = () =>{
        navigate("/personnel");
    }
    const GoToFine = () =>{
        navigate("/fine");
    }
    const GoToFineTypes = () =>{
        navigate("/fine-type");
    }
    const GoToLeave = () =>{
        navigate("/leave");
    }
    const GoToLeaveType = () =>{
        navigate("/leave-type");
    }
    const GoToContract = () =>{
        navigate("/contract");
    }
    const GoToContractType = () =>{
        navigate("/contract-type");
    }
    const GoToCNPS= () =>{
        navigate("/cnps");
    }
     const GoToUser= () =>{
        navigate("/user");
    }
  
    const confirmLogout = () => {
  Swal.fire({
    title: "Do you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#d33",
    cancelButtonColor: "var(--color-gray-800) "
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      navigate("/dashboard");
    }
  });
};
  return (
    <div>   
     <ul>
            <li onClick={GoToDashboard}>Dashboard</li>
               <li onClick={GoToUser}><FaUsers className='inline' /> Users</li>
             <li onClick={GoToSite}><FaMapMarkerAlt className='inline' /> Sites</li>
             <li onClick={GoToDepartment}><MdApartment className='inline' />  Departments</li>
             <li onClick={GoToPosition}><MdWork className='inline'/> Positions</li>
             <li onClick={GoToSalary}><FaMoneyBillWave className='inline' /> Salaries</li>
             <li onClick={GoToPersonnel}><FaUsers className='inline' /> Personnels</li>
             <li onClick={GoToFine}><MdGavel className='inline' /> Fines</li>
             <li onClick={GoToFineTypes}><MdLabel className='inline' /> Fine-Types</li>
             <li onClick={GoToLeave}><MdBeachAccess className='inline' /> Leaves</li>
             <li onClick={GoToLeaveType}><FaTags className='inline' /> Leave-Types</li>
              <li onClick={GoToCNPS}><MdSecurity className='inline' /> CNPS</li>
             <li onClick={GoToContract}><HiDocumentText className='inline' /> Contracts</li>
             <li onClick={GoToContractType}><MdCategory className='inline' /> Contract-Types</li>
          
         </ul>
          <button onClick={confirmLogout}>Logout</button>
         </div>
  )
}

export default Sidebar;