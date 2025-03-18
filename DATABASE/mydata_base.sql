CREATE DATABASE blog_database;
USE blog_database;

CREATE TABLE posts(
    id VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    blog_name TEXT,
    POITN TEXT,
    up INT DEFAULT 0,
    down INT DEFAULT 0
);