import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProSidebarProvider>
        <Component {...pageProps} />
        <Footer />
      </ProSidebarProvider>
    </>
  );
}
