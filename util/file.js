const fs = require('fs');

const exists = (file) => {
  return fs.existsSync(file);
};

const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const countDir = (dir) => {
  return fs.readdirSync(dir).length;
};

const getDir = (dir) => {
  return fs.readdirSync(dir);
};

const read = (file, encoding) => {
  return fs.readFileSync(file, encoding);
};

const write = (file, content, preProcess) => {
  if (!preProcess) {
    preProcess = (content) => {
      return content;
    };
  }
  fs.writeFileSync(file, preProcess(content));
};

module.exports = { exists, mkdir, countDir, getDir, read, write };
