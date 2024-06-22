import React, { useState, useEffect } from "react";

export default function RentCar() {
    const token = localStorage.getItem('token');
    const [dataListCars, setDataListCars] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedDriverType, setSelectedDriverType] = useState("0");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("0");
    const [passengers, setPassengers] = useState("");
    const [formInValid, setFormInValid] = useState(true);

    const handleSubmit = async () => {
        if (!selectedDriverType || selectedDriverType === "0" || !selectedDate || !selectedTime || selectedTime === "0") {
            setError("Silakan lengkapi semua kolom yang diperlukan");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/cars", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setDataListCars(responseData.data);
            setError(null); // Reset error state
        } catch (error: any) {
            console.error('Fetch error:', error);
            setError(error.message || 'Failed to fetch data');
        }
    };

    const handleDriverTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDriverType(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };

    const handlePassengersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassengers(event.target.value);
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            const timeString = `${hour < 10 ? '0' + hour : hour}.00`;
            options.push(
                <option key={hour} className="timeChoose" value={hour}>
                    {timeString} WIB
                </option>
            );
        }
        return options;
    };

    useEffect(() => {
        if (selectedDriverType && selectedDriverType !== "0" && selectedDate && selectedTime && selectedTime !== "0") {
            setFormInValid(false);
        } else {
            setFormInValid(true);
        }
    }, [selectedDriverType, selectedDate, selectedTime]);

    return (
        <div className="rentCarPosition">
            <div className="rentCar" id="rentCar">
                <div className="typeDriver">
                    <h3>Tipe Driver</h3>
                    <select className="rentCarBox" id="driverType" aria-label="Default select example" value={selectedDriverType} onChange={handleDriverTypeChange}>
                        <option value="0">Pilih Tipe Driver</option>
                        <option value="1">Dengan Sopir</option>
                        <option value="2">Tanpa Sopir (Lepas Kunci)</option>
                    </select>
                </div>
                <div className="datePicker">
                    <h3>Tanggal</h3>
                    <input type="date" id="selectedDate" className="rentCarBox" value={selectedDate} onChange={handleDateChange} />
                </div>
                <div className="timePicker">
                    <h3>Waktu Jemput/Ambil</h3>
                    <select className="rentCarBox" id="availableAt" aria-label="Default select example" value={selectedTime} onChange={handleTimeChange}>
                        <option value="0">Pilih Waktu</option>
                        {generateTimeOptions()}
                    </select>
                </div>
                <div className="totalPassenger">
                    <h3>Jumlah Penumpang (optional)</h3>
                    <input type="text" className="rentCarBox" id="passengers" value={passengers} onChange={handlePassengersChange} />
                </div>
                <div className="findCar">
                    <button className="buttonFindCar" id="searchButton" type="button" onClick={handleSubmit} disabled={formInValid}>
                        <strong>Cari Mobil</strong>
                    </button>
                </div>
            </div>
            <div className="carCardTableRent">
                {dataListCars.map((car) => (
                    <div key={car.id} className="carCardRent font">
                        <div className="carUploadImageRent">
                            {car.images}
                        </div>
                        <div className="carName">
                            {car.name} / {car.category}
                        </div>
                        <div className="carPrice">
                            Rp {car.price} / hari
                        </div>
                        <button className="chooseCar font">
                            Pilih Mobil
                        </button>
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
}
