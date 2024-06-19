import React, { useState, useEffect } from "react";
import car from "../../../assets/fi_truck.svg";
import dashboard from "../../../assets/fi_home.svg";
import burger from "../../../assets/burger.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function LandingPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<any>({ name: '' });
    const [showDashboard, setShowDashboard] = useState(true);
    const [showCars, setShowCars] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/adminlogin");
    };

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/whoami", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Authorization failed");
            }
            const data = await response.json();
            setUser(data);

            if (data.role === "user") {
                navigate("/unauthorized");
            }
        }
        catch (error) {
            console.log(error);
            navigate("/adminlogin");
        }
    }

    const showDashboardContent = () => {
        setShowDashboard(true);
        setShowCars(false);
    }

    const showCarsContent = () => {
        setShowDashboard(false);
        setShowCars(true);
    }

    return (<>
        <div className="landingPage">
            <div className="navbarAdmin">
                <div className="rectangleAdminMini">
                </div>
                <MenuItem className={`navbarMenu dashboard ${showDashboard ? 'active' : ''}`} onClick={showDashboardContent}
                key='Home' component={Link} to ='/admindashboardtesting2'>
                    <img src={dashboard} alt="Dashboard Icon" />
                    <h3>Dashboard</h3>
                </MenuItem>
                <div className={`navbarMenu cars ${showCars ? 'active' : ''}`} onClick={showCarsContent}>
                    <img src={car} alt="Car Icon" />
                    <h3>Cars</h3>
                </div>
            </div>
            <div className="headerAdmin">
                <div className="rectangleAdmin">
                </div>
                <div className="burgerIcon">
                    <img src={burger} alt="Burger Icon" />
                </div>
                <form className="d-flex" role="search">
                    <input type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className="currentUser">
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key='Logout' onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <div className="userName font">
                        {user.name}
                    </div>
                </div>
            </div>
        </div>
        <Outlet></Outlet>
        </>)
}