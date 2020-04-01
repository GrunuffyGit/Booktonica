const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const BooktonicaDatabase = require('./src/booktonica-database');

/**
 * A way to change the defaults.
 * You can run this app like:
 * `DB_NAME=osito npm start` and it will
 * use the DB named osito instead of DEFAULT_DB_NAME.
 */
const DEFAULT_PORT = 3001;
const PORT = process.env.PORT || DEFAULT_PORT;
const DEFAULT_DB_NAME = 'booktonica';
const dbName = process.env.DB_NAME || DEFAULT_DB_NAME;
const db = new BooktonicaDatabase(dbName);

const api = express();

// Middlewares
api.use(morgan('tiny'));
api.use(bodyParser.json());

/**
 * This will just print the incoming request bodies
 * which is useful for debugging. You can skip it if you want
 * by removing
 */
const bodyDebugMiddleware = require('./src/body-debug-middleware');
api.use(bodyDebugMiddleware);

/**
 * Creates a new database object.
 * Add new database queries there.
 */
// const db = new BooktonicaDb(DB_NAME);

// GET 
api.get('/books', (_unused, res) =>
  db.getAllBooks().then(books => res.send(books))
);

api.get('/check_user_exist/:username', (req, res) =>
  db.hasUser(req.params.username).then(hasUser => res.send(hasUser))
);

api.get('/userid/:username', (req, res) =>
  db.getUserId(req.params.username).then(userid => res.send(userid))
);

api.get('/userInfo/:userId', (req, res) =>
  db.getUserInfo(req.params.userId).then(userInfo => res.send(userInfo))
);

api.get('/lists/:listId', (req, res) =>
  db.getList(req.params.listId).then(list => res.send(list))
);

api.get('/check_log/:id', (req, res) =>
  db.hasUserLogin(req.params.id).then(hasUserLogin => res.send(hasUserLogin))
);

// POST
api.post('/has_user_pass', (req, res) =>
  db.hasUserPass(req.body).then(hasUserPass => res.send(hasUserPass))
);

api.post('/add_user', (req, res) => 
  db.createUser(req.body).then(user => res.send(user))
);

api.post('/add_list', (req, res) => 
  db.createList(req.body).then(list => res.send(list))
);

api.post('/add_book', (req, res) =>
  db.addBookToList(req.body).then(list => res.send(list))
);

api.post('/log_user_in/:id', (req,res) =>
  db.loginUser(req.params.id).then(id => res.send(id))
);

// DELETE
api.delete('/remove_list/:listId', (req,_) => 
  db.deleteList(req.params.listId)
);

api.delete('/remove_book_from_list/:bookListId', (req,_) => 
  db.deleteBookFromList(req.params.bookListId)
);

api.delete('/log_user_out/:id', (req,_) => 
  db.logoutUser(req.params.id)
);

// sanityCheck will make sure the DB is working before listening
db.sanityCheck().then(() => {
  api.listen(PORT, () => {
    console.log(`
    
      📚 booktonica express api listening on port ${PORT}
      
    `);
  });
});
