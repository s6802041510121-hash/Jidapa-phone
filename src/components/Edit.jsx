import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase_config";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.css";

const Edit = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;

    const [name, setName] = useState("");
    const [sect, setSect] = useState("");
    const [tel, setTel] = useState("");

    const ref = collection(db, "/stdphones");
    const targetDoc = doc(ref, id);

    useEffect(() => {

        getDoc(targetDoc)
            .then(doc => {

                let phone = doc.data();

                setName(phone.name);
                setSect(phone.sect);
                setTel(phone.tel);

            })
            .catch(err => alert(err));

    }, [targetDoc]);


    const editHandler = () => {

        const phone = { name, sect, tel };

        updateDoc(targetDoc, phone)
            .then(() => {
                alert("Student updated successfully ✅");
                navigate("/");
            })
            .catch(err => alert(err));

    };


    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                background: "linear-gradient(135deg,#667eea,#764ba2)"
            }}
        >

            <div className="container">

                {/* HEADER */}

                <div
                    style={{
                        background: "white",
                        padding: "35px",
                        borderRadius: "18px",
                        marginBottom: "30px",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
                        textAlign: "center"
                    }}
                >

                    <h1 style={{ fontWeight: "800" }}>
                        ✏ Edit Student Information
                    </h1>

                    <p style={{ color: "#666" }}>
                        Update student contact information
                    </p>

                    <div
                        style={{
                            marginTop: "10px",
                            background: "#f1f5ff",
                            display: "inline-block",
                            padding: "6px 15px",
                            borderRadius: "10px",
                            fontSize: "14px"
                        }}
                    >
                        Student ID : <b>{id}</b>
                    </div>

                </div>


                {/* EDIT FORM */}

                <div
                    style={{
                        background: "white",
                        padding: "35px",
                        borderRadius: "18px",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.2)",
                        maxWidth: "650px",
                        margin: "auto"
                    }}
                >

                    <h4 style={{ marginBottom: "25px" }}>
                        📋 Student Details
                    </h4>


                    {/* NAME */}

                    <div className="mb-3">

                        <label className="form-label">
                            👤 Student Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="form-control"
                            placeholder="Enter student name"
                        />

                    </div>


                    {/* SECTION */}

                    <div className="mb-4">

                        <label className="form-label">
                            🏫 Section
                        </label>

                        <div className="d-flex gap-3">

                            <button
                                type="button"
                                className={`btn ${sect === "ced" ? "btn-success" : "btn-outline-success"}`}
                                onClick={() => setSect("ced")}
                            >
                                CED
                            </button>

                            <button
                                type="button"
                                className={`btn ${sect === "tct" ? "btn-warning" : "btn-outline-warning"}`}
                                onClick={() => setSect("tct")}
                            >
                                TCT
                            </button>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="mb-3">

                        <label className="form-label">
                            📞 Telephone
                        </label>

                        <input
                            type="tel"
                            value={tel}
                            onChange={e => setTel(e.target.value)}
                            className="form-control"
                            placeholder="Enter phone number"
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="d-flex justify-content-between mt-4">

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            ⬅ Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            style={{
                                padding: "8px 20px",
                                fontWeight: "600"
                            }}
                            onClick={editHandler}
                        >
                            💾 Save Changes
                        </button>

                    </div>

                </div>


                {/* BACK BUTTON */}

                <div style={{ textAlign: "center", marginTop: "25px" }}>

                    <button
                        className="btn btn-light"
                        onClick={() => navigate("/")}>
                        🏠 Back to Home
                    </button>

                </div>

            </div>

        </div>

    )

}

export default Edit;