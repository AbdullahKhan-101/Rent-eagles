"use client";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { ProvidersNextUI } from "../providers";
import { Navbar } from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ProvidersNextUI>
              <NextTopLoader
                color="#FF0000"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                template='<div class="bar" role="bar"><div class="peg"></div></div> 
                <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                zIndex={1600}
                showAtBottom={false}
              />

              <ToastContainer position="top-center" />
              <div className="max-h-screen overflow-hidden">
                {/* <div className=""> */}
                <Navbar />
                {children}
              </div>
              {/* <Footer /> */}
            </ProvidersNextUI>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
