import React from "react";
import buttonDelete from "../../../assets/ButtonDelete.svg"
import buttonEdit from "../../../assets/ButtonEdit.svg"
import clock from "../../../assets/fi_clock.svg"
import key from "../../../assets/fi_key.svg"

export default function Home() {
    return (
        <div className="carCard font">
            <div className="carUploadImage">
                Gambar
            </div>
            <div className="carName">
                Avanza
            </div>
            <div className="carPrice">
                400000
            </div>
            <div className="timeRentCar">
                <img src={key} />
                <div className="startRent">
                    asdasda
                </div>
                -
                <div className="finishRent">
                    asdasda
                </div>
            </div>
            <div className="updatedCarTime">
                <img src={clock} />
                sadadas
            </div>
            <div className="deleteEditCar">
                <div className="deleteCar">
                <img src={buttonDelete} />
                </div>
                <div className="editCar">
                <img src={buttonEdit} />
                </div>
            </div>
        </div>
    );
}