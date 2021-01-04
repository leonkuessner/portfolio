import React from 'react'
import { Link } from 'react-scroll'
import './styles/Admin.css'
import Projects from './admin-pages/Projects'
import Dashboard from './admin-pages/Dashboard'

function Admin() {
    console.log("FINALLYYYY")
    return (
        <div className="admin">
            <div className="admin__side-menu">
                <div className="admin__nav-link">
                    <Link to="admin__dashboard">Dashboard</Link>
                </div>
                <div className="admin__nav-link">
                    <Link to="admin__projects">projects</Link>
                </div>
            </div>
            <div className="admin__main-container">
                <Dashboard />
                <Projects />
            </div>
            
        </div>
    )
}

export default Admin
