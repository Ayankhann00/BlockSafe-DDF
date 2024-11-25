
import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6742315f001912d8f511'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';

