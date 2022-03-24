var mysql  = require('mysql');
const date = require('./date_utils')

 /**************************************************************
  * Fonction interne utilisée par les autre fonctions pour la 
  * création de la connection à la base mySQL taskdb
  **************************************************************/
function connectToMySQL(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'taskdb'
  });
  
  connection.connect();

  return connection
}

 /**************************************************************
  * Fonction pour la récupération de la liste des tâches 
  * stockées en base
  **************************************************************/
function dbGetTasks(fonction_traitement_resultat_bdd){

  // Connexion à la base de données
  let connection = connectToMySQL()

  let sql = "select * from task order by idtask asc"

  // Récupération des données en base
  connection.query(sql, fonction_traitement_resultat_bdd)

  // Fermeture de la transaction
  connection.end()

}

 /**************************************************************
  * Fonction pour insérer en base une nouvelle tâche
  **************************************************************/
function dbAddTask(pbody, doAtEnd){

  // Préparation de la reqête SQL en fonction des données saisies dans le formulaire
  let connection = connectToMySQL()
  let sql = `insert into task (name, description, statut, dead_line) values (?, ?, ?, ?)`
  let values_to_insert = [pbody['tache'], pbody['descr'], 0, pbody['deadline']]

  // Connexion à la base de données
  connection.query(sql, values_to_insert, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonction pour mettre à jour le statut et la date de fin 
  * d'une tâche dans la base de donnée
  **************************************************************/
  function dbUpdateTask(pbody, doAtEnd){

  // Préparation de la requête SQL
  let values_to_update = parseInt([pbody['idtask']])
  let sql = ``
  if (pbody['statut'] == 0){
    // Si le statut initial était 0 (non terminé) la demande de modification 
    // concerne une fin de tâche : la date de fin = la date du jour
    sql = `update task set statut = 1, date_fin = CURRENT_DATE where idtask = ?`
  } else {
    // Si le statut initial était 1 (terminé) la demande de modification 
    // concerne une annulation de fin de tâche : remettre la date de fin à null
    sql = `update task set statut = 0, date_fin = null where idtask = ?`
  }
  
  // Connexion à la base
  let connection = connectToMySQL()

  // Passage de la requête de mise à jour
  connection.query(sql, values_to_update, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonction pour supprimer de la base une tâche
  **************************************************************/
 function dbDeleteTask(pbody, doAtEnd){

  // Préparation de la requête SQL
  let values_to_delete = parseInt([pbody['idtask']])
  let sql = `delete from task where idtask = ?`
  
  // Connexion à la base
  let connection = connectToMySQL()

  // Passage de la requête de suppression
  connection.query(sql, values_to_delete, doAtEnd)

  // Commit et fermeture de la transaction
  connection.commit()
  connection.end()

}

 /**************************************************************
  * Fonctions exportées pour manipulation de la base de données
  **************************************************************/
  module.exports = {
  dbGetTasks: dbGetTasks, 
  dbAddTask: dbAddTask, 
  dbUpdateTask: dbUpdateTask,
  dbDeleteTask: dbDeleteTask,
}