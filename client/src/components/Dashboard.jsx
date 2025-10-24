import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import DefaultYahooLogo from "../assets/default_yahoo_logo.png";
import DefaultSleeperLogo from "../assets/default_sleeper_logo.png";
import DefaultESPNLogo from "../assets/default_espn_logo.svg";

const defaultLogo = (logoUrl, provider) => {
    const defaultStrategy = {
        yahoo: DefaultYahooLogo,
        sleeper: DefaultSleeperLogo,
        espn: DefaultESPNLogo
    };
    if (!logoUrl) {
        return defaultStrategy[provider];
    }
    if (provider === "yahoo") {
        return logoUrl;
    } else if (provider === "sleeper") {
        return "https://sleepercdn.com/avatars/thumbs/" + logoUrl;
    }
}

import './Dashboard.css';

const Dashboard = () => {
    // TODO: Temporary for now until the new season starts
    const currentYear = 2025;
    const [season, setSeason] = useState(currentYear);
    const [leagues, setLeagues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/dashboard/leagues?season=${season}`);
                setLeagues(response.data);
                setLoading(false);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/');
                    return;
                }
                setError(err);
            }
        };

        fetchData();
    }, [season]);

    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                gap: 2
            }}
        >
            {loading && <CircularProgress />}
            {error && <Typography color="error">Error: {error.message}</Typography>}
            {!loading && !error && (
                <>
                    {
                        // Only show the season dropdown if the user has Yahoo leagues, Sleeper is...different.
                        // TODO: This is a bit of a hack, we should probably have a better way to determine if the user has Yahoo leagues.
                        leagues && leagues?.length !== 0 && leagues[0]?.provider === "yahoo" ? (
                            <>
                                <Typography variant="h4">Use the dropdown below to select a season to view the leagues.</Typography>
                                <FormControl sx={{ minWidth: 120, mb: 2 }}>
                                    <Select
                                        value={season}
                                        onChange={handleSeasonChange}
                                    >
                                        {Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i).map((year) => (
                                            <MenuItem key={year} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Typography variant="h5">Leagues from the {season} season:</Typography>
                            </>
                        ) : <><Typography variant="h4">Select the league(s) below</Typography><br /></>
                    }
                    {leagues && leagues.map((league) => (
                        <Box key={league.league_key} className="league-item" sx={{ mb: 2 }}>
                            <img
                                src={defaultLogo(league.logo_url, league.provider)}
                                alt={league.name}
                                style={{ width: 100, height: 100, objectFit: 'contain' }}
                            />
                            <Typography variant="h6">
                                <Link to={`/dashboard/leagues/${league.league_key}/awards`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {league.name}
                                </Link>
                            </Typography>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
};

export default Dashboard;
