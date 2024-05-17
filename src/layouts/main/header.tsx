import Navbar from "./nav";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "src/assets/frontend/images/hulya-events-logo.png";
import UserAccountPopover from "../_common/user-account-popover";
import { useAuth } from "src/auth/context/users/auth-context";

export default function Header() {
  const { user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isToggleMenuActive, setIsToggleMenuActive] = useState(false);

  const handleToggleMenu = () => {
    setIsToggleMenuActive(!isToggleMenuActive);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = isScrolled ? "header-section header-active" : "header-section";
  return (
    <>
      <div className={`overlay ${isToggleMenuActive ? "active" : ""}`}></div>
      <header className={headerClass}>
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link href="/">
                <Image width={200} src={Logo} alt="Logo" />
              </Link>
            </div>
            <Navbar isToggleMenuActive={isToggleMenuActive} />

            <div className="d-flex align-items-center">
              {user && <UserAccountPopover />}
              <div
                className={`header-bar ml-4 d-lg-none ${isToggleMenuActive ? "active" : ""}`}
                onClick={handleToggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
