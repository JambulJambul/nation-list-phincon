import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { callAPI } from '../../domain/api';

import Navbar from '../../components/Navbar';
import SearchBar from './components/SearchBar';
import NationCard from './components/NationCard';

import { Box, Typography, Select, MenuItem } from '@mui/material';

import classes from './style.module.scss';

const Homepage = () => {
    const [data, setData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await callAPI('/all', 'GET');
            const modifiedData = response?.map((item) => ({
                name: item.name,
                capital: item.capital,
                region: item.region,
                population: item.population,
                flags: item.flags,
            }));
            setData(modifiedData);
            console.log(modifiedData);
        } catch (error) {
            console.log(error);
        }
    };

    let dataIsEmpty = false;
    if (data != null) {
        dataIsEmpty = true;
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const filteredData = data?.filter(
        (item) =>
            item.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedRegion === '' || item.region.toLowerCase() === selectedRegion.toLowerCase())
    );

    const regions = [...new Set(data?.map((item) => item.region.toLowerCase()))];

    return (
        <>
            <Navbar></Navbar>
            <Box className={classes['wrapper']}>
                <Box className={classes['filter-box']}>
                    <SearchBar className={classes['search-bar']} onSearch={handleSearch}></SearchBar>
                    <br />
                    <Select value={selectedRegion} onChange={handleRegionChange}>
                        {regions.map((region) => (
                            <MenuItem key={region} value={region}>
                                {region.charAt(0).toUpperCase() + region.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                {dataIsEmpty ? (
                    <>
                        <Box className={classes['card-wrapper']}>
                            {filteredData?.map((item) => (
                                <Link
                                    to={`/nation/${item.name.common}`}
                                    key={item.name.common}
                                >
                                    <NationCard data={item} />
                                </Link>
                            ))}
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Loading...</Typography>
                    </>
                )}
            </Box>
        </>
    );
};

export default Homepage;
