class StatusForBoard {
  constructor(statusId, boardId, statusRank, statusName, description) {
    this.id = statusId;
    this.boardId = boardId;
    this.rank = statusRank;
    this.name = statusName;
    this.description = description;
  }
  static fromDB(dbStatus) {
    return new StatusForBoard(
      dbStatus.status_id,
      dbStatus.board_id,
      dbStatus.status_rank,
      dbStatus.status_name,
      dbStatus.description
    );
  }
}

module.exports = StatusForBoard;
