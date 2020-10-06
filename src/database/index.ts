import { createConnection } from 'typeorm';

// searches for a file called "ormconfig.json"
// if it finds, it will read the data and create a new connection
createConnection();