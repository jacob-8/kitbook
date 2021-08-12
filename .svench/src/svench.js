import { start } from "svench"

import "svench/themes/default.css"
import "svench/themes/default-markdown.css"

const options = {}

import routes from "./routes.hot.js"
options.routes = routes

import * as ui from "svench/app.js"
options.ui = ui

import * as rc from "C:\\dev\\runner-ui\\src\\.svench.js"
options.rc = rc

export default start(options, document.body, import.meta.hot)

// Some tools (e.g. Vite, Snowpack) do static code analysis and need
// to see this to enable HMR
if (false) import.meta.hot.accept()