function login(){
    var requestBody={
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }
    
    console.log(serverreq);
    fetch("https://yournoteserver.herokuapp.com/users/login",{
        method:"Post",
        body: new URLSearchParams(requestBody),
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
                            'Access-Control-Request-Method': 'Post',
                            'Access-Control-Request-Headers': 'origin',
                            'Origin': 'https://yournoteserver.herokuapp.com/',
        },
    }
    ).then((res) => {
        console.log(res)
        if(res.err == "user not found"){
            res.setHeader('Content-Type','application/json');
            res.send({err:'user not found'});
    
        }
        else if(res.err == "incorrect password"){
            res.setHeader('Content-Type','application/json');
            res.send({err:'username and password required'});
        }
        else if(res.statusCode===200){
            var token=authenticate.getToken({_id:user._id})
    
            response.setHeader('Content-Type', 'application/json');
            res.send({success:true,token:token})
        }
    }).catch((err) => {
        console.log(err)
    })
    }
    