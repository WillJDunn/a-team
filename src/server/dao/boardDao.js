const db = require('./PooledDatabaseConnection');
const Board = require('../dto/Board');

//api/boards/GET: Get a list of boards
const getBoards = () => {
  const sql = 'SELECT * FROM teama.boards';
  return db.query(sql)
      .then(results => results.map(result => Board.fromDB(result)));
};


//api/boards/:boardId/GET:  Get a specific board by board id
const getBoardsForProject = projectId => {
  const sql = 'SELECT * FROM teama.boards WHERE project_id = ?';
  return db.query(sql, [projectId])
      .then(results => results.map(result => Board.fromDB(result)));
};


//api/boards/POST: Create a new board
const createBoardForProject = (projectId, board) => {
  console.log('Creating new board in db', board);
  const values = [projectId, board.name, board.description];
  const sql = 'SET @insertId = 0; CALL add_board(?, ?, ?, @insertId); SELECT @insertId as insertId';
  return db.query(sql, values);
};


module.exports = {
  getBoards,
  getBoardsForProject,
  createBoardForProject,
};
