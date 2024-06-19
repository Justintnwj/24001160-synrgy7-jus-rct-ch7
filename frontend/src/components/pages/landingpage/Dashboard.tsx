import React, { useState, useEffect } from "react";
import sortImage from "../../../assets/fi_sort.svg";

export default function Dashboard() {
    const token = localStorage.getItem('token');
    const [dataListCars, setDataListCars] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentSort, setCurrentSort] = useState<string>(''); // Kolom yang diurutkan saat ini
    const [sortDirection, setSortDirection] = useState<string>('ascending'); // Arah urutan: 'ascending' atau 'descending'
    const [currentPage, setCurrentPage] = useState<number>(1); // Nomor halaman saat ini
    const itemsPerPage = 1 ; // Jumlah item per halaman
    const paginationRange = 5; // Jumlah tombol halaman yang ditampilkan
    const [visiblePages, setVisiblePages] = useState<number[]>([]); // Halaman yang ditampilkan

    // Hitung total halaman berdasarkan jumlah data dan item per halaman
    const totalPages = Math.ceil(dataListCars.length / itemsPerPage);

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
    }, [token, currentPage, itemsPerPage, dataListCars.length]); // Tambahkan itemsPerPage dan dataListCars.length ke dependensi useEffect

    useEffect(() => {
        // Fungsi untuk menentukan halaman yang ditampilkan dalam pagination
        const calculateVisiblePages = () => {
            const totalPagesToShow = Math.min(paginationRange, totalPages);
            let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

            // Adjust startPage when nearing the end of the list
            if (endPage - startPage + 1 < totalPagesToShow) {
                startPage = Math.max(1, endPage - totalPagesToShow + 1);
            }

            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add '...' if not starting from the first page
            if (startPage > 1) {
                pages.unshift(-1); // Representing '...'
                pages.unshift(1);
            }

            // Add '...' if not ending at the last page
            if (endPage < totalPages) {
                pages.push(-1); // Representing '...'
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

    return (
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

            {/* Tombol navigasi halaman */}
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
    );
}
