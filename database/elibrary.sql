CREATE DATABASE elibrary;
USE elibrary;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255)
);

INSERT INTO users (username, password)
VALUES ('student1', '12345'), ('admin', 'admin123');

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  department VARCHAR(50),
  image_url VARCHAR(255),
  pdf_url VARCHAR(255),
  updated_date DATE
);

INSERT INTO books (title, department, image_url, pdf_url, updated_date) VALUES
('Web Essentials', 'IT', 'images/web.jpg', 'pdfs/web.pdf', CURDATE()),
('Computer Networks', 'IT', 'images/cn.jpg', 'pdfs/cn.pdf', CURDATE());
