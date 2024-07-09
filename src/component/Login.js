import React, { useState } from 'react';
import { Button, CircularProgress, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function Login() {
    const [showModal, setShowModal] = useState(false);
    const [forgotPasswordInput, setForgotPasswordInput] = useState('');
    const [loginProgress,setLoginProgress]=useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        console.log("Username:", username);
        console.log("Password:", password);
        setLoginProgress(true)

        try {
            const response = await fetch('https://victors-backend.vercel.app/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, password: password })
            });

            if (response.ok) {
                setLoginProgress(false)
                const data = await response.json();
                console.log(data.name);
                console.log(data.role);
                console.log(data.id);
                if (data.role === 'student') {
                    window.location.href = `./studentDashboard/${data.id}`;
                }
                if (data.role === 'teacher') {
                    window.location.href = `./teacherDashboard/${data.id}`;
                }
                console.log('User Logged in successfully');
            } else {
                setLoginProgress(false)
                alert('Wrong Name and password');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Something went wrong with server')
        }
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const sendPasswordMail = async(pass,email,name)=>{
        try {
            const response = await fetch('https://victors-backend.vercel.app/mail/password-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password:pass,email:email,name:name})
            });

            if (!response.ok) {
                console.log(response)
            }
            if (response.status === 200) {
                console.log('Email sended succesfully');
                alert('Email sended succesfully')
            } else {
                console.error('Something went wrong');
                alert('Something went wrong, please try again')
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            alert('Something went wrong with server')
        }
    }

    const handleForgotPasswordSubmit = async () => {
        console.log('Forgot Password Input:', forgotPasswordInput);
        try {
            const response = await fetch(`https://victors-backend.vercel.app/user/users/password/${forgotPasswordInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                
                // alert(`Password found: ${data.password}`);
                console.log(data.password, data.email, data.name,data)
                sendPasswordMail(data.password,data.email,data.name)
            } else if (response.status === 404) {
                alert('User not found');
            } else {
                throw new Error('Failed to fetch password');
            }
        } catch (error) {
            console.error('Error finding password:', error.message);
            alert('Something went wrong with server');
        }
        setShowModal(false);
    };
    

    return (
        <div className='login-signup' style={{height:"100vh"}}>
            <a href="./main" className="signup-home-button">Home</a>
            {!loginProgress && <div className="createbox">
                <form className="form" id="signin" onSubmit={handleLogin}>
                    <h1 className="form__title">Login</h1>
                    <div className="form__input-group">
                        <label ><strong>Full Name</strong></label>
                        <br/> 
                        <input type="text" className='takeinput' name="username" placeholder="Full Name"/>
                    </div>
                    <div className="form__input-group">
                        <label ><strong>Password</strong></label>
                        <br/>
                        <input type="password" className='takeinput' name="password" placeholder="Password"/>
                    </div>
                    <button className="form__button" type="submit">Login</button>
                    <div className="form__link">
                        <Button onClick={handleForgotPassword}>Forgot Name or Password</Button>
                    </div>
                    <div className="form__link">
                        <a href="./Register">Don't have an account? <br/> Create account</a>
                    </div>
                </form>
            </div>}
            {loginProgress && <CircularProgress style={{color:"white"}}/>}
            <Modal open={showModal} onClose={handleCloseModal} >
            <Box sx={style}>
                <div className="modal-content">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enter Username
                </Typography>
                    <input 
                        type="text" 
                        className='forgot-password-input' 
                        value={forgotPasswordInput} 
                        onChange={(e) => setForgotPasswordInput(e.target.value)} 
                        placeholder="Enter your username" 
                    />
                    <Button onClick={handleForgotPasswordSubmit}>Submit</Button>
                </div>
            </Box>
            </Modal>
        </div>
    );
}

export default Login;
