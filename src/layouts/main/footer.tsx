import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import FooterBackground from "src/assets/frontend/images/event1.jpg";
import FooterLogo from "src/assets/frontend/images/hulyalogomain.png";
import axiosInstance from "src/utils/axios";

const socialIcons = [
  {
    iconClass: "fab fa-facebook-f",
    href: "https://www.facebook.com/profile.php?id=61555048269687&mibextid=LQQJ4d",
    target: "_blank",
  },
  { iconClass: "fab fa-google", href: "mailto:info@hulyaevents.com.au", target: "_blank" },
  {
    iconClass: "fab fa-instagram",
    href: "https://www.instagram.com/events.hulya?igshid=dDZsdWFmNmQ0b2tw&utm_source=qr",
    target: "_blank",
  },
];

const footerLinks = [
  { label: "About", href: "#0" },
  { label: "Terms Of Use", href: "#0" },
  { label: "Privacy Policy", href: "#0" },
  { label: "FAQ", href: "#0" },
  { label: "Feedback", href: "#0" },
];

const Year = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState("");

  const renderLink = (item: any, key: any) => (
    <li key={key}>
      <Link href={item.href} target={item.target || "_self"}>
        {item.label || <i className={item.iconClass}></i>}
      </Link>
    </li>
  );

  const handelSubscribe = (e: any): void => {
    const emailRegex = /\S+@\S+\.\S+/;
    e.preventDefault();
    if (!email) {
      enqueueSnackbar("Please enter an email address.", { variant: "warning" });
      return;
    }
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Please enter a valid email address.", { variant: "error" });
      return;
    }
    enqueueSnackbar("Subscribed Successfully", { variant: "success" });
    // axiosInstance
    //   .post(`/subscribe`, { email })
    //   .then((response: any) => {
    //     if (response.status === 201) {
    //       enqueueSnackbar(response?.data?.message || "You are now Subscribed ", {
    //         variant: "success",
    //       });
    //     } else {
    //       enqueueSnackbar("Error Subscribing Event", { variant: "error" });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error getting:", error);
    //     enqueueSnackbar(error?.response?.data?.message || "Error Subscribing Event", {
    //       variant: "error",
    //     });
    //   });
  };

  return (
    <footer className="footer-section">
      <div className="newslater-section padding-bottom mt-50">
        <div className="container">
          <div className="newslater-container bg_img" style={{ backgroundImage: `url(${FooterBackground.src})` }}>
            <div className="newslater-wrapper">
              <h5 className="cate">subscribe to HulyaX</h5>
              <h3 className="title">to get notify about New Events</h3>
              <form className="newslater-form">
                <input
                  type="text"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  style={{
                    fontSize: 14,
                    color: "#fff",
                  }}
                />
                <button type="submit" onClick={handelSubscribe}>
                  subscribe
                </button>
              </form>
              <p className="text-white">We respect your privacy, so we never share your info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-top">
          <div className="logo">
            <Link href="index-1.html">
              <Image width={50} src={FooterLogo} alt="Footer Image" />
            </Link>
          </div>
          <ul className="social-icons">{socialIcons.map(renderLink)}</ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-area">
            <div className="left">
              <p>
                Copyright © {Year}. <span>All Rights Reserved By </span>
                <Image width={20} src={FooterLogo} alt="Footer Image" />
              </p>
            </div>
            {/* <ul className='links'>{footerLinks.map(renderLink)}</ul> */}
            <p>
              Contact Us:
              <a href="mailto:info@hulyax.com.au">info@hulyax.com.au</a>
            </p>
            <p>
              For Business Queries:
              <a href="tel:+61411235494">+61411235494</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
