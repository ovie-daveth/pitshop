import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "../api/context/AuthContext/AuthContext";
import UserContextProvider from "../api/context/UserContext/UserContext";
import CompanyContextProvider from "../api/context/CompanyContext/CompanyContext";
import RolesContextProvider from "../api/context/RolesContext/RolesContext";

export const metadata: Metadata = {
  title: "Pitstop App",
  description: "The Complete Pitstop Application Edge System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <AuthContextProvider>
          <UserContextProvider>
            <CompanyContextProvider>
              <RolesContextProvider>{children}</RolesContextProvider>
            </CompanyContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
