import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditCar() {
    const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>();

    const editCarName = localStorage.getItem('careditname')
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [insertResult, setInsertResult] = useState<string>("");
    console.log(editCarName);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Small");
    const [price, setPrice] = useState("");

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

    const handleEditCar = async () => {

        if (name === "" || category === "" || price == "") {
            setInsertResult("Semua Kolom Harus Diisi");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/cars/${editCarName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, category, price})
            });

            const result = await response.json();
            setInsertResult(result.message)


            if (response.ok) {
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
                    localStorage.removeItem('careditname')
                    navigate("/admindashboard");
                } catch (error) {
                    console.error("Error uploading picture:", error);
                }
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating car:', error);
            // Handle error state or display error message
        }
    };

    return (
        <div className="addNewCar font">
            <h3 className="addNew"><strong>Update Car Information</strong></h3>
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
                <button className="saveButtonANW" onClick={handleEditCar}>Save</button>
            </div>
            {insertResult}
        </div>
    );
}
