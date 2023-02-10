import React from 'react';
import './Footer.css';
import {IconButton, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
    return (
        <footer className="footer">
            <Typography variant="h6" align="center" gutterBottom>
                TasksMX
            </Typography>
            Made with ♥ by maxidragon
            <div>

            </div>
            <IconButton aria-label="GitHubIcon" href="https://github.com/maxidragon/TasksMX" target="_blank">
                <GitHubIcon sx={{color: "#fff"}} fontSize="large"/>
            </IconButton>
            <IconButton aria-label="MailIcon" href="mailto:contact@mgala.ml" target="_blank">
                <MailIcon sx={{color: "#fff"}} fontSize="large"/>
            </IconButton>
        </footer>
    )
}

export default Footer;