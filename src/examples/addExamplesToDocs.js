const fs = require('fs');

const docFile = './Authenticator.html';

const getHeaders = () => {
  return `<script src="https://embed.runkit.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/agate.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>`;
};

const getFunctionString = (functionName) => {
  return `<script>
  function runOnRepl(functionName) {
    console.log("clicked");
    const replButton = document.getElementById("repl-${functionName}");
    const code = document.getElementById("code-${functionName}");
    const src = document.getElementById("inner-code-${functionName}").textContent;
    console.log(src);

    var notebook = RunKit.createNotebook({
      element: document.getElementById("${functionName}-elem"),
      nodeVersion: '18.8.0',
      source: src,
    });
    replButton.style.display = 'none';
    code.style.display = 'none';
  }
</script>`;
};

const getReplHtml = (functionName, src) => {
  return `<button
  id="repl-${functionName}"
  onclick="runOnRepl('${functionName}')"
  style="
    border-radius: 10px;
    cursor: pointer;
    background-color: #33b277;
    border: none;
    margin-bottom: 10px;
    padding: 15px;
    color: #fff;
  "
>
  Try in Repl
</button>
<pre id="code-${functionName}"><code id="inner-code-${functionName}" class="language-ts">
  ${src}
   </code></pre>
<div id="${functionName}-elem"></div>`;
};

const getSrc = (functionName) => {
  const src = fs.readFileSync(`${functionName}Src.js`, { encoding: 'utf8' });
  return src;
};

fs.readFile(docFile, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Getting all the functions in the html document
  let functions = data.match(/<p>-(.*?)-function(.*?)<\/p>/s);
  console.log(functions[1]);
  let header = data.match(/<\/head>/s);
  const src = getSrc(functions[1]);

  // Adding headers html
  let headerAndFunctionIndex = data.indexOf(header[0]);
  console.log(headerAndFunctionIndex);

  const functionStringHtml = getFunctionString(functions[1], src);

  const headershtml = getHeaders();

  let docWithHeader =
  data.slice(0, headerAndFunctionIndex) + headershtml + functionStringHtml + data.slice(headerAndFunctionIndex);

  const replHtml = getReplHtml(functions[1], src);

  let replButtonIndex = docWithHeader.indexOf(functions[0]);
  let finalHtml =
    docWithHeader.slice(0, replButtonIndex + functions[0].length) + replHtml + docWithHeader.slice(replButtonIndex + functions[0].length);

  // Writing final generated file
  fs.writeFileSync(docFile, finalHtml, (err) => console.log(err));
});
