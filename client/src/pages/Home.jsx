import { useEffect, useState } from "react";
import './home.css'
const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        fetch('./gold_medalists.json')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Erro ao carregar os dados: ', error);
            });
    }, []);

    const handleClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(
                <li key={i}>
                    <a href="!#" onClick={(event) => handleClick(event, i)} className={i === currentPage ? 'active' : ''}>
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };


    return (
        <div className="container">
            <h1 className="heading">Maiores medalhistas olimpicos ate 2020</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nomes</th>
                        <th>Anos</th>
                        <th>Medalhas</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Name}</td>
                            <td>{item.Year}</td>
                            <td>{item.Medal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">
                {renderPageNumbers()}
            </ul>
        </div>
    );
}

export default Home;
