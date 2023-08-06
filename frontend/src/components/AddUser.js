import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Navbar.css';


const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState();
  const [contact, setContact] = useState("");

    
  const [error, setError] = useState("");

  const navigate = useNavigate();
  console.log(name, email, date, contact);

  const handleSubmit = async (e)=> {
      e.preventDefault();
      const addUser = {name, email, date ,contact}
      const response = await fetch(`http://localhost:5000/`, {
        method : "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),

      });
      const result = await response.json();

      if(!response.ok) {
        console.log(result.error);
        setError(result.error);
      }
      if(response.ok) {
        console.log(result);
        setError("");
        setName("");
        setEmail("");
        setDate("");
        setContact("");
        navigate("/list");
      }
    };

  return (
    <div className='container'>
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Enter the data</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Date Of Birth</label>
    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Contact</label>
    <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)}/>
  </div>
          <td></td>
    <button type="submit" className="btn-btn-primary">Submit</button>
</form>
    </div>
  )
}

export default AddUser;
