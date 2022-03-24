/************************************************************************
 * Fonction de "pading", complète avec des 0 à gauche sur 2 digits
 ************************************************************************/
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

/************************************************************************
 * Fonction de formatage pour mettre une date au format DD/MM/YYYY
 ************************************************************************/
function formatDateFr(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

/************************************************************************
 * Fonction de formatage pour mettre une date au format YYYY-MM-DD
 ************************************************************************/
function formatDateDb(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
}

/************************************************************************
 * Fonction qui retourne la date du jour au format DD/MM/YYYY
 ************************************************************************/
function dateJour() {
  let aujourdhui = new Date()
  return formatDateDb(aujourdhui)
}

module.exports = {
    formatDateFr: formatDateFr, 
    formatDateDb: formatDateDb, 
    dateJour: dateJour,
}