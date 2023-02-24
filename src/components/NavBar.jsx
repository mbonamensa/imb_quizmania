import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
// import { logo } from "./"


function NavBar(props) {
    return (
        <div className="navbar">
            <div className="logo">
                <img src="../logo-img.png" alt="light bulb"/>
                <p>Quizmania</p>
            </div>
            <button className="theme-icon-container" onClick={props.toggleTheme}><p>Toggle theme</p>{props.darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}</button>
        </div>
    )
}

export default NavBar
