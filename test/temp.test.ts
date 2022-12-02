import { DocComment, ParserContext, TSDocParser } from '@microsoft/tsdoc';
import colors from 'colors';
import extract from 'extract-comments';
import os from 'os';
import { parseStruct } from 'ts-file-parser';
import { Formatter } from '../src/Formatter';

// import extract from 'extract-comments';
import fs from 'fs';
import path from 'path';
// import Comments from 'parse-comments';
describe('something', () => {
  it('parses the ts file', () => {
    // var filePath = './src/QorusAuthenticator.ts';
    console.log(colors.yellow('*** TSDoc API demo: Simple Scenario ***') + os.EOL);

    const inputFilename: string = path.resolve(path.join(__dirname, '..', 'assets', 'simple-input.ts'));
    console.log('Reading assets/simple-input.ts...');

    const inputBuffer: string = fs.readFileSync(inputFilename).toString();

    // NOTE: Optionally, can provide a TSDocConfiguration here
    const tsdocParser: TSDocParser = new TSDocParser();
    const parserContext: ParserContext = tsdocParser.parseString(inputBuffer);

    console.log(os.EOL + colors.green('Input Buffer:') + os.EOL);
    console.log(colors.gray('<<<<<<'));
    console.log(inputBuffer);
    console.log(colors.gray('>>>>>>'));

    console.log(os.EOL + colors.green('Extracted Lines:') + os.EOL);
    console.log(
      JSON.stringify(
        parserContext.lines.map((x) => x.toString()),
        undefined,
        '  ',
      ),
    );

    console.log(os.EOL + colors.green('Parser Log Messages:') + os.EOL);

    if (parserContext.log.messages.length === 0) {
      console.log('No errors or warnings.');
    } else {
      for (const message of parserContext.log.messages) {
        console.log(inputFilename + message.toString());
      }
    }

    console.log(os.EOL + colors.green('DocComment parts:') + os.EOL);

    const docComment: DocComment = parserContext.docComment;

    console.log(colors.cyan('Summary: ') + JSON.stringify(Formatter.renderDocNode(docComment.summarySection)));

    if (docComment.remarksBlock) {
      console.log(colors.cyan('Remarks: ') + JSON.stringify(Formatter.renderDocNode(docComment.remarksBlock.content)));
    }

    for (const paramBlock of docComment.params.blocks) {
      console.log(
        colors.cyan(`Parameter "${paramBlock.parameterName}": `) +
          JSON.stringify(Formatter.renderDocNode(paramBlock.content)),
      );
    }

    if (docComment.returnsBlock) {
      console.log(colors.cyan('Returns: ') + JSON.stringify(Formatter.renderDocNode(docComment.returnsBlock.content)));
    }

    console.log(colors.cyan('Modifiers: ') + docComment.modifierTagSet.nodes.map((x) => x.tagName).join(', '));
  });

  it.only('parses code', () => {
    var filePath = './assets/simple-input.ts';
    const buffer = fs.readFileSync(filePath).toString();

    var comments = extract(buffer, {}, () => undefined);
    const tsdocParser: TSDocParser = new TSDocParser();
    const parserContext: ParserContext = tsdocParser.parseString(`/** ${comments[0].raw} */`);
    const docComment: DocComment = parserContext.docComment;

    let parameters: any[] = [];
    for (const paramBlock of docComment.params.blocks) {
      const parameter = {
        name: paramBlock.parameterName,
        content: Formatter.renderDocNode(paramBlock.content),
      };
      parameters.push(parameter);
    }

    const typeData = parseStruct(buffer, {}, filePath);
    const signature = comments[0].code.context.match[0].slice(0, comments[0].code.context.match[0].length - 5);

    let final = {
      parameters: parameters,
      summary: Formatter.renderDocNode(docComment.summarySection),
      returns: Formatter.renderDocNode(docComment.returnsBlock!.content),
      signature: signature,
      typeData: typeData,
    };
    console.log(JSON.stringify(final));
  });
});
