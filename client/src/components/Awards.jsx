import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import axios from 'axios';
import './Leaderboard.css';
import './Awards.css';
import { useParams, useNavigate } from 'react-router-dom';
import FileUpload from '@mui/icons-material/FileUpload';
import Snackbar from '@mui/material/Snackbar';
import {
    Box, Typography, Button, CircularProgress,
    Grid2 as Grid, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions,
    ToggleButtonGroup, ToggleButton, Select, MenuItem
} from '@mui/material';
import Error from './Error';
import LeagueCumulativeChart from './LeagueCumulativeChart';
import PlayerStatsChart from './PlayerStatsChart';

const Awards = () => {
    const [awards, setAwards] = useState(null);
    const [league, setLeague] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [creatingAwards, setCreatingAwards] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [tab, setTab] = useState('insights');                 // "insights" | "breakdown"
    const [viewMode, setViewMode] = useState('cumulative');     // "cumulative" | "weekly"
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [allWeeks, setAllWeeks] = useState([]);
    const [expanded, setExpanded] = useState(new Set());

    const [toast, setToast] = useState('');

    const navigate = useNavigate();
    const { league_key } = useParams();

    const gridRef = useRef(null);

    const exportInsightsPNG = async () => {
        const node = gridRef.current;
        if (!node) return;
        // set a solid bg so the PNG isn't transparent
        const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: '#1e1e1e' });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${(league?.name || 'league').replace(/\s+/g, '_')}-insights.png`;
        a.click();
    };

    // 1. Add a helper that builds share text
    const buildShareText = (league, awards, viewMode, selectedWeek) => {
        const TARGET_KEYS = new Set([
            "most_tds_top",
            "most_points_top",
            "most_points_bottom",
            "most_bench_points_top"
        ]);

        const grouped = new Map();

        const stripEmoji = s => s.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEF6])/g,
            ""
        ).trim();

        awards.flatMap(a => a.variants || []).forEach(variant => {
            if (!TARGET_KEYS.has(variant.key)) return;

            const weeks = Object.keys(variant.winners_weekly || {});
            const latestWeek = weeks[weeks.length - 1];
            const wk = viewMode === "weekly"
                ? (selectedWeek || latestWeek)
                : latestWeek;

            const winner = viewMode === "weekly"
                ? variant.winners_weekly?.[wk]?.[0]
                : variant.winners_season?.[0];

            if (!winner) return;

            const user = stripEmoji(winner.teamName);
            if (!grouped.has(user)) grouped.set(user, []);

            grouped.get(user).push({
                title: variant.title,
                icon: variant.copy?.icon
            });
        });

        const headerWeek = viewMode === "weekly" && selectedWeek
            ? ` — Week ${selectedWeek}`
            : " — Season So Far";

        const lines = [];
        lines.push(`${league?.name || "League"}${headerWeek}`);
        lines.push("");

        [...grouped.keys()].forEach(user => {
            lines.push(user);
            grouped.get(user).forEach(a => {
                lines.push(`${a?.icon} ${a.title}`);
            });
            lines.push("");
        });

        lines.push(
            `See more awards and details at: https://ffawards.app/s/${league?.share_id || ""}${viewMode === "weekly" ? `?w=${selectedWeek}` : ""}`
        );

        return lines.join("\n").trim();
    };


    const toggleExpanded = key =>
        setExpanded(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

    useEffect(() => {
        (async () => {
            setError(null);
            try {
                const res = await axios.get(`/api/dashboard/leagues/${league_key}/awards`);
                setAwards(res.data.awards);
                setLeague(res.data.league);
                if (res.data.awards?.length > 0) {
                    const weeks = Object.keys(res.data.awards[0]?.award_data_weekly || {});
                    setSelectedWeek(weeks[weeks.length - 1]);
                    setAllWeeks(weeks);
                }
            } catch (err) {
                if (err.response && err.response.status === 401) { navigate('/'); return; }
                setError(err); setErrorMessage(err?.response?.data?.originalError);
            } finally { setLoading(false); }
        })();
    }, [league_key, navigate]);

    const handleCreateOrRecreate = async () => {
        setCreatingAwards(true); setError(null);
        try {
            const res = await axios.post(`/api/dashboard/leagues/${league_key}/generate-awards`);
            setAwards(res.data.awards); setLeague(res.data.league);
            if (res.data.awards?.length > 0) {
                const weeks = Object.keys(res.data.awards[0]?.award_data_weekly || {});
                setSelectedWeek(weeks[weeks.length - 1]); setAllWeeks(weeks);
            }
        } catch (err) { setError(err); setErrorMessage(err?.response?.data?.originalError); }
        finally { setCreatingAwards(false); }
    };

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="80vh"><CircularProgress /></Box>;
    if (creatingAwards) return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
            <CircularProgress />
            <Typography variant="h6" mt={2}>Creating Awards, please be patient... do not leave this page.</Typography>
            <Box mt={2} maxWidth="600px"><Typography variant="p" mt={2}>
                Why does this take a while? This process takes a bit of time due to rate limits imposed by the data provider.
            </Typography></Box>
        </Box>
    );

    return (
        <Box className="leaderboard-container" p={3}>
            <Box mb={2} className="print-button">
                <Button variant="outlined" onClick={() => navigate("/dashboard")}>Back</Button>
            </Box>

            {league && <Typography variant="h4" gutterBottom textAlign="center">{league.name}</Typography>}

            {awards?.length > 0 && (
                <Box display="flex" flexDirection="column" gap={2} sx={{ mt: '1rem', mb: '1rem' }}>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <ToggleButtonGroup value={tab} exclusive onChange={(_, v) => v && setTab(v)}>
                            <ToggleButton value="insights">Insights</ToggleButton>
                            <ToggleButton value="breakdown">Breakdown</ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)}>
                            <ToggleButton value="cumulative">Cumulative</ToggleButton>
                            <ToggleButton value="weekly">Weekly</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {viewMode === 'weekly' && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        const idx = allWeeks.indexOf(selectedWeek);
                                        if (idx > 0) setSelectedWeek(allWeeks[idx - 1]);
                                    }}
                                    disabled={allWeeks.indexOf(selectedWeek) === 0}
                                >
                                    {'<'}
                                </Button>

                                <Select
                                    value={selectedWeek}
                                    onChange={e => setSelectedWeek(e.target.value)}
                                    sx={{ minWidth: 120 }}
                                >
                                    {allWeeks.map(w => <MenuItem key={w} value={w}>Week {w}</MenuItem>)}
                                </Select>

                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        const idx = allWeeks.indexOf(selectedWeek);
                                        if (idx < allWeeks.length - 1) setSelectedWeek(allWeeks[idx + 1]);
                                    }}
                                    disabled={allWeeks.indexOf(selectedWeek) === allWeeks.length - 1}
                                >
                                    {'>'}
                                </Button>
                            </Box>
                        )}
                        <Snackbar open={!!toast} autoHideDuration={2000} onClose={() => setToast('')} message={toast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
                        {tab === 'insights' && (
                            <Box display="flex" gap={1}>
                                <Button variant="outlined" onClick={exportInsightsPNG}>Export PNG</Button>
                                {league?.share_id && <Button variant="contained" color='success' onClick={() => {
                                    const txt = buildShareText(league, awards, viewMode, selectedWeek);
                                    navigator.clipboard.writeText(txt).then(() => setToast('Copied results to clipboard!'));
                                }}><FileUpload style={{ width: 18, height: 18 }} />Share Results</Button>}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}


            {!league?.is_finished && awards?.length > 0 && (
                <>
                    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                        <DialogTitle>Regenerate Awards</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">Run on Tuesday morning for freshest data.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenModal(false)}>Close</Button>
                            <Button onClick={() => { setOpenModal(false); handleCreateOrRecreate(); }} color="primary">Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Box display="flex" justifyContent="center" sx={{ mt: '1rem', mb: '1rem' }}>
                        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>Regenerate Awards for this League</Button>
                    </Box>
                </>
            )}

            {awards?.length > 0 ? (
                tab === 'insights' ? (
                    // ---------- INSIGHTS: single grid, all variants flattened ----------
                    <Box className="home-insight-grid" ref={gridRef}>
                        {awards.flatMap((award, index) =>
                            (award.variants || []).map(variant => {
                                const weeks = Object.keys(award?.award_data_weekly || {});
                                const latestWeek = weeks[weeks.length - 1];
                                const wk = viewMode === 'weekly' ? (selectedWeek || latestWeek) : latestWeek;
                                const weeklyWinner = wk && variant.winners_weekly?.[wk]?.[0];
                                if (viewMode === "weekly" && !weeklyWinner) {
                                    // weekly view but we don't have anything for this weekly award.
                                    return;
                                }
                                const seasonWinner = variant.winners_season?.[0];
                                const showWeekly = viewMode === 'weekly' && weeklyWinner;
                                const winner = showWeekly ? weeklyWinner : seasonWinner;
                                const text = (showWeekly ? variant.copy.weekly : variant.copy.season)
                                    .replace('{team_name}', winner?.teamName || '—');

                                const iconNode = (() => {
                                    const ic = variant.copy?.icon;
                                    if (!ic) return '⭐';
                                    if (typeof ic === 'string' && /^https?:\/\//i.test(ic)) {
                                        return <img src={ic} alt="" className="home-insight-icon-img" />;
                                    } else if (typeof ic === "string") {
                                        return ic;
                                    }
                                })();

                                return (
                                    <Box key={`${award.id}-${variant.key}`} className="home-insight-card">
                                        <Box className="home-insight-icon">{iconNode}</Box>
                                        <Typography className="home-insight-title">{variant.title.toUpperCase()}</Typography>
                                        <Typography className="home-insight-text">{text}</Typography>
                                        <Box className="home-insight-footer">
                                            <Typography className="home-insight-winner" title={winner?.teamName} sx={{ fontWeight: 700 }}>{winner?.teamName || '—'}</Typography>
                                            {winner?.total != null && (
                                                <Typography className="home-insight-value">{Number.isInteger(winner.total) ? winner.total : winner.total.toFixed(2)}</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                ) : (
                    // ---------- BREAKDOWN: original per-award rendering ----------
                    <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {awards.map((award, index) => {
                            const weeks = Object.keys(award?.award_data_weekly || {});
                            const latestWeek = weeks[weeks.length - 1];
                            const wk = viewMode === 'weekly' ? (selectedWeek || latestWeek) : latestWeek;

                            let sortedTeams = [];
                            if (award.award_data && viewMode === 'cumulative') {
                                sortedTeams = Object.values(award.award_data).sort((a, b) => b.total - a.total);
                            } else if (award?.award_data_weekly && viewMode === 'weekly' && wk) {
                                sortedTeams = Object.values(award?.award_data_weekly?.[wk] || {}).sort((a, b) => b.total - a.total);
                            }
                            const maxPoints = sortedTeams.length ? Math.max(...sortedTeams.map(i => i.total)) : 0;
                            const isExpanded = expanded.has(award.SK);

                            return (
                                <Grid xs={12} key={award.SK || index}>
                                    <Box className="award-section" p={2} borderRadius={2} boxShadow={2} maxWidth={560}>
                                        <Typography variant="h5" gutterBottom>{award.name}</Typography>
                                        <Typography variant="body2" gutterBottom color='grey'>{award.description}</Typography>

                                        {!!sortedTeams.length && (
                                            <Box mt={2}>
                                                {sortedTeams.map((item, idx) => (
                                                    <Box key={idx} display="flex" alignItems="center" mb={1}>
                                                        <Typography className="team-name" width="30%" noWrap>{item.teamName}</Typography>
                                                        <Box flexGrow={1} mx={1}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={(item.total > 0 && maxPoints > 0) ? (item.total / maxPoints) * 100 : 1}
                                                                sx={{
                                                                    height: 10, borderRadius: 5,
                                                                    '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main' },
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                                }}
                                                            />
                                                        </Box>
                                                        <Typography className="points">{Number.isInteger(item.total) ? item.total : item.total.toFixed(2)}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}

                                        {award?.award_data_weekly && (
                                            <Box mt={2} display="flex" justifyContent="flex-end">
                                                <Button size="small" variant="text" onClick={() => {
                                                    setExpanded(prev => {
                                                        const n = new Set(prev);
                                                        n.has(award.SK) ? n.delete(award.SK) : n.add(award.SK);
                                                        return n;
                                                    });
                                                }}>
                                                    {isExpanded ? 'Hide Breakdown' : 'Show Breakdown'}
                                                </Button>
                                            </Box>
                                        )}

                                        {isExpanded && (
                                            <Box mt={2}>
                                                <Box mb={3}>
                                                    <Typography variant="subtitle1" gutterBottom fontWeight="bold">League Cumulative Points</Typography>
                                                    <Typography variant="body2" gutterBottom color="text.secondary">
                                                        Tracks each team's cumulative points week by week across the season.
                                                    </Typography>
                                                    <LeagueCumulativeChart award={award} />
                                                </Box>
                                                {award?.player_data && (
                                                    <Box>
                                                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">Player Contribution Breakdown</Typography>
                                                        <Typography variant="body2" gutterBottom color="text.secondary">
                                                            Select a team to see how individual players contributed to their total points over time.
                                                        </Typography>
                                                        <PlayerStatsChart award={award} />
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                )
            ) : (!creatingAwards && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={handleCreateOrRecreate}>
                        Create Awards for this League
                    </Button>
                </Box>
            ))}


            {error && <Error message={errorMessage || error.message} goBackButton={false} />}
        </Box>
    );
};

export default Awards;
