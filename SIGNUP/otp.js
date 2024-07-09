function sendOTP() {
    const email = document.getElementById('email');
    const otpverify = document.getElementsByClassName('otpverify')[0];

    let otp_val = Math.floor(Math.random() * 10000);

    let emailbody = `<h2>Your OTP is ${otp_val}</h2>`;
    Email.send({
        SecureToken: "b55309a2-8d55-425e-a9ab-18100d89e7a8",
        To: email.value,
        From: "abc@gmail.com",
        Subject: "Email OTP using JavaScript",
        Body: emailbody,
    }).then(
        message => {
            if (message === "OK") {
                alert("OTP sent to your email " + email.value);

                otpverify.style.display = "flex";
                const otp_inp = document.getElementById('otp_inp');
                const otp_btn = document.getElementById('otp-btn');

                otp_btn.addEventListener('click', () => {
                    if (otp_inp.value == otp_val) {
                        alert("Email address verified...");
                    }
                    else {
                        alert("Invalid OTP");
                    }
                })
            }
        }
    );
}
