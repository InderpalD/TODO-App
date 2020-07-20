/* Create a database and table for todo tasks */
CREATE DATABASE todo_app_db;

CREATE TABLE todo{
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
};