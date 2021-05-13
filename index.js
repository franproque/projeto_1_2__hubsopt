const express = require('express')
const bodyParser = require('body-parser');

const app =express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./src/routes/v1.routes')(app);

app.listen(3000,()=>{
    console.log("Servidor Iniciado com sucesso!!!")
})