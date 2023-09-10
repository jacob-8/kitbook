// import './global.css'; // you can import needed global styles here
let hasAlreadyExplained = false;

export const load = (() => {
  if (!hasAlreadyExplained) {
      console.log(`%c[Kitbook tip]%c Anything inited in the root layout files will be inited for your app and Kitbook (i18n is a good use case). Anything that isn't needed for Kitbook can be inited inside a src/routes/(app) folder (like your database connection).`, 'color: lightgreen; font-weight: bold; font-size: 1.2em', '');
      hasAlreadyExplained = true;
  }
  
  return {}
})
