import Headers from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutAdmin({ children }) {
    return (
        <div>
            <Headers></Headers>
            <div className="row">
                <div className="col-sm-2 border-end px-4">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-sm-10" style={{ paddingLeft: 0, fontFamily: 'signika-negative, sans-serif' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
