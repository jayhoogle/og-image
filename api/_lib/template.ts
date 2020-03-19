import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/HKGrotesk-Regular.woff2`
).toString("base64");
const bold = readFileSync(
  `${__dirname}/../_fonts/HKGrotesk-Bold.woff2`
).toString("base64");

const covidImg = `${__dirname}/../_images/whiteLogo.png`;

function getCss() {
  let background = "#1D1358";
  let foreground = "white";

  return `
    @font-face {
        font-family: 'HK Grotesk';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'HK Grotesk';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: ${background};
        height: 100vh;
        display: flex;
        text-align: left;
        align-items: left;
        justify-content: left;
        margin:100px;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        position: absolute;
        bottom:100px;
        width:40%;
        height:auto;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'HK Grotesk', sans-serif;
        font-size: 111px;
        font-style: normal;
        color: ${foreground};
        line-height:0.5em;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <div class="heading">
                <p>Volunteer to take calls in the</p>
                <p><strong>${emojify(sanitizeHtml(text))}</strong></p>
                <p>community</p>
            </div>
            <div>
                <img class="logo" src="${sanitizeHtml(covidImg)}" />
            </div>
        </div>
    </body>
</html>`;
}

// function getImage(src: string, width = "auto", height = "225") {
//   return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`;
// }

// function getPlusSign(i: number) {
//   return i === 0 ? "" : '<div class="plus">+</div>';
// }
