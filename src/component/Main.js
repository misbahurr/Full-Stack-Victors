import * as React from 'react';
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
import { useState,useEffect } from 'react';
import { Carousel } from 'antd';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider, List, Skeleton } from 'antd';
import { Form, Input, InputNumber } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function Main () {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    };
    const contentStyleAchievments = {
        height: '250px',
        width:"90vw",
        color: '#fff',
        textAlign: 'center',
        borderRadius: '10px',
        display:'flex',
        backgroundColor: '#1976d2'
      };
    const pages = ['Home', 'About','FAQ','Achievements','Contact Us'];
    const settings = ['Login', 'Register'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [expanded, setExpanded] = useState('panel1');
    
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&::before': {
          display: 'none',
        },
      }));
      const dataList = [
        {
          title: 'Empathy shapes our interactions, fostering understanding and connection.',
        },
        {
          title: 'Our integrity defines us, unwavering and strong',
        },
        {
          title: '"Resilience is our hallmark, facing challenges head-on',
        },
        {
          title: 'Perseverance is our mantra, never backing down from a challenge.',
        },
      ];
      
      const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));
      
      const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
      }));
      

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const onFinishSubmit = (formData) => {
        console.log('Form data:', formData);
    };


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '400px',
        textAlign: 'center',
        background: '#364d79',
        objectFit:'fill'
      };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([{id:'1',content:'Hello World'}]);
    console.log(data,"jfbvkjd")

    const loadMoreData = () => {
        console.log("inbdjfbsk");
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('./static/data.json') // Adjust the path to your JSON file
            .then((res) => res.json()) // Return parsed JSON
            .then((body) => {
                console.log(body); // Log the response body
                if (Array.isArray(body)) {
                    setData([ ...body]); // Assuming "results" is the key containing the array of data in your JSON
                } else {
                    console.error("Results is not an array:", body);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error); // Log any errors
                setLoading(false);
            });
    };
    
    useEffect(() => {
        loadMoreData();
    }, []); 
    
    
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      
      /* eslint-disable no-template-curly-in-string */
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      /* eslint-enable no-template-curly-in-string */
      
      const [formData, setFormData] = useState({
        user: {
            name: '',
            email: '',
            message: ''
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            user: {
                ...formData.user,
                [name]: value
            }
        });
    };
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        
        if(formData.user.name && formData.user.email && formData.user.message && isValidEmail(formData.user.email)){
            alert('Message sent successfully. You will be contacted soon regarding your query.');
        } else {
            alert('Please fill out all fields correctly before submitting.');
        }
        
        try {
            const response = await fetch('https://victors-backend.vercel.app/mail/query-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.user.name,
                    email: formData.user.email,
                    message: formData.user.message // Assuming you have a 'message' field in your form
                })
            });
            console.log(response)
    
            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok.');
            }
    
            console.log('Mail sent successfully');
        } catch (error) {
            console.error('Error sending mail:', error.message);
        }
    };
    


    return (<>
    <div style={{backgroundColor:'#1976d2', height:'100vh'}}>
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
                    href={'#'+page}
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
        <div style={{margin:'20px 20px',marginLeft:'80px',marginTop:"60px"}} id="Home">
            <Typography variant='h3' color={'white'} style={{fontFamily:'sans-serif',fontWeight:'800'}}>BUILT UPON 3 DECADES OF</Typography>
            <Carousel autoplay dotPosition='left' style={{height:'fit-content',width:'fit-content',color:'white',marginTop:'-10px'}} dots={false} >
                <div>
                    <Typography variant='h1' style={{fontFamily:'sans-serif',fontWeight:'800',fontSize:"150px"}}>Passion</Typography>
                </div>
                <div>
                    <Typography variant='h1' style={{fontFamily:'sans-serif',fontWeight:'800',fontSize:"150px"}}>Hardwork</Typography>
                </div>
                <div>
                    <Typography variant='h1' style={{fontFamily:'sans-serif',fontWeight:'800',fontSize:"150px"}}>Excellence</Typography>
                </div>
                <div>
                    <Typography variant='h1' style={{fontFamily:'sans-serif',fontWeight:'800',fontSize:"150px"}}>Dedication</Typography>
                </div>
            </Carousel>

        </div>
        <div style={{margin:'20px 20px', position:'relative',top:'-1vh',left:'55vw',width:'600px'}}>
                <Carousel autoplay>
                <div>
                <img src='../static/banners/i1.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i2.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i3.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i4.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i5.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i6.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i7.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i8.jpg' style={contentStyle}/>
                </div>
                <div>
                <img src='../static/banners/i9.jpg' style={contentStyle}/>
                </div>
            </Carousel>
            
        </div>
        <div style={{position:'absolute',top:'50vh',left:'5vw'}}>
            <List
            itemLayout="horizontal"
            dataSource={dataList}
            renderItem={(item, index) => (
            <List.Item  style={{width:"800px",border:"0px solid",color:'white'}}>
                <List.Item.Meta
                avatar={<CheckCircleRoundedIcon style={{fontSize:'30px'}}/>}
                title={<Typography variant='h6' color={'white'}>{item.title}</Typography>}
                />
            </List.Item>
            )}
            />   
        </div>
    </div>
    <div id="About"></div>
    <div  style={{ height: '150vh', display: 'flex', justifyContent: 'center', textAlign: 'center' ,alignItems:'center',flexDirection:'column'}}>
    <div style={{width:'70vw',paddingBottom:'140px'}} >
        <Typography variant="h1" style={{color:'#1976d2',fontWeight:'900'}}>About Us</Typography>
        <hr style={{width:'70vw',marginBottom:'50px',height:'5px',backgroundColor:'#1976d2'}}/>
        <Typography variant="h6">Welcome to Victor Coaching, where we believe in empowering individuals to unleash their full potential and achieve their dreams. With a legacy spanning over 3 years, Victor Coaching has been a beacon of inspiration and transformation for countless individuals seeking to excel in their personal and professional endeavors.</Typography>
        <Typography variant="h6">At Victor Coaching, we understand that success is not just about reaching your goals; it's about surpassing them with confidence and resilience. Our team of seasoned coaches comprises industry experts, seasoned mentors, and certified professionals dedicated to guiding you every step of the way.</Typography>
        <Typography variant="h6">What sets Victor Coaching apart is our personalized approach to coaching. We recognize that every individual is unique, with their own strengths, challenges, and aspirations. That's why our coaching programs are tailored to meet your specific needs, whether you're striving for career advancement, personal growth, or overcoming obstacles.</Typography>
    </div>
    <Typography variant='h3'>Notifications</Typography>
    <div
      id="scrollableDiv"
      style={{height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)', width:'50vw',display:'flex',justifyContent:'center'}}>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div>{item.content}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </div>
    <div id="FAQ" style={{ backgroundColor: '#1976d2', height: '100vh', display: 'flex', justifyContent: 'center',alignItems:'center' }}>
    <div >
        <Typography variant="h2" style={{ color: 'white', fontWeight: '900', textAlign: 'center' }}>Frequently Asked Questions</Typography>
        <hr style={{ width: '70vw', marginBottom: '50px', height: '5px', backgroundColor: 'white' }} />
        <div style={{width:'80vw'}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>What subjects are covered in the coaching institute?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Our coaching institute covers all major subjects including Mathematics, Science, English, Social Studies, and more.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>How do I pay the coaching fees?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                You can pay the coaching fees online through our QR code provided on the website, or you can visit our centre and pay in person.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Is there any instalment facility available for fee payment?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Yes, we offer instalment facilities for paying fees. Please contact our administration office for more details.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>How can I check my attendance?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                You can check your attendance by logging into your student portal on our website. Attendance records are updated regularly.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>What is the class schedule like?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Our class schedule varies depending on the batch you are enrolled in. You can find the detailed schedule on our website or inquire at the center.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Are there any demo classes available before enrollment?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Yes, we offer demo classes for interested students. You can schedule a demo class by contacting us through the website or visiting our center.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>How can I contact my subject teachers for doubts?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                You can contact your subject teachers either through email, phone or by scheduling an appointment during their office hours.
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    </div>
    </div>
    <div id="Achievements" style={{backgroundColor: 'white', height: '150vh', display: 'flex', justifyContent: 'center',alignItems:'center',flexDirection:'column'}}>
        <div style={{marginBottom:"100px",display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Typography variant="h3" style={{color:'#1976d2',fontWeight:'500',marginBottom:'10px'}}>Reviews</Typography>
            <Carousel style={{marginLeft:"0px",width:"90vw"}} autoplay arrows={true} prevArrow={<ArrowBackIcon style={{color:"black !important"}}/>}  nextArrow={<ArrowForwardIcon/>}>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwmyuCO0GXt88ZOrEBfmRoK_QjVbr7r2HrMBmA8UBbw&s" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Mayankit | 90%</h2>
                <p style={{fontSize:"20px"}}> Victor's coaching institute provided excellent guidance and resources. The faculty was knowledgeable and supportive, and their teaching methods were highly effective. I saw a significant improvement in my performance after joining.</p>
                </div>
            </div>
            </div>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv3ZSoMVNQnP6qsxXFmRlE-7jTtJUs7chTE04Gar-5Jg&s" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Tanmay Bhatt | 94.3%</h2>
                <p style={{fontSize:"20px"}}>I had a great experience at Victor's coaching institute. The teachers were dedicated and passionate about helping students succeed. The study material provided was comprehensive, and the regular mock tests helped me gauge my progress.</p>
                </div>
            </div>
            </div>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Sunny Raja Prasad | 95%</h2>
                <p style={{fontSize:"20px"}}> Victor's coaching institute exceeded my expectations. The faculty members were experts in their respective subjects, and their personalized attention to each student's needs was commendable. I credit my high score to their guidance and support.</p>
                </div>
            </div>
            </div>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcQWx87fvsE-H0vikMbBs5_BlIECp19HcI-UjkAv7ttQ&s" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Akshay Narayan | 88%</h2>
                <p style={{fontSize:"20px"}}>I highly recommend Victor's coaching institute to anyone preparing for competitive exams. The faculty created a conducive learning environment, and their emphasis on conceptual clarity was instrumental in my success. I'm grateful for their guidance.</p>
                </div>
            </div>
            </div>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLi4MQH22cBfTah5QNtWfHkM33e5NSGbgEV9yHfBZzipKP0HA389s5lQjEzMoLIvj7Wjs&usqp=CAU" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Aryan Bharadwaj | 92%</h2>
                <p style={{fontSize:"20px"}}> Enrolling at Victor's coaching institute was one of the best decisions I made for my exam preparation. The faculty members were not only knowledgeable but also approachable, always willing to address doubts and provide extra assistance when needed.</p>
                </div>
            </div>
            </div>
            <div>
            <div style={contentStyleAchievments}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9m15jQ6cf-AX45R4UMydPF1Tq4lmgMJXw1Q&s" style={{width:"200px",height:"200px", borderRadius:"100px",marginTop:"25px",marginLeft:"25px"}}></img>
                <div style={{width:"800px",height:"250px",display:"flex",alignItems:'flex-start',flexDirection:'column',marginLeft:'20px'}}>
                <h2 style={{height:"30px"}}>Anuraag Sharma | 96%</h2>
                <p style={{fontSize:"20px"}}> Victor's coaching institute helped me build a strong foundation in the subjects I struggled with. The study materials were well-structured, and the regular assessment tests helped me track my progress effectively. I'm thankful for their guidance.</p>
                </div>
            </div>
            </div>
            
            </Carousel>
        </div>
        <Typography variant="h3" style={{color:'#1976d2',fontWeight:'500',marginBottom:'50px'}} id="Contact Us">Drop Us a Message</Typography>
        <form onSubmit={handleSubmit} style={{ width: '90vw', display: 'flex', justifyContent: 'center', border: '1px black solid', paddingTop: '100px', paddingBottom: '100px', borderRadius: '15px' }}>
            <div style={{ width: '40vw', paddingRight: '5vw' }}>
                <Form.Item label="Name" style={{marginLeft:'50px'}}>
                <Input
                    name="name"
                    value={formData.user.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    style={{ marginBottom: '10px' }}
                />
                </Form.Item>
                <Form.Item label="Email" style={{marginLeft:'50px'}}>
                <Input
                    name="email"
                    value={formData.user.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    type='email'
                    style={{ marginBottom: '10px' }}
                />
                </Form.Item>
                <Button variant="contained" type="primary" htmlType="submit" style={{ width: '25vw', marginTop: '5vh', borderRadius: '10px', fontSize: '20px',marginLeft:'50px' }}>
                    Submit
                </Button>
            </div>
            <div style={{ width: '40vw', paddingRight: '5vw' }}>
                <Form.Item label="Message">
                <Input.TextArea
                    name="message"
                    value={formData.user.introduction}
                    onChange={handleInputChange}
                    placeholder="Message"
                    style={{ height: '130px', marginBottom: '10px' }}
                />
                </Form.Item>
            </div>
        </form>
    </div>
    <footer class="footer">
  	 <div class="footer-container">
  	 	<div class="footer-row">
  	 		<div class="footer-col">
  	 			<h4>Useful Links</h4>
  	 			<ul>
  	 				<li><a href="#Home">Home</a></li>
  	 				<li><a href="#About">About</a></li>
  	 				<li><a href="#FAQ">FAQ</a></li>
  	 				<li><a href="#Achievements">Achievements</a></li>
                    <li><a href="#Contact Us">Contact Us</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Address</h4>
  	 			<p>VICTOR’S TOWER Ara-Patna Road Near Gaurakshini Flyover Sasaram, Bihar, India 821115</p>
                <p>Pavitra Bandhan Campus, Tomb Road No. 01, Sasaram, Bihar, India, 821115</p>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="https://www.facebook.com/VictorSasaram/"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="https://www.instagram.com/victor_sasaram/"><i class="fab fa-instagram"></i></a>
  	 				<a href="https://in.linkedin.com/company/victor-s-career-foundation-institute"><i class="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>

    </>)
};

export default Main;