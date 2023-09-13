import fs from "fs";
import ts from "typescript";

const inputFilePath = "./src/virtual/importModules.ts";
const inputFileContent = fs.readFileSync(inputFilePath, "utf8");

const tsResult = ts.transpileModule(inputFileContent, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    noImplicitUseStrict: true,
  },
});

const commentLinesRegex = /\/\/.*/g;
const withoutComments = tsResult.outputText.replace(commentLinesRegex, "");

const singleQuoteRegex = /'/g;
const withDoubleQuotes = withoutComments.replace(singleQuoteRegex, '"');

const whitespaceRegex = /(?:\r?\n|\r){2,}/g;
const withoutExcessiveWhitespace = withDoubleQuotes.replace(whitespaceRegex, "\n");

const outputFilePath = "./src/virtual/importModulesStringified.ts";
const outputFileContent = `export default \`${withoutExcessiveWhitespace.trim()}\``;
fs.writeFileSync(outputFilePath, outputFileContent);
