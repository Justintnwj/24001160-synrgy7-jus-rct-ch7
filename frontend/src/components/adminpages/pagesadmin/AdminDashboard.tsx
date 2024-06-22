import React, { useState, useEffect } from "react";
import car from "../../../assets/fi_truck.svg";
import dashboard from "../../../assets/fi_home.svg";
import burger from "../../../assets/burger.svg";
import sortImage from "../../../assets/fi_sort.svg";
import { useNavigate } from "react-router-dom";
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
    const [showDashboardDashboard, setShowDashboardDashboard] = useState(false);
    const [showCarsListCars, setShowCarsListCars] = useState(false);
    const [isDashboardBold, setIsDashboardBold] = useState(false);
    const [isCarsBold, setIsCarsBold] = useState(false);
    const [dataListCars, setDataListCars] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentSort, setCurrentSort] = useState<string>(''); // Kolom yang diurutkan saat ini
    const [sortDirection, setSortDirection] = useState<string>('ascending'); // Arah urutan: 'ascending' atau 'descending'
    const [currentPage, setCurrentPage] = useState<number>(1); // Nomor halaman saat ini
    const itemsPerPage = 1;
    const [visiblePages, setVisiblePages] = useState<number[]>([]); // Halaman yang ditampilkan
    const paginationRange = 5; // Jumlah tombol halaman yang ditampilkan
    // Hitung total halaman berdasarkan jumlah data dan item per halaman
    const totalPages = Math.ceil(dataListCars.length / itemsPerPage);

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
        setShowDashboardDashboard(false);
        setIsDashboardBold(false);
        setIsCarsBold(false);
        setShowCarsListCars(false);
    }

    const showCarsContent = () => {
        setShowDashboard(false);
        setShowCars(true);
        setShowCarsListCars(false);
        setIsDashboardBold(false);
        setIsCarsBold(false);
        setShowDashboardDashboard(false);
    }

    const showDbBc = () => {
        setShowDashboardDashboard(true);
        setIsDashboardBold(true);
    }

    const showListCarsBc = () => {
        setShowCarsListCars(true);
        setIsCarsBold(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/cars?page=${currentPage}&limit=${itemsPerPage}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                setDataListCars(responseData.data);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setError(error.message || 'Failed to fetch data');
            }
        };

        fetchData();
    }, [token, currentPage, itemsPerPage, dataListCars.length]); 
    useEffect(() => {
        const calculateVisiblePages = () => {
            const totalPagesToShow = Math.min(paginationRange, totalPages);
            let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

            if (endPage - startPage + 1 < totalPagesToShow) {
                startPage = Math.max(1, endPage - totalPagesToShow + 1);
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (startPage > 1) {
                pages.unshift(-1); 
                pages.unshift(1);
            }
            if (endPage < totalPages) {
                pages.push(-1); 
                pages.push(totalPages);
            }

            setVisiblePages(pages);
        };

        calculateVisiblePages();
    }, [currentPage, totalPages, paginationRange]);

    if (error) {
        return <div className="home">Error: {error}</div>;
    }

    // Fungsi untuk mengubah urutan data berdasarkan kolom dan arah urutan
    const handleSort = (columnName: string) => {
        const newDirection =
            currentSort === columnName && sortDirection === 'ascending' ? 'descending' : 'ascending';
        setSortDirection(newDirection);

        const sortedData = [...dataListCars].sort((a, b) => {
            if (columnName === 'name' || columnName === 'category') {
                const nameA = a[columnName].toUpperCase();
                const nameB = b[columnName].toUpperCase();
                return newDirection === 'ascending' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else if (columnName === 'price') {
                return newDirection === 'ascending' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
            } else if (columnName === 'start_date' || columnName === 'end_date' || columnName === 'createdAt' || columnName === 'updatedAt') {
                return newDirection === 'ascending' ? new Date(a[columnName]).getTime() - new Date(b[columnName]).getTime() : new Date(b[columnName]).getTime() - new Date(a[columnName]).getTime();
            } else {
                return 0;
            }
        });

        setDataListCars(sortedData);
        setCurrentSort(columnName);
    };

    // Fungsi untuk mengubah halaman
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (<>
                        {showDashboard && (
                            <>
                                <div className="navbarContentTitle">
                                    DASHBOARD
                                </div>
                                <div className={`navbarContent ${showDashboardDashboard ? 'activeBc' : ''}`} onClick={showDbBc}>
                                    Dashboard
                                </div>
                            </>
                        )}
                        {showCars && (
                            <>
                                <div className="navbarContentTitle">
                                    CARS
                                </div>
                                <div className={`navbarContent ${showCarsListCars ? 'activeBc' : ''}`} onClick={showListCarsBc}>
                                    List Cars
                                </div>
                            </>
                        )}
</>
    );
}
