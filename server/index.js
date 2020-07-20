/*
Building our server/app/restful api
*/
const express = require("express");  // load the express module
const cors = require('cors');
const pool = require("./db");
const app = express(); // creates an express application


// setup middleware 
app.use(cors());
app.use(express.json());  //req.body

// Listen on port 5000
const port = 5000
app.listen(port, () => {
    console.log(`The server has started listening at http://localhost:${port}`)
})

//ROUTES//

// create a todo (Post because we are adding data)
app.post("/todos", async(req, res) => {
    try {
        const {description} = req.body;
        // CREATE (Crud) operation in database
        const new_todo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(new_todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }

});

// Get all todos
app.get('/todos', async(req, res) => {
    try {
        const all_todos = await pool.query('SELECT * FROM todo');
        res.json(all_todos.rows)
    } catch (error) {
        console.error(error.message);
    }
});

// Get a particular todo
app.get('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message);
    }
});

// Update a todo
app.put('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const update_todo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
        res.json('TODO was updated');
    } catch (error) {
        console.error(error.message);
    }
});

// Delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const delete_todo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        res.json('Task was deleted!');
    } catch (error) {
        console.error(error.message);
    }
});


