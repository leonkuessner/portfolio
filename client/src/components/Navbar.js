import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [showNav, setShowNav] = useState(false)

    const handleNavLink = () => setShowNav(!showNav)
    const closeMenu = () => setShowNav(false)
    

    return (
            <div className="navbar">
                <div className="navbar-container">
                    <ul className={showNav ? "nav-links-active" : "nav-links"}>
                        <Link className="nav-link" to='home' smooth={true} onClick={closeMenu}>
                            Home
                        </Link>
                        <Link className="nav-link" to='aboutMe__container' smooth={true} onClick={closeMenu}>
                            About Me
                        </Link>
                        <Link className="nav-link" to='projects'smooth={true} onClick={closeMenu}>
                            Projects
                        </Link>
                        <Link className="nav-link" to='contact' smooth={true} onClick={closeMenu}>
                            Contact
                        </Link>
                    </ul>
                    <div className="menu-icon" onClick={handleNavLink}>
                        {showNav ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>
    )
}

export default Navbar

