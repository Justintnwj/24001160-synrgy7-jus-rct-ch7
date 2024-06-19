import React from "react";

export default function RentNow() {
    return (
        <div className="rentNow">
            <div className="rentNowCenter">
                <div className="rentNowTitle">Sewa Mobil di (Lokasimu) Sekarang</div>
                <div className="rentNowDesc font">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.
                </div>
                <button className="carRentButton font">
                    <a href="http://localhost:5173/getcars">Mulai Sewa Mobil</a>
                </button>
            </div>
        </div>
    );
}
