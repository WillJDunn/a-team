const db = require('./PooledDatabaseConnection');
const Board = require('../dto/Board');

//api/boards/GET: Get a list of boards
const getBoards = () => {
  const sql = 'SELECT * FROM teama.boards';
  return db.query(sql)
      .then(results => results.map(result => Board.fromDB(result)));
};

//api/boards/:projectId/GET:  Get a specific board by project id
const getBoardsForProject = projectId => {
  const sql = 'SELECT * FROM teama.boards WHERE project_id = ?';
  return db.query(sql, [projectId])
      .then(results => results.map(result => Board.fromDB(result)));
};

// api/boards/:boardId/GET:  Get a specific board by board id
const getBoardById = (boardId) => {
  const sql = 'SELECT * FROM teama.boards WHERE board_id = ?';
  return db.query(sql, [boardId])
      .then(results => results.map(result => Board.fromDB(result)));
};



//api/boards/POST: Create a new board for project
const createBoardForProject = (projectId,board) => {
  console.log('Creating new board in db', board);
  const values = [projectId, board.name, board.description];
  const sql = 'CALL add_board(?, ?, ?)';
  return db.query(sql, values)
      .then(dbRes => {
        const rows = dbRes[dbRes.length - 1];
        return rows[0].boardId;
      });
  ;
};

module.exports = {
  getBoards,
  getBoardById,
  getBoardsForProject,
  createBoardForProject,
};





