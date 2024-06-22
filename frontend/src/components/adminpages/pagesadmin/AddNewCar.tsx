import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewCar() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [insertResult, setInsertResult] = useState<string>("");

    const [name, setName] = useState("");
    const [category, setCategory] = useState("Small");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState("");

    const handleCancel = () => {
        navigate("/admindashboard");
    };

    const handleAddNewCar = async () => {
        if (name === "" || category === "" || price == "" || picture === "") {
            setInsertResult("Semua Kolom Harus Diisi");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/api/v1/cars`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, category, price, picture })
            });

            const result = await response.json();
            setInsertResult(result.message)


            if (response.ok) {
                navigate("/admindashboard");
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error adding new car:', error);
            // Handle error state or display error message
        }
    };

    return (
        <div className="addNewCar font">
            <h3 className="addNew"><strong>Add New Car</strong></h3>
            <div className="addNewCarForm">
                <div className="formAddNewCar">
                    <h4 className="formTitle">Nama</h4>
                    <input 
                        type="text" 
                        className="formAddNewCarStyle" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="formAddNewCar">
                    <h4 className="formTitle">Sewa Per Hari</h4>
                    <input 
                        type="text" 
                        className="formAddNewCarStyle" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                    />
                </div>
                <div className="formAddNewCar">
                    <h4 className="formTitle">Ukuran</h4>
                    <select 
                        className="formAddNewCarStyle" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                <div className="formAddNewCar">
                    <h4 className="formTitle">Foto</h4>
                    <input 
                        type="text" 
                        className="formAddNewCarStyle" 
                        value={picture} 
                        onChange={(e) => setPicture(e.target.value)} 
                        required 
                    />
                </div>
            </div>
            <div className="buttonInputANW font">
                <button className="cancelButtonANW" onClick={handleCancel}>Cancel</button>
                <button className="saveButtonANW" onClick={handleAddNewCar}>Save</button>
            </div>
            {insertResult}
        </div>
    );
}
