class Board {
  constructor(id, name, description, projectId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.projectId = projectId;
  }
  static fromDB(dbBoard) {
    return new Board(
      dbBoard.board_id,
      dbBoard.board_name,
      dbBoard.description,
      dbBoard.project_id);
  }
}

module.exports = Board;
