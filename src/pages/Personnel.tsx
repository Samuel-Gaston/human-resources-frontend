import '../components/All.css';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
type Personnel = {
    _id:number;
    name:string;
    gender:string;
    email:string;
    phone:number;
    salary:number;
    maritalStatus:string;
    childStatus:string;
    isDrivingLicense:string;
    recrutementDate:string;
    emergencyContact: string;
   employmentStatus:string;
   position:{
    _id:number;
    name:string;
   },
   cnps:{
    _id:number;
    name:string;
   }
}

 type Position = {
    _id:number;
    name:string;
   }

 type CNPS = {
    _id:number;
    name:string;
   }

const Personnel = () => {
  const navigate = useNavigate();
  
  const [SelectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [deleteModal, setdeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showExportModal, setshowExportModal] = useState(false);
  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [salary, setsalary] = useState("")
  const [maritalStatus, setmaritalStatus] = useState("");
  const [childStatus, setchildStatus] = useState("");
  const [isDrivingLicense, setisDrivingLicense] = useState("");
  const [recrutementDate, setrecrutementDate] = useState("");
  const [emergencyContact, setemergencyContact] = useState("");
  const [employmentStatus, setemploymentStatus] = useState("");
  const [selectedPosition, setselectedPosition] = useState("")
  const [selectedCNPS, setselectedCNPS] = useState("")

    const [cnps, setcnps] = useState<CNPS[]>([]);
  const [position, setposition] = useState<Position[]>([]);
  const [Personnels, setPersonnels] = useState<Personnel[]>([]);

  const [search, setsearch] = useState("");


      const Add = () =>{
      if(!name || !email || !gender ){
            Swal.fire({
              title: 'Error!',
              text: 'Inputs are empty. Fill!',
              icon: 'error',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
      }else{
        axios.post("http://localhost:5000/personnel", { name, gender, email, phone, salary, maritalStatus, childStatus, isDrivingLicense, recrutementDate, emergencyContact, employmentStatus, position:selectedPosition, cnps:selectedCNPS}).then((res) =>{
          Swal.fire({
              title: 'Personnel added successful!',
              text: 'You have successfully added this personnel.',
              icon: 'success',
              confirmButtonText: 'OK',
                confirmButtonColor:'var(--color-gray-950)'
                })
                 setShowModal(false);
                 navigate("/dashboard");
                 console.log(res.data.data);
        }).catch((error) => console.error(error));
      }
    }


       const getPosition = async() =>{
      try {
       const response = await axios.get("http://localhost:5000/personnel/position");
        console.log(response.data); 
       setposition(response.data)
      } catch (error) {
       console.error(error);
      }
     }
 
     useEffect(() =>{
       getPosition();
     },[]);
 
     const handlePositionChange = (e:any) =>{
       setselectedPosition(e.target.value);
     }


       const getCNPS = async() =>{
      try {
       const response = await axios.get("http://localhost:5000/personnel/cnps");
        console.log(response.data); 
       setcnps(response.data)
      } catch (error) {
       console.error(error);
      }
     }
 
     useEffect(() =>{
       getCNPS();
     },[]);
 
     const handleCNPSChange = (e:any) =>{
       setselectedCNPS(e.target.value);
     }

         const getPersonnels = async() =>{
   try {
       const response = await axios.get("http://localhost:5000/personnel")
      setPersonnels(response.data.data)
   } catch (error) {
     console.error(error)
   }
      }

      useEffect(() =>{
        getPersonnels();
      },[])


            const deletePersonnel = (id:number) =>{
        axios.delete(`http://localhost:5000/personnel/${id}`).then(() =>{
          setPersonnels(Personnels.filter(personnel => personnel._id !== id))
           Swal.fire({
                title: 'Personnel deleted successful!',
                text: 'You have successfully deleted this personnel.',
                icon: 'success',
                confirmButtonText: 'OK',
                  confirmButtonColor:'var(--color-gray-950)'
                  })
        })
      }

     const exportPersonnelPDF = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/personnel/export/pdf",
      { responseType: "blob" }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "personnel.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setshowExportModal(false);

    Swal.fire({
      title: "Export successful!",
      text: "Personnel exported as PDF.",
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
          `/personnel/search?search=${search}`
        );
        setPersonnels(res.data);
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
    <p className='text-3xl' style={{marginTop:20}}>Personnel</p>

 <div className="rounded-xl shadow-lg p-6 mt-10 w-full max-w-4xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <button
     onClick={() => setShowModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',marginTop:40, width:'150px', marginBottom:-10, borderRadius:5}}>
        {/* <FaPlus />  */}
     Add a Personnel </button>  
     </div>

    <div className='flex flex-wrap justify-end'>
          <button
     onClick={() => setshowExportModal(true)}
     className="Addd text-white bg-gray-950"
     style={{padding:7, cursor:'pointer',width:'150px', marginLeft:50, marginTop:-30, borderRadius:5}}>
        {/* <FaPlus />  */}
     Export Personnel</button> 
    </div>
    
   <div className='Search flex flex-wrap justify-center'>  
      <input
      type="text"
      placeholder="Search personnels..."
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
                <div className="flex items-center gap-2" style={{marginLeft:10}}>
                  {/* <FaPersonnel />  */}
                Name
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
               Gender
                </div>
              </th>
              <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                Email
                </div>
              </th>
                <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                Phone
                </div>
              </th>
                <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                Salary
                </div>
              </th>
                <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                 maritalStatus
                </div>
              </th>
                <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                childStatus
                </div>
              </th>
               <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                isDrivingLicense
                </div>
              </th>
               <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                recrutementDate
                </div>
              </th>
               <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                emergencyContact
                </div>
              </th>
               <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
               employmentStatus
                </div>
              </th>
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
                position
                </div>
              </th>   
                 <th className="py-3 px-6 text-left font-semibold">
                <div className="flex items-center gap-2" style={{marginLeft:30}}>
                  {/* <FaBox />  */}
               cnps
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
            {Array.isArray(Personnels) && Personnels.map((c, index) => (
              <tr key={c._id} className={`${ index % 2 === 0 ? "bg-gray-50" : "bg-white" } hover:bg-gray-300 transition-all duration-200`} >
                <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.name}</td>
                <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.gender}</td>
                   <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.email}</td>
                 <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.phone}</td>
                 <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.salary}</td>
                 <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.maritalStatus}</td>
                 <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.childStatus}</td>
              <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.isDrivingLicense}</td>
              <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.recrutementDate}</td>
                  <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.emergencyContact}</td>
                  <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.employmentStatus}</td>
                  <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.position?.name || '-'}</td>
                  <td  style={{padding:10, textAlign:'center'}}  className="py-3 px-6 text-gray-700">{c.cnps?.name || '-'}</td>
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
      {/* {showModal && (
        <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20, boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Add New Personnel</h3>

              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                required
              />
<br />
<br />
              <input
                type="text"
                placeholder="Enter gender"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                 <input
                type="text"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                 <input
                type="text"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => setsalary(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
                   <br />
              <br />
               <select
          value={maritalStatus}
          onChange={(e) => setmaritalStatus(e.target.value)}
          style={{
            padding: 5,
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50,
          }}
        >
          <option value="">maritalStatus ?</option>
          <option value="single">single</option>
          <option value="married">married</option>
          <option value="divorced">divorced</option>
          <option value="widowed">widowed</option>
        </select>
             <br />
              <br />
               <select
          value={childStatus}
          onChange={(e) => setchildStatus(e.target.value)}
          style={{
            padding: 5,
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50,
          }}
        >
          <option value="">childStatus ?</option>
          <option value="has_child">has_child</option>
          <option value="no_child">no_child</option>
        </select>
              <br />
              <br />
               <select
          value={isDrivingLicense}
          onChange={(e) => setisDrivingLicense(e.target.value)}
          style={{
            padding: 5,
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50,
          }}
        >
          <option value="">isDrivingLicense ?</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        <br />
        <br />
                 <input
                type="date"
                placeholder="Enter recrutementDate"
                value={recrutementDate}
                onChange={(e) => setrecrutementDate(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
              <br />
              <br />
                   <select
          value={selectedCNPS}
          onChange={handleCNPSChange}
          style={{
            padding: 5,
            width: 'calc(77% - 20px)',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',marginLeft:50,
          }}
        >
          <option value="">Select CNPS</option>
          {Array.isArray(cnps) &&
            cnps.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>
              <br />
              <br />
                   <select
          value={selectedPosition}
          onChange={handlePositionChange}
          style={{
            padding: 5,
            width: 'calc(77% - 20px)',
            border: '1px solid white',
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',marginLeft:50,
          }}
        >
          <option value="">Select Position</option>
          {Array.isArray(position) &&
            position.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
        </select>
              <br />
              <br />
                 <input
                type="text"
                placeholder="Enter emergencyContact"
                value={emergencyContact}
                onChange={(e) => setemergencyContact(e.target.value)}
               style={{padding:5, width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50, borderRadius:10, textAlign:'center'}}
                 required
              />
                <br />
              <br />
               <select
          value={employmentStatus}
          onChange={(e) => setemploymentStatus(e.target.value)}
          style={{
            padding: 5,
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'var(--color-gray-950)',
            color: 'white',
            cursor: 'pointer',width:'calc(77% - 20px)', border:'1px solid white', marginLeft:50,
          }}
        >
          <option value="">employmentStatus ?</option>
          <option value="Active">Active</option>
          <option value="Terminated">Terminated</option>
          <option value="On_Leave">On_Leave</option>
          <option value="Retired">Retired</option>
        </select>
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
      {/* Modal for add*/}
{showModal && (
  <div className="Add fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      className="relative bg-gray-950"
      style={{ width: 'calc(70% - 20px)', borderRadius: 20, boxShadow: '0 0 20px' }}
    >
      <h3 className="text-center" style={{ marginTop: 20, marginBottom: 20 }}>
        Add New Personnel
      </h3>

      {/* ⬇️ ONLY THIS WRAPPER IS NEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">

        <input type="text" placeholder="Enter Name" value={name}
          onChange={(e) => setname(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <input type="text" placeholder="Enter gender" value={gender}
          onChange={(e) => setgender(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <input type="email" placeholder="Enter email" value={email}
          onChange={(e) => setemail(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <input type="number" placeholder="Enter phone" value={phone}
          onChange={(e) => setphone(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <input type="number" placeholder="Enter salary" value={salary}
          onChange={(e) => setsalary(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <select value={maritalStatus}
          onChange={(e) => setmaritalStatus(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">maritalStatus ?</option>
          <option value="single">single</option>
          <option value="married">married</option>
          <option value="divorced">divorced</option>
          <option value="widowed">widowed</option>
        </select>

        <select value={childStatus}
          onChange={(e) => setchildStatus(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">childStatus ?</option>
          <option value="has_child">has_child</option>
          <option value="no_child">no_child</option>
        </select>

        <select value={isDrivingLicense}
          onChange={(e) => setisDrivingLicense(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">isDrivingLicense ?</option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>

        <input type="date" placeholder="Enter recrutementDate" value={recrutementDate}
          onChange={(e) => setrecrutementDate(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <select value={selectedCNPS}
          onChange={handleCNPSChange}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">Select CNPS</option>
          {Array.isArray(cnps) && cnps.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>

        <select value={selectedPosition}
          onChange={handlePositionChange}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">Select Position</option>
          {Array.isArray(position) && position.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <input type="text" placeholder="Enter emergencyContact" value={emergencyContact}
          onChange={(e) => setemergencyContact(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center' }}
          required
        />

        <select value={employmentStatus}
          onChange={(e) => setemploymentStatus(e.target.value)}
          style={{ padding: 5, width: 'calc(90% - 20px)', border: '1px solid white', marginLeft:20, borderRadius: 10, textAlign: 'center', backgroundColor: 'var(--color-gray-950)', color: 'white', cursor: 'pointer' }}
        >
          <option value="">employmentStatus ?</option>
          <option value="Active">Active</option>
          <option value="Terminated">Terminated</option>
          <option value="On_Leave">On_Leave</option>
          <option value="Retired">Retired</option>
        </select>

      </div>

      <br />

      <div className='flex justify-center'>
        <button type="button" onClick={() => setShowModal(false)}
        style={{ backgroundColor: 'orange', marginLeft:20, padding: 5, marginBottom: 20, width: 'calc(40% - 20px)', cursor: 'pointer', borderRadius: 10, color: 'black', height:34, marginTop:20 }}>
        Cancel
      </button>

      <button onClick={Add}
        style={{ backgroundColor: 'white', cursor: 'pointer', marginLeft: 10, padding: 5, marginBottom: 50, marginTop: 20, width: 'calc(40% - 20px)', borderRadius: 10, color: 'black' }}>
        Add
      </button>
      </div>

    </div>
  </div>
)}


{/* modal for export feature */}
    {showExportModal &&(
          <div className="Export fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
          <div className="relative bg-gray-950" style={{width:'calc(40% - 20px)', borderRadius:20,boxShadow:'0 0 20px'}}>
            <h3 className="text-center" style={{marginTop:20, marginBottom:20}}>Export Personnels</h3>
            <p className='text-center' style={{textAlign:'center'}}>Do you want to export these Personnels.</p>
        <button  type="button" onClick={() => setshowExportModal(false)} style={{
                    backgroundColor:'orange',
                    marginLeft:50,
                    padding:5,
                    marginBottom:20,
                    width:'calc(40% - 20px)',
                    cursor:'pointer',
                    borderRadius:5, color:'black'
                }}>Cancel</button>
                <button onClick={exportPersonnelPDF} style={{
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
      deletePersonnel(SelectedUserId);
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

export default Personnel;