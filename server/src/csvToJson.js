const csvFilePath = 'finalBooks.csv';
const jsonFilePath = 'data.json';

const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const jsonString = JSON.stringify(jsonObj, null, 2);
    fs.writeFile(jsonFilePath, jsonString, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('JSON file has been saved!');
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
