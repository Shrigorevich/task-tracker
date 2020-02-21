const {Router} = require('express');
const router = Router()
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'b20ad63dce4be1',
    database: 'heroku_72c8db4b23b018f',
    password: '25145e49'
  });

//GET ALL USERS
router.get('/users', async (req, res) => {

    connection.query(`SELECT * FROM users`, (err, result, fields) => {
        res.status(200).json({users: result})          
    })
    console.log('users request');
    
})

//ADD NEW USER
router.post('/user', async (req, res) => {
  
    connection.query(`INSERT INTO users (first_name, last_name, position) VALUES ("${req.body.firstName}", "${req.body.lastName}", "${req.body.position}");`, (err, result, fields) => {
        if(err){
            console.log(err);
        }else{
            res.status(201).json({message: 'User created!'})
        }
    })
})

//GET A SPECIFIC USER BY ID
router.get('/user/:id', async (req, res) => {
    
    connection.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result, fields) => {
        if(result.length > 0){
            console.log({user: result[0], error: false});
            
            res.status(200).json({user: result[0], error: false})
        }else{
            console.log({message: "User is not found!", error: true});
            
            res.status(200).json({message: "User is not found!", error: true})
        }       
    })
})

//ADIT A SPECIFIC USER BY ID
router.post('/user/:id', async (req, res) => {
    console.log('User edit: ', req.params.id);
    
    connection.query(`UPDATE users SET first_name="${req.body.firstName}", last_name="${req.body.lastName}", position="${req.body.position}" WHERE id=${req.params.id};`, (err, result, fields) => {
        if(err){
            res.status(500).json({err: err})  
        }else{
            res.status(200).json({message: "User edited!"})  
        }
    })
})

//REMOVE A SPECIFIC USER BY ID
router.get('/removeuser/:id', async (req, res) => {
    console.log('Remove task: ', req.params.id);
    
    connection.query(`DELETE FROM users WHERE id=${req.params.id};`, (err, result, fields) => {
        if(err){
            console.log(err);
            
            res.status(500).json({err: err})  
        }else{
            res.status(200).json({message: "User removed!"})  
        }
    })
})

//GET ALL TASKS
router.get('/tasks', async (req, res) => {
    connection.query(`SELECT * FROM tasks`, (err, result, fields) => {
        
        for(let i = 0; i < result.length; i++){
            result[i].performer = JSON.parse(result[i].performer)
        }
        res.status(200).json({tasks: result})          
    })
    console.log('tasks request');
})

//ADD NEW TASK
router.post('/task', async (req, res) => {
    connection.query(`INSERT INTO tasks (title, description, status) VALUES ("${req.body.title}", "${req.body.description}", "${req.body.status}");`, (err, result, fields) => {
        if(err){
            console.log(err);
            
        }else{
            res.status(201).json({message: 'Task created!'})
        }
    })
})

//GET A SPECIFIC TASK BY ID 
router.get('/task/:id', async (req, res) => {
    
    connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (err, result, fields) => {
        
        if(result.length > 0){
            result[0].performer = JSON.parse(result[0].performer)
            res.status(200).json({task: result[0], error: false})
        }else{
            console.log({message: "User is not found!", error: true});
            res.status(200).json({message: "User is not found!", error: true})
        }         
    })
})

//ADIT A SPECIFIC TASK BY ID
router.post('/task/:id', async (req, res) => {
    
    connection.query(`UPDATE tasks SET title="${req.body.title}", description="${req.body.description}", status="${req.body.status}", performer='${JSON.stringify(req.body.performer)}' WHERE id=${req.params.id};`, (err, result, fields) => {
        if(err){
            console.log(err);
            
            //res.status(500).json({err: err})  
        }else{
            res.status(200).json({message: "Task edited!"})  
        }
    })
})

//REMOVE A SPECIFIC USER BY ID
router.get('/removetask/:id', async (req, res) => {
    console.log('Remove task: ', req.params.id);
    
    connection.query(`DELETE FROM tasks WHERE id=${req.params.id};`, (err, result, fields) => {
        if(err){
            console.log(err);
            
            //res.status(500).json({err: err})  
        }else{
            res.status(200).json({message: "Task removed!"})  
        }
    })
})

module.exports = router
