const express = require ('express');
const app = express();
const puerto = process.env.puerto || 5000;
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const { get } = require('http');
const baseModule = require('hbs');
const { ifError } = require('assert');
const async = require('hbs/lib/async');



/*const conexion = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}) */


/*conexion.connect((err)=>{
    if(err) {
        console.error(`Error en la conexion + ${err.stack}`);
        return;
    }
    console.log(`Conectada a la base de Datos ${process.env.database}`)
})*/

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));



app.get('/', (req, res)=>{
    res.render('base',{
        style: 'base.css'
    }
    )
})


app.get('/home', (req, res)=>{
    res.render('index',{
        style: 'base.css'
    }
    )
})

app.get('/formulario', (req, res)=>{
    res.render('formulario',{
        style: 'base.css'
    })
})

app.get('/sector', (req, res)=>{
    res.render('pintura', {
        style: 'base.css'
    })
})

app.post('/formulario', (req, res)=>{
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let texto = req.body.texto;
    if (nombre == "" || correo == "" || texto == "") {
        let mensaje = 'Complete todo los campos';
        res.render('formulario', {
            mensaje,
            style: 'base.css'
        })
    } else {
        let datos = {
            nombre: nombre,
            correo: correo,
            texto: texto
        };
        /*let sql = 'INSERT INTO pedidos SET ?';
        conexion.query(sql, datos, (err, result)=>{
            if(err) throw err;*/
            res.render('formulario', {
                style: 'base.css'
            })
       //})
    }
    
})

app.get('/contacto', (req, res)=>{
    res.render('contacto',{
        style: 'base.css'
    })
})

app.post('/contacto', (req, res)=>{
    let nombre = req.body.nombre;
    let email = req.body.email;
    
    if (nombre == "" || email == "") {
        let mensaje = 'Complete todo los campos';
        res.render('contacto', {
            mensaje,
            style: 'base.css'
        })
    } else {
        console.log(nombre);
        console.log(email);
        async function envioMail(){

            let transporter = nodemailer.createTransport ({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.usermail,
                    pass: process.env.passemail
                }
            });

            let envio = await transporter.sendMail({
                from: process.env.usermail,
                to: `${email}`,
                subject: `Gracias por Suscribirse`,
                html: `Desde nuestra empresa estamos muy agradecido que cuentes con nosotros. <br>
                En unos momento un operador de nuestro equipo se pondra en contacto con ud.`
            })
            res.render('enviado', {
                titulo: 'Mail Enviado',
                style: 'base.css'
                
            })
            }
            envioMail();
        }
        
    })


app.listen(puerto, () =>{
    //console.log(`Corriendo en puerto ${puerto}`)
})

