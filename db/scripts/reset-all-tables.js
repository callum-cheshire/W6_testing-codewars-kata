import { pool } from "../index.js";
import { resetAllTables } from "./helpers.js";

try {
  await resetAllTables();
  console.log("Reset all tables");
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}
