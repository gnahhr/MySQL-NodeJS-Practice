CREATE DATABASE if not exists myDatabase;
USE myDatabase;

CREATE TABLE IF NOT EXISTS tbluser(
username varchar(50) not null unique,
password varchar(50) not null,
email varchar(50) not null unique,
studentnum int not null unique auto_increment,
fname varchar(50) not null,
lname varchar(50) not null,
mname varchar(50) not null,
primary key (studentnum)
) auto_increment = 2021000000;

CREATE TABLE IF NOT EXISTS tbladmin(
username varchar(50) not null,
password varchar(50) not null,
primary key (username)
);

CREATE TABLE IF NOT EXISTS tblog(
logId int auto_increment,
logStudNum int,
logUser varchar(50) not null,
logData varchar(255) not null,
logDate timestamp not null,
primary key(logId),
foreign key (logStudNum) references tbluser(studentnum)
)auto_increment = 0;

insert into tbladmin
values ('ADMIN','admin');

insert into tbluser values
('GNAHHR', 'SugoiDekai','cs.mattgabrieldomingo@gmail.com',NULL,'Matt Gabriel','Domingo','Castro');

insert into tblog
values (NULL, NULL, 'Koutei', 'Has something', current_timestamp());

SELECT * FROM tbluser WHERE username = "GNAHHR";

SELECT * FROM tbluser;
SELECT * FROM tbladmin;
SELECT * FROM tblog;