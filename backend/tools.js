
function convertDate(dateStr) {
  if (!dateStr) {
    return null;
  }

  const isAlreadyFormatted = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);

  if (isAlreadyFormatted) {
    return dateStr;
  }

  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function checkBody(body, keys) {
  let isValid = true;
  for (const field of keys) {
    if (body[field] === undefined || body[field] === '') {
      isValid = false;
    }
  }
  return isValid;
}

function trimBody(body) {
  const trimmedBody = {};

  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      trimmedBody[key] = value.trim();
    } else if (typeof value === "object" && !Array.isArray(value)) {
      trimmedBody[key] = trimBody(value);
    } else {
      trimmedBody[key] = value;
    }
  }

  return trimmedBody;
}


function testEmail(email) {
  const regexEmail = /^([a-z0-9_\-]+)@([a-z0-9_\-]+)\.([a-z]{2,6})$/i;

  return regexEmail.test(email);
}
module.exports = {
  convertDate,
  checkBody,
  trimBody,
  testEmail
}
