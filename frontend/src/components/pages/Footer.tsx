import React from "react";
import imageFb from "../../assets/icon_facebook.svg";
import imageIg from "../../assets/icon_instagram.svg";
import imageMail from "../../assets/icon_mail.svg";
import imageTw from "../../assets/icon_twitch.svg";
import imageTwit from "../../assets/icon_twitter.svg";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="contactUs font">
          <p>Jalan Suroyo No. 161 Mayangan Kota Probalonggo 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081-233-334-808</p>
        </div>
        <div className="navbarFooter">
          <div className="navbarFooterPart font"><a href="domain.tld/home">Our Services</a></div>
          <div className="navbarFooterPart font"><a href="domain.tld/home">Why Us</a></div>
          <div className="navbarFooterPart font"><a href="domain.tld/home">Testimonial</a></div>
          <div className="navbarFooterPart font"><a href="domain.tld/blog">FAQ</a></div>
        </div>
        <div className="socialMedia">
          <div className="connectWith font">Connect with us</div>
          <div className="socialMediaPart">
            <a href="twitter.com/author"><img src={imageFb} /></a>
            <a href="twitter.com/author"><img src={imageIg} /></a>
            <a href="twitter.com/author"><img src={imageTwit} /></a>
            <a href="twitter.com/author"><img src={imageMail} /></a>
            <a href="twitter.com/author"><img src={imageTw} /></a>
          </div>
        </div>
        <div className="copyright font">
          <h2>Copyright Binar 2022</h2>
          <div className="rectangle">
          </div>
        </div>
      </div>
    </>
  );
}
