import "../css/Menu.css"; 

function Menu() {
    const menuItems = ["Home", "Edit Profile", "Categories", "AboutUs", "LogOut"]; // Avoid naming variable same as component

    return (
        <div className="menu-bg">
            <ul>
                {menuItems.map((menu) => (
                    <li key={menu}>{menu}</li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;