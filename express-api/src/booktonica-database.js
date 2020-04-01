const pgp = require('pg-promise')();

/**
 * An object that has methods matching useful database queries.
 * Use `this.db` to access a connected pg-promise connection.
 * Make sure to return the promise!
 *
 * For examples of other queries, see
 * [pghttps://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
 */
class BooktonicaDatabase {
  /**
   * @param {String} name - name of database to connect to
   */
  constructor(name) {
    const connectionString = `postgres://localhost:5432/${name}`;
    console.log('Postgres DB => ', connectionString);
    this.db = pgp(connectionString);
  }

  sanityCheck() {
    console.log('\tTesting database connection...');
    return this.getBooksCount().then(count =>
      console.log(`\t✔️ Found ${count} books.`)
    );
  }

  getBooksCount() {
    return this.db.one('SELECT count(*) FROM books').then(r => r.count);
  }

  getAllBooks() {
    return this.db.any(
      `SELECT 
        b.id,
        b.title,
        b.subtitle,
        b.summary,
        b.cover_image_url,
        to_char(b.publication_date, 'DD Mon YYYY') as publication_date, 
        a.name AS author_name FROM books b 
        INNER JOIN authors a on a.id = b.author_id
        ORDER BY b.publication_date DESC`
    );
  }

  hasUser(username){
    return this.db.query(`SELECT exists (SELECT * FROM users WHERE username = $1);`,[username]);
  }

  createUser(body){
    const {username, password} = body;
    return this.db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;`,
      [username, password]);
  }

  getUserInfo(id){
    id = parseInt(id);
    return this.db.query(`
      SELECT
        users.id AS user_id,
        username AS username,
        book_list.id AS list_id,
        book_list.name AS list_name,
        book_list.created_on AS list_creation_date,
        books_in_list.id AS book_in_list_id,
        books_in_list.created_on AS book_added_date,
        books.id AS id,
        books.cover_image_url AS cover_image_url,
        books.summary AS summary,
        authors.name AS author_name,
        books.publication_date AS publication_date,
        books.title AS title 
      FROM users
        LEFT OUTER JOIN book_list ON users.id = book_list.created_by
        LEFT OUTER JOIN books_in_list ON book_list.id = books_in_list.book_list_id
        LEFT OUTER JOIN books ON books_in_list.book_id = books.id
        LEFT OUTER JOIN authors ON books.author_id = authors.id
      WHERE users.id = ${id}
      ORDER BY 
        book_list.name ASC, 
        books_in_list.created_on ASC;`
      );
  }

  createList(body){
    console.log(body);
    let today = new Date();
    const {name, description, created_by} = body; 
    return this.db.query(
      `INSERT INTO book_list (name, description, created_by, created_on) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [name, description, created_by, today]);
  }
  
  getList(id){
    id = parseInt(id);
    return this.db.query(`SELECT * FROM book_list WHERE user_id = ${id}`);
  }

  deleteList(list_id){
    list_id = parseInt(list_id);
    return this.db.query(`DELETE FROM book_list WHERE id = ${list_id};`);
  }

  addBookToList(body){
    let today = new Date();
    const {list_id, book_id} = body;
    return this.db.query(
      `INSERT INTO books_in_list (book_list_id, book_id, created_on) VALUES ($1, $2, $3) RETURNING *;`,
      [list_id, book_id, today]);
  }
  
  deleteBookFromList(book_in_list_id){
    book_in_list_id = parseInt(book_in_list_id);
    return this.db.query(`DELETE FROM books_in_list WHERE id = ${book_in_list_id};`);
  }

  hasUserPass(userPassJson){
    const {username, password} = userPassJson;
    return this.db.query(`SELECT exists (SELECT * FROM users WHERE username = $1 AND password = $2);`,[username, password]);
  }

  getUserId(username){
    return this.db.query(`SELECT id FROM users WHERE username = $1;`,[username]);
  }

  loginUser(id){
    id = parseInt(id);
    return this.db.query(`INSERT INTO user_log (logged_in) VALUES ($1)`, [id]);
  }

  hasUserLogin(id){
    id = parseInt(id);
    return this.db.query(`SELECT exists (SELECT * FROM user_log WHERE logged_in = ${id});`)
  }

  logoutUser(id){
    id = parseInt(id);
    return this.db.query(`DELETE FROM user_log WHERE logged_in = ${id}`);
  }
  
}

module.exports = BooktonicaDatabase;
