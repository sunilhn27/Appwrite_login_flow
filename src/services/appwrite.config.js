import { Client, Account } from "appwrite";
require('dotenv').config({ path: '../../../app-auth/.envrc' })


const client = new Client();


// client
//     .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`)
//     .setProject(`${process.env.APPWRITE_PROJECT_ID}`)


    client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647e348cd823816f4db7')

export const account = new Account(client);


