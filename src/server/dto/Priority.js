class Priority {
  constructor(priorityId, projectId, priorityRank, priorityName, description) {
    this.id = priorityId;
    this.projectId = projectId;
    this.rank = priorityRank;
    this.name = priorityName;
    this.description = description;
  }
  static fromDB(dbPriority) {
    return new Priority(
      dbPriority.priority_id,
      dbPriority.project_id,
      dbPriority.priority_rank,
      dbPriority.priority_name,
      dbPriority.description
    );
  }
}

module.exports = Priority;
