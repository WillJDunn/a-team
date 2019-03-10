class Project {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
  static fromDB(dbProject) {
    return new Project(
      dbProject.project_id,
      dbProject.project_name,
      dbProject.description);
  }
}

module.exports = Project;
