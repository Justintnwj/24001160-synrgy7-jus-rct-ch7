import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewCar() {
    const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [insertResult, setInsertResult] = useState<string>("");
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Small");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState("");

    const handleCancel = () => {
        navigate("/admindashboard");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setImageFile(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddNewCar = async () => {
        if (name === "" || price === "" || category ===""){
            setInsertResult("Semua Kolom Harus Di isi");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/v1/cars", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
              body: JSON.stringify({ name, price,category }),
            });
      
            const result = await response.json();
            setInsertResult(result.message);

            if (result.message === "Mobil berhasil diinput"){
                try {
                    if (!fileRef.current?.files?.[0]) {
                        console.error("No file selected");
                        return;
                    }
            
                    const formData = new FormData();
                    formData.append("image", fileRef.current.files[0]);
            
                    const response = await fetch(`http://localhost:8000/api/v1/cars/updateim/${name}`, {
                        method: "PUT",
                        body: formData,
                    });
            
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
            
                    const result = await response.json();
                    console.log("Upload successful:", result);
                    setInsertResult(result.message);
                    navigate("/admindashboard");
                } catch (error) {
                    console.error("Error uploading picture:", error);
                }
            }
            else {
                setInsertResult(result.message);
            }

        } catch (error) {
            console.log(error);
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
                        ref={fileRef}
                        className="formAddNewCarStyle"
                        type="file"
                        placeholder="Gambar"
                        onChange={handleChange}
                    />
                </div>
                <img src={typeof imageFile === 'string' ? imageFile : ''} className="App-logo" alt="logo" style={{ width: '200px' }} />
            </div>
            <div className="buttonInputANW font">
                <button className="cancelButtonANW" onClick={handleCancel}>Cancel</button>
                <button className="saveButtonANW" onClick={handleAddNewCar}>Save</button>
            </div>
            {insertResult}
        </div>
    );
}
