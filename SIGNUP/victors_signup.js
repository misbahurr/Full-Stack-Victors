var requestBody={
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    firstname:document.getElementById('firstname').value,
    lastname:document.getElementById('lastname').value,
}

console.log(serverreq);
fetch("https://yournoteserver.herokuapp.com/users",{
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
    if(res.statusCode===401){
        res.setHeader('Content-Type','application/json');
        res.send({err:'try a different username'});

    }
    else if(res.statusCode===500){
        res.setHeader('Content-Type','application/json');
        res.send({err:'username and password required'});
    }
    else if(res.statusCode===200){
        res.setHeader('Content-Type', 'application/json');
        res.send(user);
    }
}).catch((err) => {
    console.log(err)
})
