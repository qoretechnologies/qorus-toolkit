import fs from 'fs';
const exampleDirectory = './src/examples/';
const exampleJsonFile = './codeExamples.ts';

function readFiles(dirname) {
  fs.readdir(dirname, function (err, filenames) {
    let data: { [x: string]: string } = {};

    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function (filename) {
      const content = fs.readFileSync(dirname + filename, 'utf-8');
      console.log(content);
      const newFileName = filename.split('.')[0];
      data[newFileName] = content;
    });
    fs.writeFileSync(exampleJsonFile, `export default ${JSON.stringify(data)}`);
    console.log(data);
  });
}

console.log(readFiles(exampleDirectory));
