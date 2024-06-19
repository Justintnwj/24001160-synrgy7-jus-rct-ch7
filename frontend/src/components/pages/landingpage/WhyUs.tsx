import React from "react";
import icon1 from "../../../assets/icon1.svg"
import icon2 from "../../../assets/icon2.svg"
import icon3 from "../../../assets/icon3.svg"
import icon4 from "../../../assets/icon4.svg"

export default function WhyUs() {
    return (
        <div className="whyUs">
            <div className="whyUsDesc">
                <h3>Why Us?</h3>
                <p className="font">
                    Mengapa harus pilih Binar Car Rental?
                </p>
            </div>
            <div className="whyUsBenefit">
                <div className="whyUsListBenefit">
                    <img src={icon4} />
                    <h4>Mobil Lengkap</h4>
                    <p className="font">
                        Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                    </p>
                </div>
                <div className="whyUsListBenefit">
                    <img src={icon3} />
                    <h4>Harga Murah</h4>
                    <p className="font">
                        Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain
                    </p>
                </div>
                <div className="whyUsListBenefit">
                    <img src={icon1} />
                    <h4>Layanan 24 Jam</h4>
                    <p className="font">
                        Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu
                    </p>
                </div>
                <div className="whyUsListBenefit">
                    <img src={icon2} />
                    <h4>Sopir Profesional</h4>
                    <p className="font">
                        Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu
                    </p>
                </div>
            </div>
        </div>
    );
}
