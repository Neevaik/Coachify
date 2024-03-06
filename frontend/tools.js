function convertToDateFormat(dateString) {
    const dateObject = new Date(dateString);
    const day = ('0' + dateObject.getUTCDate()).slice(-2);
    const month = ('0' + (dateObject.getUTCMonth() + 1)).slice(-2);
    const year = dateObject.getUTCFullYear();
  
    return `${month}/${day}/${year}`;
  }
  

module.exports = {
    convertToDateFormat,
}
  