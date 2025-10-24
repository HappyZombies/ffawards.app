import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { Link as LocalLink } from 'react-router-dom';
import KofiButton from 'kofi-button';

const About = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" color="secondary" gutterBottom>Support FFAwards!</Typography>

            <Box display="flex" justifyContent="center" marginTop={2}>
                <KofiButton color="#0a9396" title="Support FFAwards" kofiID="T6T7134H7O" />
            </Box>

            <Typography variant="body1" style={{ margin: "1em 0", lineHeight: 1.5 }}>
                Hey there, I'm Daniel, a software engineer primarily focused on web development. I created this web app because I enjoyed gathering these interesting and useful stats about
                our league. Gathering these stats was tedious, so I figured I'd just automate this process with this web app. I spent time making the site available for anyone to use since I figured that others would enjoy
                it too.
            </Typography>

            <Typography variant="body1" style={{ margin: "1em 0" }}>
                You can support me and the website's costs by <a href="https://ko-fi.com/ffawards" target="_blank" rel="noopener">Supporting FFAwards in Ko-Fi</a>! I am really dedicated to this site and hope to get it out of its current beta stage in the future!
            </Typography>

            <Typography variant="h5" gutterBottom>
                What's Next
            </Typography>
            <Typography variant="body1" style={{ margin: "1em 0" }}>
                This site is in its early stages, I hope to add more awards, improve the UI and add more features. I mainly hope to make it more customizable and support other fantasy sites too (ESPN, NFL, etc.)
            </Typography>


            <Typography variant="h5" gutterBottom>
                How to Reach Me
            </Typography>
            <Typography variant="body1" style={{ margin: "1em 0" }}>
                Feel free to reach out to me through any of the following platforms:
            </Typography>
            <div style={{ margin: "1em 0" }}>
                <ul>
                    <li><a href="https://github.com/HappyZombies/ffawards.app/issues" target="_blank" rel="noopener">GitHub Repo for Issue/Bug Reporting</a></li>
                    <li><a href="https://github.com/HappyZombies" target="_blank" rel="noopener">GitHub</a></li>
                    <li><a href="https://discord.gg/M9Tceh23Sy" target="_blank" rel="noopener">Discord Channel</a></li>
                    <li><a href="https://reddit.com/user/HappyZombies" target="_blank" rel="noopener">Reddit</a></li>
                    <li><a>Email: ffawards [dot] app [@] gmail [dot] com</a></li>
                </ul>
            </div>

            <Typography variant="h5" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body1" style={{ margin: "1em 0" }}>
                We value your privacy. For details on how we handle and protect your data, please visit our <LocalLink to="/privacy">Privacy Policy</LocalLink> page.
            </Typography>

            <Typography variant="h5" gutterBottom>
                Changelog
            </Typography>
            <Typography variant="body1" style={{ margin: "1em 0" }}>
                Stay updated on the latest changes and features by visiting the <LocalLink to="/changelog">Changelog</LocalLink> page.
            </Typography>
        </Container>
    );
};

export default About;
