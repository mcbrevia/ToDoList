const express = require('express')
const { createPool } = require('mysql')
const app = express()
const port = 3000

const db = require('./src/db_utils_task_manage')
const ht = require('./src/html_utils_task_manage')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

/***********************************************
 *    -- VERSION SINGLE PAGE APPLICATION --
 ***********************************************/
// Affichage de la liste des tâches en React JS
app.get('/get-task-json', (req, res) => {

  db.dbGetTasks(
    function (error, results, fields){
      res.json(results)
   },
 )

})


/***********************************************
 *     -- VERSION SERVER-SIDE RENDING --
 ***********************************************/

// Affichage de la Page Principale
app.get('/get-task', (req, res) => {

    db.dbGetTasks(
      function (error, results, fields){
        let html = ht.ShowTasks(results)
        res.send(html)
     },
   )

})

// Ajout d'une nouvelle tâche : soumission du formulaire
app.post('/submit',(req,res) => {

  db.dbAddTask(req.body, function (err, result) {  
    if (err) throw err;  
    //console.log("ligne insérée en base");  
    res.redirect('/get-task');
  });
  
})

// Mise à jour d'une tâche : terminée / non terminée
app.post('/update-task',(req,res) => {

  db.dbUpdateTask(req.body, function (err, result) {  
    if (err) throw err;  
    //console.log("ligne modifiée en base");  
    res.redirect('/get-task');
  });
  
})

// Suppression d'une tâche de la base de données
app.post('/delete-task',(req,res) => {

  db.dbDeleteTask(req.body, function (err, result) {  
    if (err) throw err;  
    //console.log("ligne supprimée de la base");  
    res.redirect('/get-task');
  });
  
})


/***********************************************
 * Serveur en attente sur le port demandé 
 ***********************************************/
app.listen(port, () => {
  console.log(`App Todo List on port ${port}`)
})