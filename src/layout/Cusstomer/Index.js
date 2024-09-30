import Footer from "./Footer";
import Headers from "./Header";
import Slibar from './Slibar';

export default function LayoutCustomer({ children }) {
    return (
        <div style={{ paddingLeft: 0, fontFamily: 'signika-negative, sans-serif' }}>
            <Headers/>
            <Slibar/>
            <div>

                {children}
            </div>
            <Footer/>
        </div>
    );
}