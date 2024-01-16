import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { callAPI } from '../../domain/api';

import { Box, Typography, Button, Chip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import Navbar from '../../components/Navbar';

import classes from './style.module.scss';

const NationDetails = () => {
    const { nationName } = useParams();
    const [nationDetails, setNationDetails] = useState(null);

    useEffect(() => {
        fetchNationDetails()
    }, [])

    const fetchNationDetails = async () => {
        try {
            const response = await callAPI(`/name/${nationName}`, 'GET');

            if (Array.isArray(response) && response.length > 0) {
                const modifiedData = {
                    name: response[0].name,
                    population: response[0].population,
                    region: response[0].region,
                    subregion: response[0].subregion,
                    capital: response[0].capital,
                    tld: response[0].tld,
                    currencies: response[0].currencies,
                    languages: response[0].languages,
                    borders: response[0].borders,
                    flags: response[0].flags
                };
                setNationDetails(modifiedData);
                console.log(modifiedData);
            } else {
                console.error('Invalid response from the API');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const getCommonNativeName = (data) => {
        if (data && data.name && data.name.nativeName) {
            const languages = Object.keys(data.name.nativeName);
            const selectedLanguage = languages[0];
            return data.name.nativeName[selectedLanguage]?.common || "Loading...";
        } else {
            return "Loading...";
        }
    };

    const getCurrencyName = (data) => {
        if (data && data.name && data.name.nativeName) {
            const currencies = Object.keys(data.currencies);
            const selectedCurrency = currencies[0];
            return data.currencies[selectedCurrency]?.name || "Loading...";
        } else {
            return "Loading...";
        }
    };

    const getLanguages = (data) => {
        if (data && data.languages) {
            const languages = Object.entries(data.languages).map(([code, name]) => ({
                code,
                name
            }));
            return languages;
        } else {
            return [];
        }
    };

    if (!nationDetails) {
        return <p>Loading...</p>;
    }

    const commonNativeName = getCommonNativeName(nationDetails);
    const currencyName = getCurrencyName(nationDetails);
    const languagesArray = getLanguages(nationDetails);

    return (
        <>
            <Navbar></Navbar>
            <Box className={classes['wrapper']}>
                <Box className={classes["back-button"]}>
                    <Link to={`/`}>
                        <Button variant="contained" startIcon={<ArrowBack />}>
                            BACK
                        </Button>
                    </Link>
                </Box>
                <Box className={classes['content-box']}>
                    <Box className={classes["content-image"]}>
                        <img className={classes['flag-image']} src={nationDetails.flags.png} alt="" />
                    </Box>
                    <Box className={classes['content-details']}>
                        <Box className={classes['title-name']}>
                            <Typography variant='h5'>
                                {nationDetails.name.common}
                            </Typography>
                        </Box>
                        <Box className={classes['content-text-grid']}>
                            <Box className={classes['content-text-one']}>
                                <Typography variant='p' my={0.5}>
                                    <b>Native Name: </b> {commonNativeName}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Population: </b> {nationDetails.population}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Region: </b>{nationDetails.region}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Sub Region: </b>{nationDetails.subregion}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Capital: </b>{nationDetails.capital}
                                </Typography>
                            </Box>
                            <Box className={classes['content-text-two']}>
                                <Typography variant='p' my={0.5}>
                                    <b>Top Level Domain: </b>{nationDetails.tld.map((domain, index) => (
                                        <React.Fragment key={domain}>
                                            {domain}
                                            {index < nationDetails.tld.length - 1 && ', '}
                                        </React.Fragment>
                                    ))}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Currencies: </b>{currencyName}
                                </Typography>
                                <Typography variant='p' my={0.5}>
                                    <b>Languages: </b>{languagesArray.map((language, index) => (
                                        <React.Fragment key={language.code}>
                                            <Typography variant='p' my={0.5}>
                                                {language.name}
                                                {index < languagesArray.length - 1 && ', '}
                                            </Typography>
                                        </React.Fragment>
                                    ))}
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes['border-countries']}>
                            <Typography variant='p' my={0.5}>
                                <b>Borders: </b>
                                {nationDetails.borders ? (
                                    nationDetails.borders.map((data) => (
                                        <Chip
                                            key={data}
                                            label={data}
                                            variant="outlined"
                                            className={classes.chip}
                                        />
                                    ))
                                ) : (
                                    <>
                                        <Typography variant='p'>Country has no borders</Typography>
                                    </>
                                )}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NationDetails;
