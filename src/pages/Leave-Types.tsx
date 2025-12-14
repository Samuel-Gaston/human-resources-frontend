import '../components/All.css';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
type LeaveType = {
    _id:number;
    name:string;
    durationInDay:number;
 description:string;

}
const LeaveType = () => {
  const navigate = useNavigate();

  const [SelectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setdeleteModal] = useState(false)
  const [showExportModal, setshowExportModal] = useState(false);
  const [name, setName] = useState("");
  const [durationInDay, setdurationInDay] = useState("")
  const [description, setdescription] = useState("");

  const [LeaveTypes, setLeaveTypes] = useState<LeaveType[]>([])
  const [search, setsearch] = useState("")

    const Add = () =>{
      if(!name || !durationInDay || !description){
            Swal.fire({
              title: 'Error!',
              text: 'Inputs are empty. Fill!',
              icon: 'error',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
      }else{
        axios.post("http://localhost:5000/leaveType", {name, durationInDay,description}).then(() =>{
          Swal.fire({
              title: 'Leave-Type added successful!',
              text: 'You have successfully added this leave-type.',
              icon: 'success',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
                 setShowModal(false);
                 navigate("/dashboard");
        }).catch((error) => console.error(error));
      }
    }


   const getLeaveTypes = async() =>{
   try {
       const response = await axios.get("/leaveType")
      setLeaveTypes(response.data.data)
   } catch (error) {
     console.error(error)
   }
      }

      useEffect(() =>{
        getLeaveTypes();
      },[])


            const deleteLeaveType = (id:number) =>{
        axios.delete(`http://localhost:5000/leaveType/${id}`).then(() =>{
          setLeaveTypes(LeaveTypes.filter(leavetype => leavetype._id !== id))
           Swal.fire({
                title: 'Leave-Type deleted successful!',
                text: 'You have successfully deleted this leave-type.',
                icon: 'success',
                confirmButtonText: 'OK',
                  confirmButtonColor:'var(--color-gray-950)'
                  })
        })
      }

           const exportLeaveTypePDF = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/leaveType/export/pdf",
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "LeaveTypes.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setshowExportModal(false);

    Swal.fire({
      title: "Export successful!",
      text: "Leave-Type exported as PDF.",
      icon: "success",
      confirmButtonColor: "var(--color-gray-950)"
    });
  } catch (error) {
    Swal.fire({
      title: "Export failed",
      text: "Unable to export users",
      icon: "error"
    });
  }
};

 useEffect(() => {
      const fetchUsers = async () => {
        const res = await axios.get(
          `/leaveType/search?search=${search}`
        );
        setLeaveTypes(res.data);
      };
    
      fetchUsers();
    }, [search]);
   
  return (
    <div>
        <div className='dashboard bg-gray-900 flex h-screen overflow-hidden'>
            <div className='left-dashboard bg-gray-950 w-[250px] h-full overflow-y-auto no-scrollbar'>
 <div style={{marginLeft:20}} className='logo font-bold'><span style={{fontSize:50, color:'orange'}}>H</span><span style={{fontSize:30}}>R</span><span style={{fontSize:20}}>M</span></div>
  <Sidebar />

            </div>
     <div className='right-dashboard  flex-1 h-full overflow-y-auto no-scrollbar'>
    <p className='text-3xl' style={{marginTop:20}}>Types of Leave</p>

 <div className="rounded-xl shadow-lg p-6 mt-10 w-full max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <button
     onClick={() => setShowModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',marginTop:40, width:'150px', marginBottom:-10, borderRadius:5}}>
        {/* <FaPlus />  */}
     Add a LeaveType </button>  
     </div>

    <div className='flex flex-wrap justify-end'>
          <button
     onClick={() => setshowExportModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',width:'150px', marginLeft:50, marginTop:-30, borderRadius:5}}>
        {/* <FaPlus />  */}
     Export LeaveTypes</button> 
    </div>


    
      <div className='Search flex flex-wrap justify-center'>  
      <input
      type="text"
      placeholder="Search leaveTypes..."
      value={search}
      onChange={(e) => setsearch(e.target.value)}
       style={{marginLeft:-30}}/>
      </div>

<br />
<br />
    
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-white text-sm uppercase bg-gray-950" >
              <th className="py-3 px-6 text-left font-semibold" style={{padding:10}}>
                <div className="flex items-center gap-2">
                  {/* <FaLeaveType />  */}
                 Name
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2">
                  {/* <FaBox />  */}
                durationInDay
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2">
                  {/* <FaBox />  */}
                 Description
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2">
                  {/* <FaBox />  */}
                  Action
                </div>
             </th>
            </tr>
          </thead>

   <tbody>
             {Array.isArray(LeaveTypes) && LeaveTypes.map((user, index) => (
               <tr key={user._id} className={`${ index % 2 === 0 ? "bg-gray-50" : "bg-white" } hover:bg-gray-300 transition-all duration-200`}>
                 <td style={{ padding: 10 }} className="py-3 px-6 text-gray-700">{user.name}</td>
                 <td style={{ padding: 10 }} className="py-3 px-6 text-gray-700">{user.durationInDay}</td>
                 <td style={{ padding: 10 }} className="py-3 px-6 text-gray-700">{user.description}</td>
                 <td style={{ padding: 10 }} className="py-3 px-6 text-gray-700">
                   <FaEdit style={{cursor:'pointer'}} className='inline' size={20} />
                   <FaTrash style={{cursor:'pointer', marginLeft:10}} className='inline' onClick={() => {
                    setSelectedUserId(user._id)
                     setdeleteModal(true)
                   }} size={20} />
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>

      {/* Modal for add*/}
      {showModal && (
        <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20, boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Add New Leave-Type</h3>

              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                required
              />
<br />
<br />
              <input
                type="number"
                placeholder="Enter durationInDay"
                value={durationInDay}
                onChange={(e) => setdurationInDay(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                <button  type="button" onClick={() => setShowModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:10, color:'black'
                }}>Cancel</button>
                <button onClick={Add} style={{
                      backgroundColor:'white',
                      cursor:'pointer',
                    marginLeft:10,
                    padding:5,
                    marginBottom:50,
                    marginTop:20,
                    width:'calc(40% - 20px)',
                    borderRadius:10, color:'black'
                }}>Add</button>

          </div>
        </div>
      )}

{/* modal for export feature */}
    {showExportModal &&(
          <div className="Export fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20,boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Export LeaveTypes</h3>
            <p className='text-center' style={{textAlign:'center'}}>Do you want to export these LeaveTypes.</p>
        <button  type="button" onClick={() => setshowExportModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:5, color:'black'
                }}>Cancel</button>
                <button onClick={exportLeaveTypePDF} style={{
                      backgroundColor:'white',
                      cursor:'pointer',
                    marginLeft:10,
                    padding:5,
                    marginBottom:50,
                    marginTop:20,
                    width:'calc(40% - 20px)',
                    borderRadius:5, color:'black'
                }}>Export</button>

          </div>
        </div>
    )}

                {/* the modal for delete */}
    {deleteModal &&(
             <div className="Export fixed inset-0 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20,boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Are you sure you want to delete this site ?</h3>
        <button  type="button" onClick={() => setdeleteModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:5, color:'black'
                }}>No</button>
                <button onClick={() => {
      if (SelectedUserId !== null) {
      deleteLeaveType(SelectedUserId);
      setdeleteModal(false);
    }
                }} style={{
                      backgroundColor:'white',
                      cursor:'pointer',
                    marginLeft:10,
                    padding:5,
                    marginBottom:50,
                    marginTop:20,
                    width:'calc(40% - 20px)',
                    borderRadius:5, color:'black'
                }}>Yes</button>

          </div>
        </div>
    )}
    </div>

    </div>
    </div>
    </div>
  )
}

export default LeaveType;