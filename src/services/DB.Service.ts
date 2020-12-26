import { authDB } from "./database/AuthDB.Service";

export const closeDatabases = () => {
  authDB.close();
};
