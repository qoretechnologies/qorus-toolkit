const fs = require('fs');
const GAF = require('get-all-files');

const getHtmlFilesPath = async () => {
  let htmlFiles = [];

  for await (const filename of GAF.getAllFiles(`./docs`)) {
    // Could break early on some condition and get-all-files
    // won't have unnecessarily accumulated the filenames in an array
    if (filename.includes('.html')) {
      htmlFiles.push(filename);
    }
  }
  return htmlFiles;
};

const getHeaders = () => {
  return `<script src="https://embed.runkit.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/agate.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>`;
};

const getReplFunctionHeaderHtml = () => {
  return `<script>
  function runOnRepl(functionName) {
    const replButton = document.getElementById(\`repl-\${functionName}\`);
    const code = document.getElementById(\`code-\${functionName}\`);
    const src = document.getElementById(\`inner-code-\${functionName}\`).textContent;

    var notebook = RunKit.createNotebook({
      element: document.getElementById(\`\${functionName}\-elem\`),
      nodeVersion: '18.8.0',
      source: src,
      preamble: \`const Qorus = require('@qoretechnologies/qorus-toolkit');\`,
    });
    replButton.style.display = 'none';
    code.style.display = 'none';
  }
</script>`;
};

const getReplHtml = (functionName, src) => {
  return `<h3>Example</h3>
  <div style="position: relative; overflow: hidden"><button
  id="repl-${functionName}"
  onclick="runOnRepl('${functionName}')"
  class="repl-button"
>
  Try in Repl
</button>
<pre id="code-${functionName}"><code id="inner-code-${functionName}" class="language-ts">${src.trim()}</code></pre></div>
<div id="${functionName}-elem" style="margin-left: 15px;"></div>`;
};

const getSrc = (functionName) => {
  const src = fs.readFileSync(`./src/examples/${functionName}Src.js`, { encoding: 'utf8' });
  return src;
};

const updateDocs = async () => {
  const htmlFilePaths = await getHtmlFilesPath();

  htmlFilePaths.map((docFile) => {
    fs.readFile(docFile, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      // Getting all the functions in the html document
      let functions = [...data.matchAll(/<p>-(.*?)-function(.*?)<\/p>/gms)];
      if (functions.length > 0) {
        // Getting index of closing head tag
        let header = data.match(/<\/head>/s);
        let headerAndFunctionIndex = data.indexOf(header[0]);

        // Getting header html for the repl function
        const replFunctionHeaderHtml = getReplFunctionHeaderHtml();

        // Getting the static headers and styles to include
        const headerHtml = getHeaders();

        // Creating new html file with the headers
        let docWithHeader =
          data.slice(0, headerAndFunctionIndex) +
          headerHtml +
          replFunctionHeaderHtml +
          data.slice(headerAndFunctionIndex);

        functions.map((func) => {
          const src = getSrc(func[1]);

          const replHtml = getReplHtml(func[1], src);
          let textWithoutFunction = func[0].slice(`<p>-${func[1]}-function`.length);
          textWithoutFunction = `<p>` + textWithoutFunction;

          let replButtonIndex = docWithHeader.indexOf(func[0]);
          docWithHeader =
            docWithHeader.slice(0, replButtonIndex + func[0].length) +
            replHtml +
            docWithHeader.slice(replButtonIndex + func[0].length);

          replButtonIndex = docWithHeader.indexOf(func[0]);
          docWithHeader =
            docWithHeader.slice(0, replButtonIndex) +
            textWithoutFunction +
            docWithHeader.slice(replButtonIndex + func[0].length);
        });
        fs.writeFileSync(docFile, docWithHeader, (err) => console.log(err));
      }
    });
  });
};

updateDocs();
