import { pool } from "../index.js";
import { dropAllTables } from "./helpers.js";

try {
  await dropAllTables();
  console.log("Dropped all tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
