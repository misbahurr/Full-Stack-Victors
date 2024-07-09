import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Image } from 'antd';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ButtonGroup,Button } from '@mui/material';
import { useState } from 'react';


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Gallery() {
  
  const pages = ['Home', 'About','FAQ','Achievements','Contact Us'];
  const settings = ['Login', 'Register'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [expanded, setExpanded] = useState('panel1');
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div style={{width:"100vw",height:"130vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",backgroundColor:"#1976d2"}}>
    <AppBar position="fixed" style={{boxShadow:'none',position:'fixed'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <img src="../../static/logo.jpeg" id="logo" alt="logo" />
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , justifyContent:'center'}}>
                {pages.map((page) => (
                <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                    href={'./'+page}
                >
                    {page}
                </Button>
                ))}
                <Button
                    key='Gallery'
                    sx={{ my: 2, color: 'white', display: 'flex' }}
                    href='./Gallery'
                >
                    Gallery
                </Button>
                
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><a href={setting}>{setting}</a></Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    <div style={{marginTop:"0", display:"flex",flexDirection:"column",alignItems:"center"}}>
    <Typography variant='h3' color={"white"}> Gallery</Typography>
    <ImageList
      sx={{ width: "90vw", height: "90vh" }}
      variant="quilted"
      cols={3}
      rowHeight={251}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Image
            {...srcset(item.img, 201, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
    </div>
  );
}

const itemData = [
  {
    img: './static/images_gallery/s1.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: './static/images_gallery/s2.jpg',
    title: 'Burger',
  },
  {
    img: './static/images_gallery/s3.jpg',
    title: 'Camera',
  },
  {
    img: './static/images_gallery/s4.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: './static/images_gallery/s5.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: './static/images_gallery/s6.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: './static/images_gallery/s7.jpg',
    title: 'Basketball',
  },
  {
    img: './static/images_gallery/s8.jpg',
    title: 'Fern',
  },
  {
    img: './static/images_gallery/s9.jpg',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: './static/images_gallery/s10.jpg',
    title: 'Tomato basil',
  },
  {
    img: './static/images_gallery/s11.jpg',
    title: 'Sea star',
  },
  {
    img: './static/images_gallery/s12.jpg',
    title: 'Bike',
    cols: 2,
  },{
    img: './static/images_gallery/s13.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: './static/images_gallery/s14.jpg',
    title: 'Burger',
  },
  {
    img: './static/images_gallery/s15.jpg',
    title: 'Camera',
  },
  {
    img: './static/images_gallery/s16.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: './static/images_gallery/s17.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: './static/images_gallery/s18.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: './static/images_gallery/s19.jpg',
    title: 'Basketball',
  },
  {
    img: './static/images_gallery/s20.jpg',
    title: 'Fern',
  },
  {
    img: './static/images_gallery/s21.jpg',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  }
];


// 7983655739    