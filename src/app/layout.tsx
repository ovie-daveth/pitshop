import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "../api/context/AuthContext/AuthContext";
import UserContextProvider from "../api/context/UserContext/UserContext";
import CompanyContextProvider from "../api/context/CompanyContext/CompanyContext";
import RolesContextProvider from "../api/context/RolesContext/RolesContext";
import UserCompanyRolesContextProvider from "@/api/context/UserCompanyRolesContext/UserCompanyRolesContext";
import AdPlatformContextProvider from "@/api/context/AdPlatformContext/AdPlatformContext";
import MediaLibraryContextProvider from "@/api/context/MediaLibraryContext/MediaLibraryContext";

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
          <CompanyContextProvider>
            <UserContextProvider>
              <RolesContextProvider>
                <UserCompanyRolesContextProvider>
                  <AdPlatformContextProvider>
                    <MediaLibraryContextProvider>
                    {children}
                    </MediaLibraryContextProvider>
                  </AdPlatformContextProvider>
                </UserCompanyRolesContextProvider>
              </RolesContextProvider>
            </UserContextProvider>
          </CompanyContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}