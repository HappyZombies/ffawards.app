import { useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Autocomplete, TextField, FormControlLabel, Switch, Stack } from '@mui/material';

function buildCumulativeAll(award) {
    const weekly = award.award_data_weekly || {};
    const weeksNum = Object.keys(weekly).map(Number).sort((a, b) => a - b);
    const weeks = weeksNum.map(String);

    const teamIds = Array.from(new Set(Object.values(weekly).flatMap(w => Object.keys(w))));
    const idxOf = Object.fromEntries(teamIds.map((id, i) => [id, i]));

    const nameOf = id => {
        for (const w of weeksNum) if (weekly[w]?.[id]?.teamName) return weekly[w][id].teamName;
        return award.award_data?.[id]?.teamName || id;
    };

    const totals = Object.fromEntries(teamIds.map(id => [id, 0]));
    const series = teamIds.map(id => ({ id, label: nameOf(id), data: [] }));

    weeksNum.forEach(w => {
        teamIds.forEach(id => {
            totals[id] += weekly[w]?.[id]?.total ?? 0;
            series[idxOf[id]].data.push(+totals[id].toFixed(2));
        });
    });

    return { weeks, series, teamIds, idxOf };
}

const colorForIndex = (i, n) => `hsl(${Math.round((360 * i) / n)},70%,50%)`;

export default function LeagueCumulativeChart({ award }) {
    const { weeks, series, teamIds, idxOf } = useMemo(() => buildCumulativeAll(award), [award]);

    const last = s => s.data[s.data.length - 1] ?? 0;
    const seriesSorted = useMemo(() => [...series].sort((a, b) => last(b) - last(a)), [series]);

    const [selected, setSelected] = useState([]);
    const [onlySelected, setOnlySelected] = useState(false);

    const idByLabel = useMemo(() => Object.fromEntries(seriesSorted.map(s => [s.label, s.id])), [seriesSorted]);
    const options = useMemo(() => seriesSorted.map(s => s.label), [seriesSorted]);
    const selectedIds = useMemo(() => selected.map(l => idByLabel[l]), [selected, idByLabel]);

    const n = teamIds.length;
    const display = useMemo(() =>
        seriesSorted
            .filter(s => !onlySelected || selectedIds.length === 0 || selectedIds.includes(s.id))
            .map(s => {
                const dim = selectedIds.length > 0 && !selectedIds.includes(s.id);
                return {
                    ...s,
                    color: colorForIndex(idxOf[s.id], n), // stable color per team
                    showMark: false,
                    curve: 'linear',
                    area: false,
                    sx: dim ? { strokeOpacity: 0.25 } : undefined,
                };
            }),
        [seriesSorted, selectedIds, onlySelected, idxOf, n]
    );

    return (
        <Stack spacing={1}>
            <Autocomplete multiple size="small"
                options={options}
                value={selected}
                onChange={(_, v) => setSelected(v)}
                renderInput={p => <TextField {...p} label="Highlight teams" placeholder="Type to filter..." />}
            />
            <FormControlLabel control={<Switch checked={onlySelected} onChange={e => setOnlySelected(e.target.checked)} />}
                label="Show only selected" />
            <LineChart
                xAxis={[{ data: weeks, scaleType: 'point', label: 'Week' }]}
                series={display}
                height={360}
                margin={{ left: -5, top: 20 }}
                slotProps={{ legend: { direction: 'row', position: { vertical: 'top', horizontal: 'middle' }, itemGap: 10 } }}
            />
        </Stack>
    );
}
