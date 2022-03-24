const dat = require('./src/date_utils.js')

let dateTest = new Date('2022-03-24')

// Test fonction formatDateFr()
let dateFormatFR = dat.formatDateFr(dateTest)
if ( dateFormatFR == '24/03/2022' ) {
  console.log("Test formatDateFr() : OK")
} else {
  console.log("Test formatDateFr() : KO")
  console.log("Formatage de la date est incorrect : ", dateFormatFR, " au lieu de : '24/03/2022'")
}

// Test fonction formatDateDb()
let dateFormatDb = dat.formatDateDb(dateTest)
if ( dateFormatDb == '2022-03-24' ) {
  console.log("Test formatDateDb() : OK")
} else {
  console.log("Test formatDateDb() : KO")
  console.log("Formatage de la date est incorrect : ", dateFormatFR, " au lieu de : '2022-03-24'")
}
