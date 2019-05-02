const db = require('./PooledDatabaseConnection');
const Board = require('../dto/Board');
const StatusForBoard = require('../dto/StatusForBoard');
const Item = require('../dto/Item');


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

const getBoardById = boardId => {
  const sql = 'SELECT * FROM teama.boards WHERE board_id = ?';
  return db.query(sql, [boardId])
    .then(results => results.map(result => Board.fromDB(result))[0]);
};

const createBoardForProject = (projectId, board) => {
  const values = [projectId, board.name, board.description];
  const sql = 'CALL add_board(?, ?, ?);';
  return db.query(sql, values)
    .then(dbRes => dbRes[0][0].board_id);
};

const getStatusesForBoard = boardId => {
  const sql = 'SELECT * FROM teama.statuses WHERE board_id = ?';
  return db.query(sql, [boardId])
    .then(results => results.map(result => StatusForBoard.fromDB(result)));
};

const getItemsForBoard = boardId => {
  const sql = 'SELECT * FROM teama.v_items WHERE board_id = ?';
  return db.query(sql, [boardId])
    .then(results => results.map(result => Item.fromDB(result)));
};

const getRequirementsForBoard = boardId => {
  const sql = 'SELECT * FROM teama.v_items WHERE board_id = ? and is_issue = FALSE';
  return db.query(sql, [boardId])
    .then(results => results.map(result => Item.fromDB(result)));
};

const getIssuesForBoard = boardId => {
  const sql = 'SELECT * FROM teama.v_items WHERE board_id = ? and is_issue = TRUE';
  return db.query(sql, [boardId])
    .then(results => results.map(result => Item.fromDB(result)));
};

const createItemForBoard = (boardId, item) => {
  const values = [item.projectId, item.boardId, item.statusId, item.priorityId, item.isIssue,
    item.name, item.description, item.dueDate, item.timeEstimate, item.createdBy, item.assignedTo, item.labels];
  console.log(values);
  const sql = 'CALL add_item(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  return db.query(sql, values)
    .then(dbRes => {
      console.log(dbRes);
      return dbRes[0][0].item_id;
    });
};

module.exports = {
  getBoards,
  getBoardById,
  getBoardsForProject,
  createBoardForProject,
  getStatusesForBoard,
  getItemsForBoard,
  getRequirementsForBoard,
  getIssuesForBoard,
  createItemForBoard,
};
