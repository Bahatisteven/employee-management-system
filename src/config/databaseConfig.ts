import mongoose from "mongoose";
export const databaseConnection = async () => {
  var db_url: string = process.env.DATABASE_URL as string;
  const db_username: string = process.env.DATABASE_USERNAME as string;
  const db_password: string = process.env.DATABASE_PASSWORD as string;
  const db_name: string = process.env.DATABASE_NAME as string;

  const [path, query] = db_url.split("?");
  db_url = `${path}${db_name}?${query}`;

  db_url = db_url
    .replace("db_username", db_username)
    .replace("db_password", db_password);
  await mongoose.connect(db_url).then((value) => {
    console.log("Database Connected Successfully");
  });
};
