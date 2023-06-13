import { Client, Account } from "appwrite";
require('dotenv').config({ path: '../../../app-auth/.envrc' })


const client = new Client();


client
    .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`)
    .setProject(`${process.env.APPWRITE_PROJECT_ID}`)

export const account = new Account(client);


