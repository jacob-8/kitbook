// This file can be named either init.ts or init.js
export default async function () {
    console.log(`%csrc/.kitbook/init.ts%c I run on the server and the client in Kitbook's root +layout.ts load function, before Kitbook is started. You can use me to init things like i18n needed for your Kitbook environment, including asynchronous code.`, 'color: lightgreen; font-weight: bold; font-size: 1.2em', '');
    // await oneSecond(); // << try me!
    // console.log('init.ts finishing')
}
// async function oneSecond() {
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// }
