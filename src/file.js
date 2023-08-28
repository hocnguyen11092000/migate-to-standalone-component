const fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "data.json");

fs.readFile(filePath, { encoding: "utf-8" }, function (err, readData) {
  if (!err) {
    const readFileData = JSON.parse(readData);
    readFileData["newRecord"] = "newRecord";

    writeFile(JSON.stringify(readFileData));
  } else {
    console.log(err);
  }
});

const writeFile = (data) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
};
