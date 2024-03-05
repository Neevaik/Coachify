
function convertDate(dateStr) {
    if (!dateStr) {
      return null; 
    }
  
    // Si c'est déjà au format 'AAAA-MM-JJ' ne rien faire
    const isAlreadyFormatted = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  
    if (isAlreadyFormatted) {
      return dateStr;
    }
  
    // Sinon convertir la date
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

module.exports = {
    convertDate,
}
