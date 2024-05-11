import { m } from "framer-motion";
// @mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// hooks
// components
import Link from "next/link";
import { MotionViewport, varFade } from "src/components/animate";
import Image from "src/components/image";
import TextMaxLine from "src/components/text-max-line";

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: "User",
    icon: "/assets/icons/faqs/ic_account.svg",
    href: "/auth/user/login",
    targetBlank: false,
  },
  {
    label: "Company",
    icon: "/assets/icons/faqs/ic_company.svg",
    href: "/auth/company/login",
    targetBlank: true,
  },
];

// ----------------------------------------------------------------------

export default function LoginUserType() {
  return (
    <Box
      component={MotionViewport}
      gap={3}
      display="grid"
      gridTemplateColumns={{
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      className="login-as-card"
    >
      {CATEGORIES.map((category) => (
        <Link href={category.href} target={category.targetBlank ? "_blank" : ""}>
          <m.div key={category.label} variants={varFade().in}>
            <CardDesktop category={category} />
          </m.div>
        </Link>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type CardDesktopProps = {
  category: {
    label: string;
    icon: string;
  };
};

function CardDesktop({ category }: CardDesktopProps) {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 6,
        borderRadius: 2,
        bgcolor: "unset",
        cursor: "pointer",
        textAlign: "center",
        "&:hover": {
          bgcolor: "background.paper",
          boxShadow: (theme) => theme.customShadows.z20,
        },
        borderColor: "rgb(64 70 75 / 16%)",
      }}
    >
      <Image disabledEffect alt={icon} src={icon} sx={{ mb: 2, width: 200, height: 200, mx: "auto" }} />

      <TextMaxLine variant="h2" persistent sx={{ color: "primary.main", height: "auto" }}>
        {label}
      </TextMaxLine>
    </Paper>
  );
}
