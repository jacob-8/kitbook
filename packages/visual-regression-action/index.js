const core = require('@actions/core')
const github = require('@actions/github')

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet')
  console.info(`Hello ${nameToGreet}!`)
  const time = (new Date()).toTimeString()
  core.setOutput('time', time)
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.info(`The event payload: ${payload}`)
}
catch (error) {
  core.setFailed(error.message)
}

/**
 * This function adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(a, b) {
  return a + b
}

/**
 * This function multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of the two numbers.
 */
function multiply(a, b) {
  return a * b
}

module.exports = {
  add,
  multiply,
}
