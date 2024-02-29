"use client";

import { useState, useCallback } from "react";
// @mui
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";
// routes
import { paths } from "src/routes/paths";
// _mock
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import AccountGeneral from "../account-general";
import AccountBilling from "../account-billing";
import AccountSocialLinks from "../account-social-links";
import AccountNotifications from "../account-notifications";
import AccountChangePassword from "../account-change-password";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "general",
    label: "General",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "tickets",
    label: "My Purchased Tickets",
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
  {
    value: "changePhoneNumber",
    label: "Change Phone Number",
    icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  },
  {
    value: "changePassword",
    label: "Change Password",
    icon: <Iconify icon="solar:share-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState("general");

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <section className="user-profile-section">
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} className="user-profile--tab-item" />
          ))}
        </Tabs>

        {currentTab === "general" && <AccountGeneral />}

        {currentTab === "billing" && (
          <AccountBilling
            plans={_userPlans}
            cards={_userPayment}
            invoices={_userInvoices}
            addressBook={_userAddressBook}
          />
        )}

        {currentTab === "notifications" && <AccountNotifications />}

        {currentTab === "social" && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />}

        {currentTab === "security" && <AccountChangePassword />}
      </Container>
    </section>
  );
}
