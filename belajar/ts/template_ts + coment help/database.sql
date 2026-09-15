CREATE DATABASE IF NOT EXISTS minecraft_db;

USE minecraft_db;

CREATE TABLE IF NOT EXISTS player (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat VARCHAR(100) NOT NULL,
    rank VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS mob (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    tipe VARCHAR(100) NOT NULL,
    health INT(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS enemy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    dif VARCHAR(100) NOT NULL,
    health INT(100) NOT NULL
);

INSERT INTO player (nama, alamat, rank) VALUES 
('Budi Santoso', 'subang', 'pro'),
('Siti Rahayu', 'karawang', 'noob'),
('Ahmad Fauzi', 'purwakarta', 'mid');

INSERT INTO mob (nama, tipe, health) VALUES 
('creaper', 'hostile', 30),
('cow', 'pasif', 10),
('zombie piglin', 'netral', 50);

INSERT INTO enemy (nama, dif, health) VALUES 
('dragon', 'easy', 75),
('wither', 'medium', 80),
('warden', 'hard', 90);