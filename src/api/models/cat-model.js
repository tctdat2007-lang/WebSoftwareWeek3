import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(`
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users
    ON wsk_cats.owner = wsk_users.user_id
  `);

  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users
    ON wsk_cats.owner = wsk_users.user_id
    WHERE wsk_cats.cat_id = ?
    `,
    [id]
  );

  if (rows.length === 0) {
    return false;
  }

  return rows[0];
};

const findCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    `
    SELECT wsk_cats.*, wsk_users.name AS owner_name
    FROM wsk_cats
    JOIN wsk_users
    ON wsk_cats.owner = wsk_users.user_id
    WHERE wsk_cats.owner = ?
    `,
    [id]
  );

  return rows;
};

const addCat = async (cat) => {
  const {
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  } = cat;

  const sql = `
    INSERT INTO wsk_cats
    (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  ];

  const [rows] = await promisePool.execute(sql, params);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {
    cat_id: rows.insertId,
  };
};

const modifyCat = async (cat, id, user) => {
  let sql;

  if (user.role === 'admin') {
    sql = promisePool.format(
      'UPDATE wsk_cats SET ? WHERE cat_id = ?',
      [cat, id]
    );
  } else {
    sql = promisePool.format(
      'UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?',
      [cat, id, user.user_id]
    );
  }

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {
    message: 'success',
  };
};

const removeCat = async (id, user) => {
  let rows;

  if (user.role === 'admin') {
    [rows] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ?',
      [id]
    );
  } else {
    [rows] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
      [id, user.user_id]
    );
  }

  if (rows.affectedRows === 0) {
    return false;
  }

  return {
    message: 'success',
  };
};

export {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
};
