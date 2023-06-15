import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar'; TODO ADD AVATAR AFTER LOGIN
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip'; TODO ADD AVATAR AFTER LOGIN
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const pages = [
    {page: "Jak zacząć?", url: "/"},
    {page: "Daily", url: "/daily"},
    {page: "Zarejestruj się", url: "/registration"},
    {page: "Zaloguj się", url: "/login"},
];

// const settings = []; TODO ADD AVATAR AFTER LOGIN

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null); TODO ADD AVATAR AFTER LOGIN

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //     setAnchorElUser(event.currentTarget);
    // }; TODO ADD AVATAR AFTER LOGIN

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // }; TODO ADD AVATAR AFTER LOGIN

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MonetizationOnIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Social Media Manager
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom', horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top', horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (<MenuItem key={page.page} onClick={handleCloseNavMenu}>
                                <Link style={{textDecoration: "none"}} to={page.url}>
                                    <Typography textAlign="center">{page.page}</Typography>
                                </Link>
                            </MenuItem>))}
                        </Menu>
                    </Box>
                    <MonetizationOnIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SocialMedia
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: "flex-end"}}>
                        {pages.map((page) => (
                            <Button
                                key={page.page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link style={{color: "white", textDecoration: "none"}} to={page.url}>
                                    {page.page}
                                </Link>
                            </Button>))}
                    </Box>
                    {/* TODO ADD AVATAR AFTER LOGIN*/}
                    {/*<Box sx={{flexGrow: 0}}>*/}
                    {/*    <Tooltip title="Open settings">*/}
                    {/*        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
                    {/*            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                    {/*        </IconButton>*/}
                    {/*    </Tooltip>*/}
                    {/*    <Menu*/}
                    {/*        sx={{mt: '45px'}}*/}
                    {/*        id="menu-appbar"*/}
                    {/*        anchorEl={anchorElUser}*/}
                    {/*        anchorOrigin={{*/}
                    {/*            vertical: 'top', horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        keepMounted*/}
                    {/*        transformOrigin={{*/}
                    {/*            vertical: 'top', horizontal: 'right',*/}
                    {/*        }}*/}
                    {/*        open={Boolean(anchorElUser)}*/}
                    {/*        onClose={handleCloseUserMenu}*/}
                    {/*    >*/}
                    {/*        {settings.map((setting) => (<MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                    {/*                <Typography textAlign="center">{setting}</Typography>*/}
                    {/*            </MenuItem>))}*/}
                    {/*    </Menu>*/}
                    {/*</Box>*/}
                </Toolbar>
            </Container>
        </AppBar>);
}

export default ResponsiveAppBar;