import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(() => {
    /* eslint-disable */
    console.log("Database has been connected successfully.");
  })
  .catch((err) => {
    /* eslint-disable */
    console.error("Error during connecting to database", err);
  });
