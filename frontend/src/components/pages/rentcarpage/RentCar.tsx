import React from "react";

export default function RentCar() {
    return (
        <div className="rentCar">
            <div className="typeDriver">
                <h3>Tipe Driver</h3>
                <select className="rentCarBox" id="driverType" aria-label="Default select example">
                    <option value="0">Pilih Tipe Driver</option>
                    <option value="1">Dengan Sopir</option>
                    <option value="2">Tanpa Sopir (Lepas Kunci)</option>
                </select>
            </div>
            <div className="datePicker">
                <h3>Tanggal</h3>
                <input type="date" id="selectedDate" className="rentCarBox" />
            </div>
            <div className="timePicker">
                <h3>Waktu Jemput/Ambil</h3>
                <select className="rentCarBox" id="availableAt" aria-label="Default select example">
                    <option value="0">Pilih Waktu</option>
                    <option className="timeChoose" value="1">08.00 WIB</option>
                    <option className="timeChoose" value="2">09.00 WIB</option>
                    <option className="timeChoose" value="3">10.00 WIB</option>
                    <option className="timeChoose" value="4">11.00 WIB</option>
                    <option className="timeChoose" value="5">12.00 WIB</option>
                </select>
            </div>
            <div className="totalPassenger">
                <h3>Jumlah Penumpang (optional)</h3>
                <input type="text" className="rentCarBox" id="passengers" />
            </div>
            <div className="findCar">
                <button className="buttonFindCar" id="searchButton">
                    <strong>Cari Mobil</strong>
                </button>
            </div>
        </div>
    );
}
