import React from "react";
import centangImage from "../../../assets/centang.svg"
import serviceImage from "../../../assets/service.svg"

export default function OurService() {
  return (
    <div className="ourService">
      <div className="serviceImage">
        <img src={serviceImage}/>
      </div>

      <div className="ourServiceDesc">
        <div className="firstDescOurService">
          <h2>Best Car Rental for any kind of trip in (Lokasimu)!</h2>

          <p className="font">
            Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang
            lain,
            kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding,
            meeting,
            dll.
          </p>
        </div>
        <div className="secondDescOurService">
          <div className="ourServiceBenefit">
            <div> <img src={centangImage}/></div>
            <div className="listBenefit font">Sewa Mobil Dengan Supir di Bali 12 Jam</div>
          </div>
          <div className="ourServiceBenefit">
            <div> <img src={centangImage}/></div>
            <div className="listBenefit font">Sewa Mobil Lepas Kunci di Bali 24 Jam</div>
          </div>
          <div className="ourServiceBenefit">
            <div> <img src={centangImage}/></div>
            <div className="listBenefit font">Sewa Mobil Jangka Panjang Bulanan</div>
          </div>
          <div className="ourServiceBenefit">
            <div> <img src={centangImage}/></div>
            <div className="listBenefit font">Gratis Antar - Jemput Mobil di Bandara</div>
          </div>
          <div className="ourServiceBenefit">
            <div> <img src={centangImage}/></div>
            <div className="listBenefit font">Layanan Airport Transfer / Drop In Out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
