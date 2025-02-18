"use client";

// components
import MainLayout from "src/layouts/main";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function BookingSuccessLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
