import '../components/All.css';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
type Fine = {
    _id:number;
    name:string;
    date:string;
    fineType:{
        id:number;
        name:string;
    };
    description:string;
}
type FineType = {
  _id:number;
  name:string;
}
const Fine = () => {
  const navigate = useNavigate();

  const [SelectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setdeleteModal] = useState(false);
  const [showExportModal, setshowExportModal] = useState(false);
  const [name, setName] = useState("");
  const [date, setdate] = useState("")
  const [description, setdescription] = useState("");


  const [fineType, setfineType] = useState<FineType[]>([]);

   const [selectedFineType, setselectedFineType] = useState("")

  const [Fines, setFines] = useState<Fine[]>([])
  const [search, setsearch] = useState("")

    const Add = () =>{
      if(!name || !date || !selectedFineType ){
            Swal.fire({
              title: 'Error!',
              text: 'Inputs are empty. Fill!',
              icon: 'error',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
      }else{
        axios.post("http://localhost:5000/fine", {name, date, fineType:selectedFineType, description}).then(() =>{
          Swal.fire({
              title: 'Fine added successful!',
              text: 'You have successfully added this fine.',
              icon: 'success',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
                 setShowModal(false);
                 navigate("/dashboard");
        }).catch((error) => console.error(error));
      }
    }

    const getFineType = async() =>{
     try {
      const response = await axios.get("http://localhost:5000/fine/fineType");
       console.log(response.data); 
      setfineType(response.data)
     } catch (error) {
      console.error(error);
     }
    }

    useEffect(() =>{
      getFineType();
    },[]);

    const handleFineTypeChange = (e:any) =>{
      setselectedFineType(e.target.value);
    }

    // getting fines
    const getFines = async() =>{
   try {
       const response = await axios.get("/fine")
      setFines(response.data.data)
   } catch (error) {
     console.error(error)
   }
      }

      useEffect(() =>{
        getFines();
      },[])


      const deleteFine = (id:number) =>{
        axios.delete(`http://localhost:5000/fine/${id}`).then(() =>{
          setFines(Fines.filter(fine => fine._id !== id))
           Swal.fire({
                title: 'Fine deleted successful!',
                text: 'You have successfully deleted this fine.',
                icon: 'success',
                confirmButtonText: 'OK',
                  confirmButtonColor:'var(--color-gray-950)'
                  })
        })
      }

     const exportFinePDF = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/fine/export/pdf",
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "fine.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setshowExportModal(false);

    Swal.fire({
      title: "Export successful!",
      text: "Fine exported as PDF.",
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
          `/fine/search?search=${search}`
        );
        setFines(res.data);
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
     <div className='right-dashboard flex-1 h-full overflow-y-auto no-scrollbar'>
    <p className='text-3xl' style={{marginTop:20}}>Fines</p>

 <div className="rounded-xl shadow-lg p-6 mt-10 w-full max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <button
     onClick={() => setShowModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',marginTop:40, width:'100px', marginBottom:-10, borderRadius:5}}>
        {/* <FaPlus />  */}
     Add a Fine </button>  
     </div>

    <div className='flex flex-wrap justify-end'>
          <button
     onClick={() => setshowExportModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',width:'110px', marginLeft:50, marginTop:-30, borderRadius:5}}>
        {/* <FaPlus />  */}
     Export Fines</button> 
    </div>

       <div className='Search flex flex-wrap justify-center'>  
      <input
      type="text"
      placeholder="Search fines..."
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
                  {/* <FaFine />  */}
                 Name
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2">
                  {/* <FaBox />  */}
                Date
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2">
                  {/* <FaBox />  */}
                 Fine-Type
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
            {Array.isArray(Fines) && Fines.map((c, index) => (
              <tr key={c._id} className={`${ index % 2 === 0 ? "bg-gray-50" : "bg-white" } hover:bg-gray-300 transition-all duration-200`} >
                <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">{c.name}</td>
                <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">{c.date}</td>
                   <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">{c.fineType.name}</td>
                  <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">{c.description}</td>
                <td  style={{padding:10}}  className="py-3 px-6 text-gray-700">
                  <FaEdit style={{cursor:'pointer', marginLeft:10}} className='inline' size={20} />
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
      {showModal && (
        <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20, boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Add New Fine</h3>

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
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                          <select
  value={selectedFineType}
  onChange={handleFineTypeChange}
  style={{
    padding: 5,
    width: 'calc(77% - 20px)',
    border: '1px solid white',
    marginLeft: 50,
    borderRadius: 10,
    textAlign: 'center',
  backgroundColor:'var(--color-gray-950)', color:'white', cursor:'pointer'
  }}
>
  <option value="">Select FineType</option>

  {Array.isArray(fineType) &&
    fineType.map((d) => (
      <option key={d._id} value={d._id}>
        {d.name}
      </option>
    ))}
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
      )}

{/* modal for export feature */}
    {showExportModal &&(
          <div className="Export fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20,boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Export Fines</h3>
            <p className='text-center' style={{textAlign:'center'}}>Do you want to export these Fines.</p>
        <button  type="button" onClick={() => setshowExportModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:5, color:'black'
                }}>Cancel</button>
                <button onClick={exportFinePDF} style={{
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
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Are you sure you want to delete this fine ?</h3>
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
      deleteFine(SelectedUserId);
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

export default Fine;