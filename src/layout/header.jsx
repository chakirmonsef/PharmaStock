import {
    Search,
    ArrowLeftRight,
    Bell,
    User,
} from "lucide-react";

function Header(){
    return(
        <header className="header-bar">
            <div className="search-box">
                <Search/>
                <input
                type="search"
                placeholder="Rechercher médicaments, lots, SKU…"
                />
            </div>

            <button className="pharmacist-button">
                <ArrowLeftRight/>
                <span>Pharmacien</span>
            </button>

            <button className="notification-button" aria-label="Notifications">
                <Bell/>
            </button>

            <button className="profile-button">
                <div className="profile-info">
                    <span>Sarah J.</span>
                    <span>Pharmacien</span> 
                </div>
                <User/>
            </button>

        </header>

    );
}
export default Header;