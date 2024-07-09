export default function StudentFees(){
    return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:"-50px"}}>
        <h4>Please scan the QR code below to make your payment:</h4>
        <img style={{width:"300px",height:"300px"}} src="../../static/QR.jpg"/>
        <a href="https://forms.gle/PXP4XhJW93Kcnu2X6" style={{marginTop:"20px"}}>Fee Payment Google Form</a>
    </div>)
}