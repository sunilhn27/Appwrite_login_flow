import { Client, Account } from "appwrite";

const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('647e348cd823816f4db7')



export const account = new Account(client);


