import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box>
                <Typography variant="h4" gutterBottom>Privacy Policy</Typography>
                <Typography variant="body2">Effective Date: 9-21-2024</Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>1. Introduction</Typography>
                <Typography variant="body1">
                    Welcome to FFAwards.app.
                    We respect your privacy and are committed to protecting it. This Privacy Policy explains how we handle your personal information when you visit and use our website. By accessing or using our website, you agree to this Privacy Policy.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>2. Information We Collect</Typography>
                <div>
                    a. <strong>Personal Data</strong><br />
                    We may collect personal information that you provide to us directly when signing up for an account or interacting with our services. This may include:
                    <ul>
                        <li>Email address</li>
                        <li>Fantasy Football team data (e.g., leagues, leagues scores/points)</li>
                    </ul>
                </div>
                <br />
                <div>
                    b. <strong>Automatically Collected Data</strong><br />
                    When you access our site, we may automatically collect certain information about your device and usage patterns, including:
                    <ul>
                        <li>Browser type and version</li>
                        <li>Device identifiers</li>
                        <li>Pages visited on our site</li>
                    </ul>
                    Please note that the information collected here does not contain any personal data. We use the <a href='https://www.goatcounter.com/' target='_blank'>goatcounter.com</a> analytics service to collect this data.  Please review their privacy policies if you wish to learn more about how they handle your data.
                </div>
                <br />
                <div>
                    c. <strong>Cookies</strong><br />
                    We use cookies to track your session and provide a seamless experience. These cookies are HTTPS-only and are used to:
                    <ul>
                        <li>Maintain your logged-in state</li>
                        <li>Authenticate with Yahoo</li>
                        <li>Analyze website usage</li>
                    </ul>
                    You can adjust your browser settings to disable cookies; however, doing so may affect your ability to use certain features of our site.
                    In addition, any access tokens required for authentication purposes to third-party services (e.g., Yahoo) are encrypted and stored in the browser's cookie. This ensures that your access token are kept secure and private while you use our website.
                </div>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>3. Sharing Your Information</Typography>
                <div>
                    We do not sell, rent, or lease your personal data to third parties. We may share your data only in the following circumstances:
                    <ul>
                        <li><strong>Service Providers</strong>: We may share your information with third-party service providers (e.g., hosting, analytics, or email services) who assist us in providing our services.</li>
                        <li><strong>Legal Requirements</strong>: We may disclose your data if required by law, such as in response to a court order, subpoena, or legal process.</li>
                        <li><strong>Business Transfers</strong>: If we undergo a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                    </ul>
                </div>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>4. Data Retention</Typography>
                <Typography variant="body1">
                    We retain your personal information for as long as your account is active or as needed to provide you with our services. We may retain certain data to comply with legal obligations, resolve disputes, and enforce our agreements.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>5. Your Rights</Typography>
                <div>
                    Depending on your location, you may have the right to:
                    <ul>
                        <li>Access, update, or delete your personal information</li>
                        <li>Restrict the processing of your data</li>
                        <li>Object to data processing for direct marketing purposes</li>
                        <li>Withdraw consent where the processing is based on consent</li>
                    </ul>
                    To exercise these rights, please contact us at ffawards [dot] app [@] gmail [dot] com
                </div>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>6. Security</Typography>
                <Typography variant="body1">
                    We take reasonable measures to safeguard your information from unauthorized access and disclosure. However, no system can guarantee complete security. You are responsible for maintaining the confidentiality of your account credentials.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>7. Third-Party Links</Typography>
                <Typography variant="body1">
                    Our site may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of those sites. Please review their privacy policies before interacting with them.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>8. Changes to This Policy</Typography>
                <Typography variant="body1">
                    We may update this Privacy Policy from time to time. The revised policy will be posted on this page, and the "Effective Date" will be updated accordingly. We encourage you to review this page periodically.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>9. Contact Us</Typography>
                <div>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                    <ul>
                        <li><strong>Email</strong>: ffawards [dot] app [@] gmail [dot] com</li>
                    </ul>
                </div>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;
