"use client";

import { BrowserRouter } from "react-router-dom";
import { UserAgentProvider } from "../components/providers/userAgentProvider";
import "./globals.css";
import { Layout } from "@/components/layout";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <BrowserRouter>
          <UserAgentProvider>
            <Layout>{children}</Layout>
          </UserAgentProvider>
        </BrowserRouter>
      </body>
    </html>
  );
};

export default RootLayout;

