
CREATE DATABASE IF NOT EXISTS atividades_db;
USE atividades_db;

CREATE TABLE IF NOT EXISTS atividadesextracurriculares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    participantes TEXT NOT NULL,
    tipo ENUM('comum', 'competitiva') NOT NULL,
    nivel_competicao VARCHAR(50) DEFAULT NULL
);
