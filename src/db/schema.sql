CREATE DATABASE ESI

USE ESI

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  discord INT,
  alt INT,
  name VARCHAR(255) NOT NULL,
  characterId VARCHAR(255) NOT NULL,
  refreshToken TEXT NOT NULL,
  expire INT NOT NULL,
  addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_discord (discord), 
  INDEX idx_alt (alt)
);