const express = require('express')

const path = require('path')

const app = express()

app.set('PORT',process.env.PORT || 3200)

app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/views/index.html'))
})




app.get('/IngresaAdmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Admin.html'));
});

app.get('/IngresaUsuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'User.html'));
});


app.listen(app.get('PORT'),()=>console.log(`Server front in port ${app.get('PORT')}`))