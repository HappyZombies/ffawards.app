import { useMemo, useState } from 'react';
import { Stack, Autocomplete, TextField, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

function buildStackedForTeam(teamEntry, weeksStr, topN = 5) {
    const weeks = weeksStr.map(Number);
    const players = Object.entries(teamEntry.players || {});
    const sorted = players.sort((a, b) => (b[1]?.total || 0) - (a[1]?.total || 0));
    const top = sorted.slice(0, topN);
    const rest = sorted.slice(topN);

    const series = top.map(([id, pl]) => ({
        id, label: pl.name,
        data: weeks.map(w => +(pl.weekly?.[w] || 0)),
        stack: 'total',
        area: true,
    }));

    if (rest.length) {
        series.push({
            id: '__others__',
            label: 'Others',
            data: weeks.map(w => rest.reduce((s, [, pl]) => s + (pl.weekly?.[w] || 0), 0)),
            stack: 'total',
            area: true,
        });
    }

    for (const s of series) {
        let run = 0;
        s.data = s.data.map(v => (run += v, +run.toFixed(2)));
    }
    return { weeksCat: weeks.map(String), series };
}

function getWeeksFromAward(award) {
    const wk = Object.keys(award.award_data_weekly || {}).map(Number).sort((a, b) => a - b);
    return wk.length ? wk.map(String) : ['1'];
}

function getTeams(award) {
    const pd = award.player_data || {};
    return Object.entries(pd).map(([teamKey, v]) => ({ id: teamKey, label: v.teamName }));
}

export default function PlayerStatsChart({ award, topN = 20 }) {
    const teams = useMemo(() => getTeams(award), [award]);
    const [team, setTeam] = useState(null);

    const weeks = useMemo(() => getWeeksFromAward(award), [award]);
    const teamEntry = useMemo(() => (team ? award.player_data?.[team.id] : null), [team, award]);

    const data = useMemo(() => {
        if (!teamEntry) return null;
        return buildStackedForTeam(teamEntry, weeks, topN);
    }, [teamEntry, weeks, topN]);

    return (
        <Stack spacing={1}>
            <Autocomplete
                options={teams}
                value={team}
                onChange={(_, v) => setTeam(v)}
                size="small"
                renderInput={(p) => <TextField {...p} label="Select team for player breakdown" placeholder="Start typing a team..." />}
                sx={{ maxWidth: 420 }}
            />

            {data && (
                <Box>
                    <LineChart
                        xAxis={[{ data: data.weeksCat, scaleType: 'point', label: 'Week' }]}
                        series={data.series}
                        height={320}
                        margin={{ left: -5, top: 20 }}
                        slotProps={{ legend: { direction: 'row', position: { vertical: 'top', horizontal: 'middle' }, itemGap: 10 } }}
                    />
                </Box>
            )}
        </Stack>
    );
}
