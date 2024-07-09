import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function generateRandomId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000)
}

  
function SignUp() {
    // const schema = zod
    // .object({
    //     name: zod.string().regex(/^[a-zA-Z]+$/),
    //     password: zod.string().max(9),
    //     id: zod.string(),
    //     role: {
    //     type: String,
    //     enum: ["student", "teacher", "director"],
    //     },
    // })
    // .superRefine(({ password }, checkPassComplexity) => {
    //     const containsUppercase = (ch) => /[A-Z]/.test(ch);
    //     const containsLowercase = (ch) => /[a-z]/.test(ch);

    //     let countOfUpperCase = 0,
    //     countOfLowerCase = 0,
    //     countOfNumbers = 0;

    //     for (let i = 0; i < password.length; i++) {
    //     let ch = password.charAt(i);
    //     if (!isNaN(+ch)) countOfNumbers++;
    //     else if (containsUppercase(ch)) countOfUpperCase++;
    //     else if (containsLowercase(ch)) countOfLowerCase++;
    //     }

    //     if (countOfLowerCase < 1 || countOfUpperCase < 1 || countOfNumbers < 1) {
    //     checkPassComplexity.addIssue({
    //         message: "password does not meet complexity requirements",
    //     });
    //     }
    // });

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
    const [errors, setErrors] = useState({});
    const [currOTP,setCurrOTP]=useState(0);
    const [otpError,setOTPError]=useState();
    const [open, setOpen] = React.useState(false);
    const [singupData,setSignupData]=useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sendOTPMail=async(otp,email)=>{
        try {
            const response = await fetch('https://victors-backend.vercel.app/mail/otp-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({otp:otp,email:email})
            });

            if (!response.ok) {
                console.log(response)
            }
            if (response.status === 200) {
                console.log('OTP sended succesfully');
                alert('OTP sended succesfully on your email')
            } else {
                console.error('Something went wrong');
                console.log(response.status, response.message)
                alert('Something went wrong, with mailing sevice please try again')
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            // alert('Something went wrong with server')
        }
    }

    const checkOTP=async (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);

        // Input validations
        const otp = formData.get('otp');
        console.log(typeof(otp),currOTP)
        if(parseInt(otp)===currOTP){
            console.log("signup successful")
            try {
                // alert("Please Wait for Some Time.....")
                const response = await fetch('https://victors-backend.vercel.app/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(singupData)
                });
    
                if (!response.ok) {
                    console.log(response)
                }
                console.log(response)
                if (response.status === 201) {
                    console.log('User registered successfully');
                    window.location.href = './Login';
                } else if(response.status===401){
                    alert("Email already registered. Try with other email")
                }else if(response.status===402){
                    alert("Username already exsist. Try with other username")
                }else {
                    console.error('Something went wrong',response);
                    alert(response.status)
                }
            } catch (error) {
                console.error('Error registering user:', error.message);
                alert('Something went wrong with server')
            }
            setOTPError()
        }else{
            setOTPError("Incorrect OTP")
            alert('Incorrect OTP')
        }
    }
    

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const username = formData.get('Username');
        const email = formData.get('Email');
        const firstName = formData.get('firstname');
        const lastName = formData.get('lastname');
        const selectedClass = formData.get('class');
        const password = formData.get('password');
        const reEnteredPassword = formData.get('Re-enter_password');
        const mobileNumber = formData.get('mobile');
        const selectedRole= formData.get('role')

        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!selectedClass) {
            newErrors.selectedClass = 'Class is required';
        }
        if (!selectedRole) {
            newErrors.selectedRole = 'Role is required';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (password !== reEnteredPassword) {
            newErrors.reEnteredPassword = 'Passwords do not match';
        }

        if (!mobileNumber) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!isValidMobileNumber(mobileNumber)) {
            newErrors.mobile = 'Invalid mobile number format';
        }

        if (Object.keys(newErrors).length === 0) {
            handleOpen();
            setSignupData({
                username: username,
                email: email,
                name: firstName + ' ' + lastName,
                class: formData.get('class'),
                mobile: mobileNumber,
                password: password,
                "id": generateRandomId(),
                role: selectedRole,
              });
            var otpp=generateOTP();
            setCurrOTP(otpp)
            sendOTPMail(otpp,email)
            
            console.log('Form submitted successfully');
        } else {
            setErrors(newErrors);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidMobileNumber = (mobileNumber) => {
        return /^\d{10}$/.test(mobileNumber);
    };

    return (
        <div className="login-signup">
        <a href="./main" className="signup-home-button">Home</a>
            <div className="createbox" >
                <form className="form" id="signup" onSubmit={handleSubmit}>

                    <h1 className="form__title">Create your account</h1>

                    <div className="form__input-group">
                        <label><strong>Username</strong></label>
                        <br/>
                        <input className="takeinput" type="text" name="Username" placeholder="Username"/>
                        {errors.username && <span className="form__message">{errors.username}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Email</strong></label>
                        <br/>
                        <input className="takeinput" type="text" name="Email" placeholder="Email"/>
                        {errors.email && <span className="form__message">{errors.email}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>First name</strong></label>
                        <br/>
                        <input className="takeinput" type="text" name="firstname" placeholder="First name"/>
                        {errors.firstName && <span className="form__message">{errors.firstName}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Last name</strong></label>
                        <br/>
                        <input className="takeinput" type="text" name="lastname" placeholder="Last name"/>
                        {errors.lastName && <span className="form__message">{errors.lastName}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Class</strong></label>
                        <br/>
                        <select className="takeinput" name="class" placeholder="Class" style={{width:'85%',marginLeft:"20px"}}>
                            <option value="">Select Class</option>
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                        </select>
                        {errors.selectedClass && <span className="form__message">{errors.selectedClass}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Role</strong></label>
                        <br/>
                        <select className="takeinput" name="role" placeholder="Role" style={{width:'85%',marginLeft:"20px"}}>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        {errors.selectedRole && <span className="form__message">{errors.selectedRole}</span>}
                    </div>      
                    <div className="form__input-group">
                        <label><strong>Password</strong></label>
                        <br/>
                        <input className="takeinput" type="password" name="password" placeholder="Enter Password"/>
                        {errors.password && <span className="form__message">{errors.password}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Re-Enter password</strong></label>
                        <br/>
                        <input className="takeinput" type="password" name="Re-enter_password" placeholder="Re-enter Password"/>
                        {errors.reEnteredPassword && <span className="form__message">{errors.reEnteredPassword}</span>}
                    </div>
                    <div className="form__input-group">
                        <label><strong>Mobile Number</strong></label>
                        <br/>
                        <input className="takeinput" type="text" name="mobile" placeholder="Enter mobile number"/>
                        {errors.mobile && <span className="form__message">{errors.mobile}</span>}
                    </div>
                    <button className="form__button" type="submit">Create</button>
                    <div className="form__link">
                        <a href="./Login">Already had an account? <br/>sign in</a>
                    </div>
                </form>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <form onSubmit={checkOTP}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter OTP
                    </Typography>
                    <input className="takeinput" type="text" name="otp" placeholder="Enter OTP"/>
                        {otpError && <span className="form__message">{otpError}</span>}
                        <button className="form__button" type="submit" style={{marginTop:"30px"}}>Verify</button>
                    </form>    
                    </Box>
                    
                </Modal>
            </div>
        </div>
    );
}

export default SignUp;




// faqs = {
//     "1. What subjects are covered in the coaching institute?":
//         "Our coaching institute covers all major subjects including Mathematics, Science, English, Social Studies, and more.",
    
//     "2. How do I pay the coaching fees?":
//         "You can pay the coaching fees online through our QR code provided on the website, or you can visit our centre and pay in person.",

//     "3. Is there any instalment facility available for fee payment?":
//         "Yes, we offer instalment facilities for paying fees. Please contact our administration office for more details.",

//     "4. How can I check my attendance?":
//         "You can check your attendance by logging into your student portal on our website. Attendance records are updated regularly.",

//     "5. What is the class schedule like?":
//         "Our class schedule varies depending on the batch you are enrolled in. You can find the detailed schedule on our website or inquire at the center.",

//     "6. Are there any demo classes available before enrollment?":
//         "Yes, we offer demo classes for interested students. You can schedule a demo class by contacting us through the website or visiting our center.",

//     "7. How can I contact my subject teachers for doubts?":
//         "You can contact your subject teachers either through email, phone or by scheduling an appointment during their office hours.",

//     "8. Is there any provision for doubt-clearing sessions?":
//         "Yes, we conduct regular doubt-clearing sessions to help students clarify their concepts and solve any queries they might have.",

//     "9. Can I access study material online?":
//         "Yes, study materials including notes, assignments, and practice papers are available online through our student portal.",

//     "10. How do I access my examination results?":
//         "You can access your examination results by logging into your student portal. Results are usually published within a week after the exams.",

//     "11. Is there any provision for scholarship programs?":
//         "Yes, we offer scholarship programs based on merit and financial need. Details about scholarship programs are available on our website.",

//     "12. What is the process for admission?":
//         "The admission process involves filling out an online application form, appearing for an entrance test (if applicable), and completing the payment of fees.",

//     "13. Are there any facilities for extra-curricular activities?":
//         "Yes, we encourage participation in extra-curricular activities and conduct various events and competitions throughout the year.",

//     "14. Can I switch batches if I miss a class?":
//         "Yes, you can request to switch batches if you miss a class. However, it's subject to availability and approval from the administration.",

//     "15. Is there any facility for online classes?":
//         "Yes, we offer online classes for students who cannot attend regular classroom sessions. You can enroll in our online program and attend classes from anywhere.",

//     "16. Are there any discounts available for group enrollments?":
//         "Yes, we offer discounts for group enrollments. Please contact our administration office for more details.",

//     "17. How do I request a leave of absence?":
//         "You can request a leave of absence by applying through the student portal or by contacting the administration office directly.",

//     "18. Are there any mock tests conducted before final exams?":
//         "Yes, we conduct mock tests to help students prepare for final exams. These tests simulate the actual exam environment and help identify areas for improvement.",

//     "19. How can parents track their child's progress?":
//         "Parents can track their child's progress by logging into the student’s portal on our website. Progress reports and attendance records are regularly updated.",

//     "20. What is the policy for refunding fees in case of withdrawal?":
//         "Our fee refund policy can be discussed in the office. In case of withdrawal, refunds are processed as per the terms and conditions mentioned in the policy."
// }

//https://victors-backend.vercel.app