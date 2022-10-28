import react from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ContainerBlock({ children, title }){
    return(
        <div className="gradient-bg min-h-screen text-gray-100">
            <div className="">
            <title>{title ? title + ' - SpyMedia' : 'SpyMedia'}</title>
                <Navbar />
                { children }
                <Footer />
            </div>
        </div>
    )
}