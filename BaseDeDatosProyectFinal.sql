create database proyectofinal;
use proyectofinal;

create table pedidos (
id int not null auto_increment primary key,
nombre varchar (255) not null,
correo varchar (255) not null,
texto varchar (255) not null
);

select * from pedidos;