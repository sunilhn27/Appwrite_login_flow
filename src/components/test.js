require('dotenv').config({path:'../../../app-auth/.envrc'})

const appwriteEndpoint = process.env.REACT_APP_APPWRITE_URL;
const DB_HOST =process.env.DB_HOST;


console.log(appwriteEndpoint)

console.log(DB_HOST)