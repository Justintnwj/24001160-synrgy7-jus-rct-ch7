import React from "react";
import carBeep from "../../../assets/img-BeepBeep.svg";
import buttonYa from "../../../assets/ButtonYa.svg";
import buttonNo from "../../../assets/ButtonNo.svg";

export default function Home() {
    return (
        <div className="deleteCarCard">
            <img src={carBeep} className="carBeep" />
            <div className="descDeleteCar font">
                <h3><strong>Menghapus Data Mobil</strong></h3>
                <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
            </div>
            <div className="buttonYaNo">
                <img src={buttonYa} className="buttonYa" />
                <img src={buttonNo} className="buttonNo" />
            </div>
        </div>
    );
}
