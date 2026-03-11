import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase_config";
import { Link } from "react-router-dom";

export default function Home() {

const [stdPhones, setStdPhones] = useState([]);
const [name, setName] = useState("");
const [sect, setSect] = useState("");
const [tel, setTel] = useState("");
const [search,setSearch]=useState("");

const stdPhoneRef = collection(db, "/stdphones");

useEffect(()=>{
loadPhones();
},[]);

const loadPhones = () => {

getDocs(stdPhoneRef)
.then((phones)=>{

let list=[];

phones.docs.forEach(doc=>{
list.push({id:doc.id,...doc.data()});
});

setStdPhones(list);

})
.catch(err=>alert(err));

};

const addPhone = () => {

if(name==="" || sect==="" || tel===""){
alert("Please fill all fields");
return;
}

const phone={name,sect,tel};

addDoc(stdPhoneRef,phone)
.then(()=>{

setName("");
setSect("");
setTel("");

loadPhones();

})
.catch(err=>alert(err));

};

const delPhone=(id)=>{

if(!window.confirm("Delete this student?")) return;

const targetDoc=doc(stdPhoneRef,id);

deleteDoc(targetDoc)
.then(()=>{

loadPhones();

})
.catch(err=>alert(err));

};


const filteredStudents = stdPhones.filter(std =>
std.name.toLowerCase().includes(search.toLowerCase())
);


const totalCED = stdPhones.filter(s=>s.sect==="ced").length;
const totalTCT = stdPhones.filter(s=>s.sect==="tct").length;


return(

<div
style={{
minHeight:"100vh",
padding:"40px",
background:"linear-gradient(135deg,#667eea,#764ba2)"
}}
>

<div className="container">

{/* HEADER */}

<div
style={{
background:"white",
padding:"35px",
borderRadius:"18px",
marginBottom:"30px",
boxShadow:"0 10px 35px rgba(0,0,0,0.2)",
textAlign:"center"
}}
>

<h1 style={{fontWeight:"800"}}>
📱 Student Phone Directory
</h1>

<p style={{color:"#666"}}>
Manage student contact information
</p>

</div>


{/* DASHBOARD */}

<div className="row mb-4">

<div className="col-md-4">
<div className="card shadow border-0 text-center p-3">
<h5>Total Students</h5>
<h2>{stdPhones.length}</h2>
</div>
</div>

<div className="col-md-4">
<div className="card shadow border-0 text-center p-3">
<h5>CED</h5>
<h2 style={{color:"#28a745"}}>{totalCED}</h2>
</div>
</div>

<div className="col-md-4">
<div className="card shadow border-0 text-center p-3">
<h5>TCT</h5>
<h2 style={{color:"#ff9800"}}>{totalTCT}</h2>
</div>
</div>

</div>


{/* ADD STUDENT */}

<div
style={{
background:"white",
padding:"30px",
borderRadius:"18px",
marginBottom:"30px",
boxShadow:"0 10px 35px rgba(0,0,0,0.2)"
}}
>

<h3 className="mb-3">➕ Add Student</h3>

<div className="row g-3">

<div className="col-md-4">

<label className="form-label">👤 Student Name</label>

<input
type="text"
value={name}
onChange={e=>setName(e.target.value)}
className="form-control"
placeholder="Enter student name"
/>

</div>

<div className="col-md-3">

<label className="form-label">🏫 Section</label>

<div>

<input
type="radio"
name="rdSect"
value="ced"
checked={sect==="ced"}
onChange={e=>setSect(e.target.value)}
/>

&nbsp; CED

&nbsp;&nbsp;

<input
type="radio"
name="rdSect"
value="tct"
checked={sect==="tct"}
onChange={e=>setSect(e.target.value)}
/>

&nbsp; TCT

</div>

</div>

<div className="col-md-3">

<label className="form-label">📞 Telephone</label>

<input
type="tel"
value={tel}
onChange={e=>setTel(e.target.value)}
className="form-control"
placeholder="Phone number"
/>

</div>

<div className="col-md-2">

<button
onClick={addPhone}
className="btn btn-success w-100"
style={{marginTop:"32px"}}
>
Add
</button>

</div>

</div>

</div>


{/* SEARCH */}

<div className="mb-3">

<input
type="text"
placeholder="🔍 Search student name..."
className="form-control"
value={search}
onChange={e=>setSearch(e.target.value)}
/>

</div>


{/* STUDENT LIST */}

<div
style={{
background:"white",
padding:"30px",
borderRadius:"18px",
boxShadow:"0 10px 35px rgba(0,0,0,0.2)"
}}
>

<h3 className="mb-3">📋 Student List</h3>

{filteredStudents.length>0?(

<table className="table table-hover">

<thead className="table-primary">

<tr>
<th></th>
<th>Name</th>
<th>Section</th>
<th>Telephone</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filteredStudents.map(phone=>{

return(

<tr key={phone.id} style={{transition:"0.2s"}}>

<td>

<div
style={{
width:"35px",
height:"35px",
borderRadius:"50%",
background:"#667eea",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"bold"
}}
>
{phone.name.charAt(0).toUpperCase()}
</div>

</td>

<td style={{fontWeight:"600"}}>
{phone.name}
</td>

<td>

<span
style={{
background:phone.sect==="ced" ? "#28a745" : "#ff9800",
color:"white",
padding:"5px 12px",
borderRadius:"12px",
fontSize:"12px"
}}
>
{phone.sect.toUpperCase()}
</span>

</td>

<td>{phone.tel}</td>

<td>

<Link to="/edit" state={phone.id}>

<button className="btn btn-warning btn-sm me-2">
Edit
</button>

</Link>

<button
onClick={()=>delPhone(phone.id)}
className="btn btn-danger btn-sm"
>
Delete
</button>

</td>

</tr>

)

})}

</tbody>

</table>

):( 

<div style={{textAlign:"center",padding:"40px"}}>

<h4>No Student Found</h4>

<p>Please add student data</p>

</div>

)}

</div>

</div>

</div>

)

}