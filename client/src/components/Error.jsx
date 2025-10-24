import { Box, Container, Typography } from '@mui/material';
import React from 'react';

function Error({ message = 'Sorry, something went wrong. Please try again later.', goBackButton = true }) {

    return (
        <Container maxWidth="xs">
            <Typography color="error" variant='h5' style={{ margin: '1em 0' }}>Oops, an Error Occurred 😔</Typography>
            {message && <Typography color="error" variant='h6' style={{ margin: '1em 0' }}>{message}</Typography>}
            <Typography color="error" variant='h6' style={{ margin: '1em 0' }}>
                If the issue persists, you can reach out for support by:</Typography>

            <ul>
                <li>
                    <Typography color="error" variant='h6' style={{ margin: '1em 0' }}>
                        <a href="https://github.com/HappyZombies/ffawards.app/issues" target="_blank" rel="noopener noreferrer">
                            Creating an issue on GitHub
                        </a>
                    </Typography>
                </li>
                <li>
                    <Typography color="error" variant='h6' style={{ margin: '1em 0' }}>Joining our <a href='https://discord.gg/M9Tceh23Sy' target='_blank' rel="noopener">Discord</a></Typography>
                </li>
                <li>
                    <Typography color="error" variant='h6' style={{ margin: '1em 0' }}>E-Mail: ffawards [dot] app [@] gmail [dot] com</Typography>
                </li>
            </ul>
            {goBackButton ? <h2><a href={`/dashboard`} style={{ margin: '1em 0' }}>Go Back Home</a></h2> : null}
        </Container>
    );
}

export default Error;
