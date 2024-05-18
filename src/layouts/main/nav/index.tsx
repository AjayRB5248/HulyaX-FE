import Link from "next/link";
import { useState } from "react";
import { useAuth } from "src/auth/context/users/auth-context";
import UserAccountPopover from "src/layouts/_common/user-account-popover";
import { usePathname } from "src/routes/hook";
import { EVENT_CATEGORIES } from "src/sections/tour/utils";

interface SubmenuItem {
  label: string;
  href: string;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  className?: string;
  submenu?: SubmenuItem[];
}

const eventCategories = EVENT_CATEGORIES.map((eachEventCategory: any) => {
  return {
    ...eachEventCategory,
    href: "/[category]",
  };
});

const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore Events",
    href: "/events/",
    submenu: [],
  },
  // {
  //   label: 'Events',
  //   href: '',
  //   submenu: eventCategories,
  // },
  { label: "Trending Now", href: "/trending-now" },
  { label: "FAQs", href: "/faqs" },
];

interface NavbarProps {
  isToggleMenuActive: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isToggleMenuActive }) => {
  const pathname = usePathname();

  const { user } = useAuth();

  const [openMenuItems, setOpenMenuItems] = useState<number[]>([]);

  const handleMenuItemClick = (index: number) => {
    if (openMenuItems.includes(index)) {
      setOpenMenuItems((prevOpenItems) => prevOpenItems.filter((item) => item !== index));
    } else {
      setOpenMenuItems((prevOpenItems) => [...prevOpenItems, index]);
    }
  };

  return (
    <>
      <ul className={`menu ${isToggleMenuActive ? "active" : ""} `}>
        {navigationItems.map((item, index) => (
          <>
            <li
              key={index}
              className={`${item.submenu && item.submenu.length ? "menu-item-has-children" : ""} ${
                openMenuItems.includes(index) ? "open" : ""
              }`}
            >
              {item.submenu && item.submenu.length > 0 ? (
                <>
                  <a
                    href="javascript:void(0)"
                    className={`${item.href === pathname ? "active" : ""}`}
                    onClick={() => handleMenuItemClick(index)}
                  >
                    {item.label}
                  </a>

                  <ul className={`submenu ${openMenuItems.includes(index) ? "d-block" : ""}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link href={subItem.href} as={`/events/${subItem.label}`} passHref>
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={item.href} legacyBehavior>
                  <a className={`${item.href === pathname ? "active" : ""}`}>{item.label}</a>
                </Link>
              )}
            </li>
          </>
        ))}
        {!user && (
          <li className="header-button secondary-theme-btn pr-0">
            <Link href="/login-as">Join Us</Link>
          </li>
        )}
        {/* Sign Up Link */}
        <li className="header-button primary-theme-btn pr-0 d-none">
          <Link href="">
            <i className="fa fa-ticket-alt mr-2"></i>
            Buy Ticket
          </Link>
        </li>
      </ul>
      {/* {!user && (
        <ul className="menu">
          <li className="header-button secondary-theme-btn pr-0">
            <a href="/login-as">Join Us</a>
          </li>
        </ul>
      )} */}
    </>
  );
};

export default Navbar;
