import React from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Divider } from '@mui/material';

const changelogData = [
    {
        version: '0.1.0',
        date: '2024-09-21',
        changes: [
            'Initial release of FFAwards',
            'Implemented basic award generation for Yahoo leagues.',
        ],
    },
    {
        version: '0.2.0',
        date: '2024-10-13',
        changes: [
            'Migrated backend database.'
        ],
    },
    {
        version: '0.3.0',
        date: '2024-11-19',
        changes: [
            'Officially move to beta.',
            'Added support for Sleeper Leagues.',
            'Added weekly award view.',
            'UI improvements/changes.',
            'Added a few more awards.',
        ],
    },
    {
        version: '0.3.1',
        date: '2024-12-1',
        changes: [
            'Add two new awards to Sleeper leagues (these awards were already available for Yahoo leagues).'
        ],
    },
    {
        version: '0.4.0',
        date: '2025-9-8',
        changes: [
            'Add private and public league support for ESPN.'
        ],
    },
    {
        version: '0.5.0',
        date: '2025-9-21',
        changes: [
            'Add award "breakdown" that shows a line graph for each awards.'
        ],
    },
    {
        version: '0.6.0-beta',
        date: '2025-11-25',
        changes: [
            'Add four new awards for Yahoo leagues: Goose Egg Collector (Most Zero Points or Below), Interception King, Fumble Lost, Waiver Wire Warrior.',
            'Added new Insight view.',
            'Added new export to image button.',
            'Small improvements to week view navigation.',
            'Added Share Results Copy & Paste Text',
            'Added Public Share Link Page',
        ],
    },
];

const Changelog = () => {
    return (
        <Container sx={{ py: 5, maxWidth: 'md' }}>
            <Typography variant="h3" color='secondary' gutterBottom>
                Changelog
            </Typography>
            <Typography variant="body1" gutterBottom>
                Here you can find the latest updates, bug fixes, and improvements made to the FFAwards application.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Please note that whenever new releases are done, the database for the application may be reset. This means that any awards you have created may be lost. You can simply login and re-create them though.
                This may cause temporary logout issues as this application is still in beta and in constant change; thank you for understanding!
            </Typography>
            <List>
                {changelogData.map((entry, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                        <ListItem>
                            <ListItemText
                                primary={`Version ${entry.version} - ${entry.date}`}
                                primaryTypographyProps={{ variant: 'h6' }}
                            />
                        </ListItem>
                        <List sx={{ pl: 4 }}>
                            {entry.changes.map((change, i) => (
                                <ListItem key={i}>
                                    <ListItemText primary={`- ${change}`} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                )).reverse()}
            </List>
        </Container>
    );
};

export default Changelog;
