import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../Navbar.css';


const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState();
  const [contact, setContact] = useState("");

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);

      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        console.log("Updated data: ", result);
        setName(result.name);
        setEmail(result.email);
        setDate(result.date);
        setContact(result.contact);
        
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  //Send updated data to backened
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, contact, date};
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      navigate("/list");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date Of Birth</label>
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-3">
        </div>
        <button type="submit" className="btn-btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};


export default Edit;
