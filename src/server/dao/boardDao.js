const db = require('./PooledDatabaseConnection');
const Board = require('../dto/Board');

const getBoards = () => {
  const sql = 'SELECT * FROM teama.boards';
  return db.query(sql)
    .then(results => results.map(result => Board.fromDB(result)));
};

const getBoardsForProject = projectId => {
  const sql = 'SELECT * FROM teama.boards WHERE project_id = ?';
  return db.query(sql, [projectId])
    .then(results => results.map(result => Board.fromDB(result)));
};

const createBoardForProject = (projectId, board) => {
  console.log('Creating new board in db', board);
  const values = [
    [board.name, board.description, projectId],
  ];
  const sql = 'INSERT INTO teama.boards (board_name, description, project_id) VALUES ?';
  return db.query(sql, [values]);
};

module.exports = {
  getBoards,
  getBoardsForProject,
  createBoardForProject,
};
