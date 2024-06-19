import React from "react";
import rate from "../../../assets/Rate.svg"
import photo from "../../../assets/photo.svg"

export default function Testimony() {
  return (
    <div className="testimonial">
            <div className="testimonialDesc">
                <h3>Testimonial</h3>
                <p className="font">
                    Berbagai review positif dari para pelanggan kami
                </p>
            </div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <div className="profilePicture">
                            <img src={photo} className="gambar" alt="." />
                        </div>
                        <div className="carouselDesc">
                            <div className="profileRate">
                                <img src={rate} />
                            </div>
                            <p className="font"> Lorem ipsum dolor sit amet,
                                consectetur adipisicing
                                elit. Illum dolores aliquam officiis aspernatur deleniti temporibus in.
                            </p>
                            <h3><strong>John Des 32,Bromo</strong>
                            </h3>
                        </div>
                    </div>



                    <div className="carousel-item">
                        <div className="profilePicture">
                            <img src={photo} className="gambar" alt="." />
                        </div>
                        <div className="carouselDesc">
                            <div className="profileRate">
                                <img src={rate} />
                            </div>
                            <p className="font"> ipsum dolor sit amet,
                                consectetur adipisicing
                                elit. Illum dolores aliquam officiis aspernatur deleniti temporibus in.
                            </p>
                            <h3><strong>John Des 33,Bromo</strong>
                            </h3>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="profilePicture">
                            <img src={photo} className="gambar" alt="." />
                        </div>
                        <div className="carouselDesc">
                            <div className="profileRate">
                                <img src={rate} />
                            </div>
                            <p className="font"> ipsum dolor sit amet,
                                consectetur adipisicing
                                elit. Illum dolores aliquam officiis aspernatur deleniti temporibus in.
                            </p>
                            <h3><strong>John Des 34,Bromo</strong>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="leftButton">
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true">
                    </span>
                    <span className="visually-hidden">Previous</span>
                </button>
                </div>
                <div className="rightButton">
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true">
                    </span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </div>
  );
}
