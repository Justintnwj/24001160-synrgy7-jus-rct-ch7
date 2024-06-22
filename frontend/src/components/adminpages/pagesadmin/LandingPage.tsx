import React, { useState, useEffect } from "react";
import car from "../../../assets/fi_truck.svg";
import dashboard from "../../../assets/fi_home.svg";
import burger from "../../../assets/burger.svg";
import sortImage from "../../../assets/fi_sort.svg";
import buttonANW from "../../../assets/ButtonANW.svg";
import carBeep from "../../../assets/img-BeepBeep.svg";
import buttonYa from "../../../assets/ButtonYa.svg";
import buttonNo from "../../../assets/ButtonNo.svg";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import buttonDelete from "../../../assets/ButtonDelete.svg";
import buttonEdit from "../../../assets/ButtonEdit.svg";
import clock from "../../../assets/fi_clock.svg";
import key from "../../../assets/fi_key.svg";
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
    const [dataListOrders, setDataListOrders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [buttonStatus, setButtonStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentSort, setCurrentSort] = useState<string>('');
    const [carNameDelete, setCarNameDelete] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('ascending');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const [visiblePages, setVisiblePages] = useState<number[]>([]);
    const paginationRange = 5;
    const totalPages = Math.ceil(dataListCars.length / itemsPerPage);

    const [currentSortOrder, setCurrentSortOrder] = useState<string>('');
    const [sortDirectionOrder, setSortDirectionOrder] = useState<string>('ascending');
    const [currentPageOrder, setCurrentPageOrder] = useState<number>(1);
    const itemsPerPageOrder = 10;
    const [visiblePagesOrder, setVisiblePagesOrder] = useState<number[]>([]);
    const paginationRangeOrder = 5;
    const totalPagesOrder = Math.ceil(dataListOrders.length / itemsPerPageOrder);

    useEffect(() => {
        getUser();
    }, [])
    const handleNavigate = () => {
        window.location.href = "http://localhost:5173/admindashboard/listcars/addnewcar";
    };

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
                const response = await fetch(`http://localhost:8000/api/v1/all-cars?page=${currentPage}&limit=${itemsPerPage}`, {
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
    }, [token, currentPage, itemsPerPage, dataListOrders.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/listorder?page=${currentPageOrder}&limit=${itemsPerPageOrder}`, {
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
                setDataListOrders(responseData.data);
            } catch (error: any) {
                console.error('Fetch error:', error);
                setError(error.message || 'Failed to fetch data');
            }
        };

        fetchData();
    }, [token, currentPageOrder, itemsPerPageOrder, dataListOrders.length]);
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

    useEffect(() => {
        const calculateVisiblePages = () => {
            const totalPagesToShow = Math.min(paginationRangeOrder, totalPagesOrder);
            let startPage = Math.max(1, currentPageOrder - Math.floor(totalPagesToShow / 2));
            const endPage = Math.min(totalPagesOrder, startPage + totalPagesToShow - 1);

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
            if (endPage < totalPagesOrder) {
                pages.push(-1);
                pages.push(totalPagesOrder);
            }

            setVisiblePagesOrder(pages);
        };

        calculateVisiblePages();
    }, [currentPageOrder, totalPagesOrder, paginationRangeOrder]);

    if (error) {
        return <div className="home">Error: {error}</div>;
    }

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

    const handleSortOrder = (columnName: string) => {
        const newDirection =
            currentSortOrder === columnName && sortDirectionOrder === 'ascending' ? 'descending' : 'ascending';
        setSortDirectionOrder(newDirection);

        const sortedData = [...dataListOrders].sort((a, b) => {
            if (columnName === 'email' || columnName === 'car') {
                const nameA = a[columnName].toUpperCase();
                const nameB = b[columnName].toUpperCase();
                return newDirection === 'ascending' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            } else if (columnName === 'price') {
                return newDirection === 'ascending' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
            } else if (columnName === 'startrent' || columnName === 'finishrent' || columnName === 'createdAt' || columnName === 'updatedAt') {
                return newDirection === 'ascending' ? new Date(a[columnName]).getTime() - new Date(b[columnName]).getTime() : new Date(b[columnName]).getTime() - new Date(a[columnName]).getTime();
            } else {
                return 0;
            }
        });

        setDataListOrders(sortedData);
        setCurrentSortOrder(columnName);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };
    const goToPageOrder = (page: number) => {
        setCurrentPageOrder(page);
    };

    const handleUpdateCar = async (nameCar: any) => {
        const name = nameCar;
        console.log(name);
        localStorage.setItem("careditname", name);
        window.location.href = "http://localhost:5173/admindashboard/listcars/editcar";
    }

    const handleDeleteName = async (namesCar: any) => {
        console.log(namesCar);
        const name = namesCar;
        setCarNameDelete(name);
    };

    const handleDelete = async () => {

        try {
            const response = await fetch(`http://localhost:8000/api/v1/cars/${carNameDelete}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log(`Car with ID ${carNameDelete} successfully deleted.`);
                const updatedDataList = dataListCars.filter((car) => car.name !== carNameDelete);
                setDataListCars(updatedDataList);
                window.location.reload();
            } else {
                console.error(`Failed to delete car with ID ${carNameDelete}.`);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleFilterByType = (type: string) => {
        setSelectedType(type);
        setButtonStatus(type);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCars = selectedType === 'all' ?
        dataListCars.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase())) :
        dataListCars.filter(car => car.category.toLowerCase() === selectedType && car.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="landingPage">
            <div className="navbarAdmin">
                <div className="rectangleAdminMini">
                </div>
                <div className={`navbarMenu dashboard ${showDashboard ? 'active' : ''}`} onClick={showDashboardContent}>
                    <img src={dashboard} alt="Dashboard Icon" />
                    <h3>Dashboard</h3>
                </div>
                <div className={`navbarMenu cars ${showCars ? 'active' : ''}`} onClick={showCarsContent}>
                    <img src={car} alt="Car Icon" />
                    <h3>Cars</h3>
                </div>
            </div>
            <div className="navbarDesc">
                <div className="headerAdmin">
                    <div className="rectangleAdmin">
                    </div>
                    <div className="burgerIcon">
                        <img src={burger} alt="Burger Icon" />
                    </div>
                    <form className="d-flex" role="search">
                        <input type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={searchTerm} />
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
                <div className="mainAdmin">
                    <div className="navbarFunctionDesc font">
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
                    </div>
                    <div className="navTable">
                        <ul className="breadcrumb">
                            {showDashboard && (
                                <li style={{ fontWeight: isDashboardBold ? 'bold' : 'normal' }}>Dashboard</li>
                            )}
                            {showDashboardDashboard && (
                                <li>&gt; Dashboard</li>
                            )}
                            {showCars && (
                                <li style={{ fontWeight: isCarsBold ? 'bold' : 'normal' }}>Cars</li>
                            )}
                            {showCarsListCars && (
                                <li>&gt; List Cars</li>
                            )}
                        </ul>

                        {showDashboardDashboard && (
                            <div className="titleNavTable">
                                <strong>Dashboard</strong>
                            </div>
                        )}

                        {showCarsListCars && (
                            <div className="titleNavTable">
                                <strong>List Cars</strong>
                                <button className="addNewCar" onClick={handleNavigate}>
                                    <img src={buttonANW} alt="Add New Car" />
                                </button>
                            </div>
                        )}
                        {showDashboardDashboard && (
                            <div className="listDashboard">
                                <div className="listOrdersTable">
                                    <div className="titleListOrderTable">
                                        <div className="rectangleLOT">

                                        </div>
                                        <h4 className="font"><strong>List Order</strong></h4>
                                    </div>
                                    <div className="dataCars">
                                        <table className="tableCars">
                                            <thead className="tableCarsHead font">
                                                <tr>
                                                    <th className="tableHeadNo">No</th>
                                                    <th onClick={() => handleSortOrder('email')} className="sortableHeader">
                                                        User Email
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSortOrder('car')} className="sortableHeader">
                                                        Car
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSortOrder('startrent')} className="sortableHeader">
                                                        Start Rent
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSortOrder('finishrent')} className="sortableHeader">
                                                        Finish Rent
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSortOrder('price')} className="sortableHeader">
                                                        Price
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSortOrder('status')} className="sortableHeader">
                                                        Status
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tableCarsBody font">
                                                {dataListOrders.slice((currentPageOrder - 1) * itemsPerPageOrder, currentPageOrder * itemsPerPageOrder).map((order, index) => (
                                                    <tr key={order.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{order.email}</td>
                                                        <td>{order.car}</td>
                                                        <td>{order.startrent}</td>
                                                        <td>{order.finishrent}</td>
                                                        <td>{order.price}</td>
                                                        <td>{order.status ? 'Availabale' : 'Not Available'}</td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>

                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className={`page-item ${currentPageOrder === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => goToPageOrder(currentPageOrder - 1)} disabled={currentPageOrder === 1}>&laquo;</button>
                                                </li>
                                                {visiblePagesOrder.map((page, index) => (
                                                    <React.Fragment key={index}>
                                                        {page === -1 ? (
                                                            <li className="page-item disabled">
                                                                <span className="page-link">...</span>
                                                            </li>
                                                        ) : (
                                                            <li className={`page-item ${page === currentPageOrder ? 'active' : ''}`}>
                                                                <button className="page-link" onClick={() => goToPageOrder(page)}>{page}</button>
                                                            </li>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                                <li className={`page-item ${currentPageOrder === totalPagesOrder ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => goToPageOrder(currentPageOrder + 1)} disabled={currentPageOrder === totalPagesOrder}>&raquo;</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                                <div className="listCarsTable">
                                    <div className="titleListCarsTable">
                                        <div className="rectangleLOT">

                                        </div>
                                        <h4 className="font"><strong>List Car</strong></h4>
                                    </div>
                                    <div className="dataCars">
                                        <table className="tableCars">
                                            <thead className="tableCarsHead font">
                                                <tr>
                                                    <th className="tableHeadNo">No</th>
                                                    <th onClick={() => handleSort('name')} className="sortableHeader">
                                                        Name
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('category')} className="sortableHeader">
                                                        Category
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('price')} className="sortableHeader">
                                                        Price
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('start_date')} className="sortableHeader">
                                                        Start Rent
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('end_date')} className="sortableHeader">
                                                        Finish Rent
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('createdAt')} className="sortableHeader">
                                                        Created at
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                    <th onClick={() => handleSort('updatedAt')} className="sortableHeader">
                                                        Updated at
                                                        <img src={sortImage} alt="Sort Icon" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tableCarsBody font">
                                                {dataListCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((car, index) => (
                                                    <tr key={car.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{car.name}</td>
                                                        <td>{car.category}</td>
                                                        <td>{car.price}</td>
                                                        <td>{car.start_date}</td>
                                                        <td>{car.end_date}</td>
                                                        <td>{car.createdAt}</td>
                                                        <td>{car.updatedAt}</td>
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>

                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                                                </li>
                                                {visiblePages.map((page, index) => (
                                                    <React.Fragment key={index}>
                                                        {page === -1 ? (
                                                            <li className="page-item disabled">
                                                                <span className="page-link">...</span>
                                                            </li>
                                                        ) : (
                                                            <li className={`page-item ${page === currentPage ? 'active' : ''}`}>
                                                                <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
                                                            </li>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                            </div>
                        )}

                        <div className="listCars">
                            {showCarsListCars && (
                                <>
                                    <div className="typeMobil font">
                                        <button className={`buttonTypeMobil ${buttonStatus === 'all' ? 'active' : ''}`} onClick={() => handleFilterByType('all')}>All</button>
                                        <button className={`buttonTypeMobil ${buttonStatus === 'small' ? 'active' : ''}`} onClick={() => handleFilterByType('small')}>Small</button>
                                        <button className={`buttonTypeMobil ${buttonStatus === 'medium' ? 'active' : ''}`} onClick={() => handleFilterByType('medium')}>Medium</button>
                                        <button className={`buttonTypeMobil ${buttonStatus === 'large' ? 'active' : ''}`} onClick={() => handleFilterByType('large')}>Large</button>
                                    </div>
                                    <div className="carCardTable">
                                        {filteredCars.map((car) => (
                                            <div key={car.id} className="carCard font">
                                                <div className="carUploadImage">
                                                    {car.images}
                                                </div>
                                                <div className="carName">
                                                    {car.name} / {car.category}
                                                </div>
                                                <div className="carPrice">
                                                    Rp {car.price} / hari
                                                </div>
                                                <div className="timeRentCar">
                                                    <img src={key} className="keyImage" />
                                                    <div className="startRent">
                                                        {car.start_date}
                                                    </div>
                                                    -
                                                    <div className="finishRent">
                                                        {car.end_date}
                                                    </div>
                                                </div>
                                                <div className="updatedCarTime">
                                                    <img src={clock} className="clockImage" />
                                                    {car.updatedAt}
                                                </div>
                                                <div className="deleteEditCar">
                                                    <button type="button" className="deleteCar" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleDeleteName(car.name)}>
                                                        <img src={buttonDelete} alt="Delete Icon" />
                                                    </button>

                                                    <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                        <div className="modal-dialog font">
                                                            <div className="modal-content deleteCarCard">
                                                                <img src={carBeep} className="carBeep" />
                                                                <div className="descDeleteCar">
                                                                    <h3><strong>Menghapus Data Mobil</strong></h3>
                                                                    <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</p>
                                                                </div>
                                                                <div className="buttonYaNo">
                                                                    <button type="button" className="btn btn-primary buttonYa" data-bs-dismiss="modal" onClick={handleDelete}>
                                                                        <img src={buttonYa} alt="Yes Icon" />
                                                                    </button>
                                                                    <button type="button" className="btn btn-secondary buttonNo" data-bs-dismiss="modal">
                                                                        <img src={buttonNo} alt="No Icon" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="editCar" onClick={() => handleUpdateCar(car.name)}>
                                                        <img src={buttonEdit} alt="Edit Icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
