import '../components/All.css';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
type Leave = {
    _id:number;
    durationInDays:number;
    personnel:{
        _id:number;
        name:string;
    },
    contract:{
        _id:number;
        description:string;
    },
    startDate:string;
    endDate:string;
    validatedBy:{
        _id:number;
        name:string;
    },
    isValidated:string;
    description:string;
}
type Contract = {
  _id:number;
  description:string;
}

type Personnel = {
  _id:number;
  name:string;
}



const Leave = () => {
  const navigate = useNavigate();

  const [SelectedUserId, setSelectedUserId] = useState<number | null>(null)
   
  const [SelectedLeaveId, setSelectedLeaveId] = useState(null)

  const [deleteModal, setdeleteModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showExportModal, setshowExportModal] = useState(false);
  const [durationInDays, setdurationInDays] = useState("");
  const [startDate, setstartDate] = useState("");
const [endDate, setendDate] = useState("");
const [isValidated, setisValidated] = useState("");
const [description, setdescription] = useState("");
  const [selectedContract, setselectedContract] = useState("")
  const [selectedPersonnel, setselectedPersonnel] = useState("")

  const [personnel, setpersonnel] = useState<Personnel[]>([])
  const [contract, setcontract] = useState<Contract[]>([]);

  const [Leaves, setLeaves] = useState<Leave[]>([])
const [search, setsearch] = useState("")
const [updateModal, setupdateModal] = useState(false)

    const Add = () =>{
      if(!durationInDays || !startDate || !endDate ){
            Swal.fire({
              title: 'Error!',
              text: 'Inputs are empty. Fill!',
              icon: 'error',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
      }else{
        axios.post("http://localhost:5000/leave", {durationInDays, contract:selectedContract,  description, startDate, endDate, isValidated, personnel:selectedPersonnel}).then(() =>{
          Swal.fire({
              title: 'Leave added successful!',
              text: 'You have successfully added this leave.',
              icon: 'success',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
                 setShowModal(false);
                 navigate("/leave");
                 getLeaves();
        }).catch((error) => console.error(error));
      }
    }



     // getting contractTypes
    
     const getContract = async() =>{
      try {
       const response = await axios.get("http://localhost:5000/leave/contract");
        console.log(response.data); 
       setcontract(response.data)
      } catch (error) {
       console.error(error);
      }
     }
 
     useEffect(() =>{
       getContract();
     },[]);
 
     const handleContractChange = (e:any) =>{
       setselectedContract(e.target.value);
     }

           //getting personnels
      const getPersonnel = async() =>{
     try {
      const response = await axios.get("http://localhost:5000/leave/personnel");
       console.log(response.data); 
      setpersonnel(response.data)
     } catch (error) {
      console.error(error);
     }
    }

    useEffect(() =>{
      getPersonnel();
    },[]);

    const handlePersonnelChange = (e:any) =>{
      setselectedPersonnel(e.target.value);
    }
    

    
    const getLeaves = async() =>{
   try {
       const response = await axios.get("http://localhost:5000/leave")
      setLeaves(response.data.data)
   } catch (error) {
     console.error(error)
   }
      }

      useEffect(() =>{
        getLeaves();
      },[])


            const deleteLeave = (id:number) =>{
        axios.delete(`http://localhost:5000/leave/${id}`).then(() =>{
          setLeaves(Leaves.filter(leave => leave._id !== id))
           Swal.fire({
                title: 'Leave deleted successful!',
                text: 'You have successfully deleted this leave.',
                icon: 'success',
                confirmButtonText: 'OK',
                  confirmButtonColor:'var(--color-gray-950)'
                  })
        })
      }

     const exportLeavePDF = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/leave/export/pdf",
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "leave.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setshowExportModal(false);

    Swal.fire({
      title: "Export successful!",
      text: "Leave exported as PDF.",
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
          `/leave/search?search=${search}`
        );
        setLeaves(res.data);
      };
    
      fetchUsers();
    }, [search]);

    const OpenUpdateModal = (leave:any) =>{
      setSelectedLeaveId(leave._id)
      setdurationInDays(leave.durationInDays)
      setstartDate(leave.startDate)
      setendDate(leave.endDate)
      setisValidated(leave.isValidated)
      setdescription(leave.description)
      setupdateModal(true)
    }

    const UpdateLeave = () =>{
      axios.patch(`http://localhost:5000/leave/${SelectedLeaveId}`,{durationInDays, contract:selectedContract,  description, startDate, endDate, isValidated, personnel:selectedPersonnel}).then((res) =>{
         Swal.fire({
                            icon: "success",
                            title: "Updated",
                            text: res.data.msg,
                            confirmButtonText: 'OK',
                           confirmButtonColor:'var(--color-gray-950)'
                          });
                          setupdateModal(false)
                          getLeaves();
      }).catch((error) => {
         Swal.fire({
                            icon: "error",
                            title: "Failed",
                            text: error.res.data.msg,
                            confirmButtonText: 'OK',
                           confirmButtonColor:'var(--color-gray-950)'
                          });
      })
    }
   
  return (
    <div>
        <div className='dashboard bg-gray-900 flex h-screen overflow-hidden'>
            <div className='left-dashboard bg-gray-950 w-[250px] h-full overflow-y-auto no-scrollbar'>
 <div style={{marginLeft:20}} className='logo font-bold'><span style={{fontSize:50, color:'orange'}}>H</span><span style={{fontSize:30}}>R</span><span style={{fontSize:20}}>M</span></div>
  <Sidebar />

            </div>
     <div className='right-dashboard  flex-1 h-full overflow-y-auto no-scrollbar'>
    <p className='text-3xl' style={{marginTop:20}}>Leaves</p>

 <div className="rounded-xl shadow-lg p-6 mt-10 w-full max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <button
     onClick={() => setShowModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',marginTop:40, width:'110px', marginBottom:-10, borderRadius:5}}>
        {/* <FaPlus />  */}
     Add a Leave </button>  
     </div>

    <div className='flex flex-wrap justify-end'>
          <button
     onClick={() => setshowExportModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',width:'120px', marginLeft:50, marginTop:-30, borderRadius:5}}>
        {/* <FaPlus />  */}
     Export Leaves</button> 
    </div>


  <div className='Search flex flex-wrap justify-center'>  
      <input
      type="text"
      placeholder="Search leaves..."
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
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaLeave />  */}
                 Duration In Days
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                Personnel
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 contract
                </div>
              </th>
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 startDate
                </div>
              </th>
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 endDate
                </div>
              </th>
              
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 isValidated
                </div>
              </th>
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 description
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                  Action
                </div>
             </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(Leaves) &&  Leaves.map((c, index) => (
              <tr key={c._id} className={`${ index % 2 === 0 ? "bg-gray-50" : "bg-white" } hover:bg-gray-300 transition-all duration-200`} >
                <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.durationInDays}</td>
                <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.personnel?.name || '-'}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.contract?.description || '-'}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{(c.startDate)}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.endDate}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.isValidated}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.description}</td>
                 <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">
                  <FaEdit style={{cursor:'pointer', marginLeft:10}} className='inline' size={20} onClick={() => OpenUpdateModal(c)} />
                  <FaTrash style={{cursor:'pointer', marginLeft:10}} className='inline' onClick={() => {
                              setSelectedUserId(c._id)
                               setdeleteModal(true)
                             }} size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for add*/}
      {/* {showModal && (
        <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Add New Leave</h3>

              <input
                type="number"
                placeholder="Enter durationInDays"
                value={durationInDays}
                onChange={(e) => setdurationInDays(e.target.value)}
                style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                required
              />
              <br />
<br />
                    <select
          value={selectedPersonnel}
          onChange={handlePersonnelChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select Personnel</option>
          {Array.isArray(personnel) &&
            personnel.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>
                    <select
          value={selectedContract}
          onChange={handleContractChange}
          style={{
            padding: 5,
            width: 'calc(77% - 20px)',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer', marginLeft:50,
          }}
        >
          <option value="">Select Contract</option>
          {Array.isArray(contract) &&
            contract.map((d) => (
              <option key={d._id} value={d._id}>
                {d.description}
              </option>
            ))}
        </select>
            
              <br />
              <br />
               <input
                type="date"
                placeholder="Enter startDate"
                value={startDate}
                onChange={(e) => setstartDate(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
               <input
                type="date"
                placeholder="Enter endDate"
                value={endDate}
                onChange={(e) => setendDate(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
                     <select
          value={selectedValidatedBy}
          onChange={handleValidatedByChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select ValidatedBy</option>
          {Array.isArray(validatedBy) &&
            validatedBy.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>
              <br />
              <br />
                    <select
          value={isValidated}
          onChange={(e) => setisValidated(e.target.value)}
          style={{
            padding: 5,
            width: 'calc(77% - 20px)',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer', marginLeft:50,
          }}
        >
          <option value="">isValidated ?</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
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
      )} */}

      {/* Modal for add */}
{showModal && (
  <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div
      className="relative bg-gray-950"
         style={{ width: 'calc(70% - 10px)', borderRadius: 20, padding:20, boxShadow:'0 0 20px'}}
    >
      <h3 className="text-center" style={{ marginTop: 20, marginBottom: 20 }}>
        Add New Leave
      </h3>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">

        <input
          type="number"
          placeholder="Enter durationInDays"
          value={durationInDays}
          onChange={(e) => setdurationInDays(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <select
          value={selectedContract}
          onChange={handleContractChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select Contract</option>
          {Array.isArray(contract) &&
            contract.map((d) => (
              <option key={d._id} value={d._id}>
                {d.description}
              </option>
            ))}
        </select>

          <select
          value={selectedPersonnel}
          onChange={handlePersonnelChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select Personnel</option>
          {Array.isArray(personnel) &&
            personnel.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>


        <input
          type="date"
          placeholder="Enter startDate"
          value={startDate}
          onChange={(e) => setstartDate(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <input
          type="date"
          placeholder="Enter endDate"
          value={endDate}
          onChange={(e) => setendDate(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <select
          value={isValidated}
          onChange={(e) => setisValidated(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">isValidated ?</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

      </div>
<br />
<br />
     
      <div className="flex justify-center mt-6 gap-4">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          style={{
            backgroundColor: 'orange',
            padding: 5,
            width: '50%',
            cursor: 'pointer',
            borderRadius: 10,
            color: 'black'
          }}
        >
          Cancel
        </button>
        <button
          onClick={Add}
          style={{
            backgroundColor: 'white',
            cursor: 'pointer',
            padding: 5,
            width: '50%',
            borderRadius: 10,
            color: 'black'
          }}
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}


{/* modal for export feature */}
    {showExportModal &&(
          <div className="Export fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20, boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Export Leaves</h3>
            <p className='text-center' style={{textAlign:'center'}}>Do you want to export these Leaves.</p>
        <button  type="button" onClick={() => setshowExportModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:5, color:'black'
                }}>Cancel</button>
                <button onClick={exportLeavePDF} style={{
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
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20, boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Are you sure you want to delete this leave ?</h3>
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
      deleteLeave(SelectedUserId);
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

          {/* Modal for add */}
{updateModal && (
  <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div
      className="relative bg-gray-950"
         style={{ width: 'calc(70% - 10px)', borderRadius: 20, padding:20, boxShadow:'0 0 20px'}}
    >
      <h3 className="text-center" style={{ marginTop: 20, marginBottom: 20 }}>
        Update Leave
      </h3>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">

        <input
          type="number"
          placeholder="Enter durationInDays"
          value={durationInDays}
          onChange={(e) => setdurationInDays(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <select
          value={selectedContract}
          onChange={handleContractChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select Contract</option>
          {Array.isArray(contract) &&
            contract.map((d) => (
              <option key={d._id} value={d._id}>
                {d.description}
              </option>
            ))}
        </select>

          <select
          value={selectedPersonnel}
          onChange={handlePersonnelChange}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Select Personnel</option>
          {Array.isArray(personnel) &&
            personnel.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>

        <input
          type="date"
          placeholder="Enter startDate"
          value={startDate}
          onChange={(e) => setstartDate(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <input
          type="date"
          placeholder="Enter endDate"
          value={endDate}
          onChange={(e) => setendDate(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

        <select
          value={isValidated}
          onChange={(e) => setisValidated(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">isValidated ?</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>

        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          style={{
            padding: 5,
            width: '100%',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center'
          }}
          required
        />

      </div>
<br />
<br />
     
      <div className="flex justify-center mt-6 gap-4">
        <button
          type="button"
          onClick={() => setupdateModal(false)}
          style={{
            backgroundColor: 'orange',
            padding: 5,
            width: '50%',
            cursor: 'pointer',
            borderRadius: 10,
            color: 'black'
          }}
        >
          Cancel
        </button>
        <button
          onClick={UpdateLeave}
          style={{
            backgroundColor: 'white',
            cursor: 'pointer',
            padding: 5,
            width: '50%',
            borderRadius: 10,
            color: 'black'
          }}
        >
          update
        </button>
      </div>
    </div>
  </div>
)}
    </div>

    </div>
    </div>
    </div>
  )
}

export default Leave;