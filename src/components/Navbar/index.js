import { Outlet, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import AuthBar from './AuthBar';

export default function Navbar () {
    return (
        <div>
            <Nav className="p-3 navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Dashboard</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/services">Services</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/exercises">Exercises</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/templates">Templates</Link>
                    </li>
                </ul>
                </div>
                <div className="col text-end">
                    <AuthBar />
                </div>
            </Nav>
            <Outlet />
        </div>
    )
}
