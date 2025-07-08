require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../db');

const FIELD_MAP = {
  "user.id": "token",
  "user.email": "email",
  "user.firstName": "first_name",
  "user.lastName": "last_name",
  "user.created": "created_at",
  "user.lastLogin": "last_login_at"
};

function mapFields(row) {
  const mapped = {};
  for (const [csvField, dbField] of Object.entries(FIELD_MAP)) {
    mapped[dbField] = row[csvField] || null;
  }
  return mapped;
}

async function main(filePath) {
  if (!filePath) {
    console.error('Usage: node import-okta-csv.js <csv-file-path>');
    process.exit(1);
  }

  console.log('====================Input Okta CSV====================');
  console.log('user=',process.env.MYSQL_USER,'password=','<HIDDEN>','host=',process.env.MYSQL_HOST,'host=',process.env.MYSQL_PORT,'host=',process.env.MYSQL_DATABASE);

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const insertUser = async (user) => {
    const sql = `
      INSERT INTO user (token, email, first_name, last_name, created_at, last_login_at, role, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.execute(sql, [
      user.token,
      user.email,
      user.first_name,
      user.last_name,
      user.created_at,
      user.last_login_at,
      'user',         // role
      'inactive'      // status
    ]);
    console.log(`Inserted user: ${user.email} (${user.token})`);
  };

  const updateUserLoginTime = async (user) => {
    const sql = `
      UPDATE user SET created_at = ?, last_login_at = ? WHERE token = ? AND email = ?
    `;
    await db.execute(sql, [
      user.created_at,
      user.last_login_at,
      user.token,
      user.email
    ]);
    console.log(`Updated login time for existing user: ${user.email} (${user.token})`);
  };

  const userExists = async (token, email) => {
    const [rows] = await db.execute(
      `SELECT 1 FROM user WHERE token = ? AND email = ? LIMIT 1`,
      [token, email]
    );
    return rows.length > 0;
  };

  const processCSV = () => {
    return new Promise((resolve, reject) => {
      const tasks = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const task = (async () => {
            try {
              if (
                row['user.status'] &&
                row['user.status'].toLowerCase() === 'active'
              ) {
                const user = mapFields(row);

                if (await userExists(user.token, user.email)) {
                  await updateUserLoginTime(user);
                  updatedCount++;
                } else {
                  await insertUser(user);
                  insertedCount++;
                }
              } else {
                skippedCount++;
                console.log(`Skipped inactive user: ${row['user.email']} (${row['user.id']})`);
              }
            } catch (err) {
              console.error('Error processing row:', err.message);
            }
          })();

          tasks.push(task);
        })
        .on('end', async () => {
          try {
            await Promise.all(tasks); // wait for all inserts/updates
            console.log('\nCSV import complete.');
            console.log(`Inserted users: ${insertedCount}`);
            console.log(`Updated existing users: ${updatedCount}`);
            console.log(`Skipped users (inactive): ${skippedCount}`);
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', reject);
    });
  };

  try {
    await processCSV();
  } catch (err) {
    console.error('Error processing CSV:', err.message);
  } finally {
    await db.end();
  }

  console.log('======================================================');
}

const filePath = process.argv[2];
main(filePath);
