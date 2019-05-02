class Item {
  constructor(
    itemId,
    statusId,
    statusName,
    priorityId,
    priorityName,
    isIssue,
    name,
    description,
    dueDate,
    timeEstimate,
    createdBy,
    createdByName,
    assignedTo,
    assignedToName,
    labels,
    createdAt) {
    this.id = itemId;
    this.statusId = statusId;
    this.statusName = statusName;
    this.priorityId = priorityId;
    this.priorityName = priorityName;
    this.isIssue = isIssue;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.timeEstimate = timeEstimate;
    this.createdBy = createdBy;
    this.createdByName = createdByName;
    this.assignedTo = assignedTo;
    this.assignedToName = assignedToName;
    this.labels = labels;
    this.createdAt = createdAt;
  }
  static fromDB(dbItem) {
    return new Item(
      dbItem.item_id,
      dbItem.status_id,
      dbItem.status_name,
      dbItem.priority_id,
      dbItem.priority_name,
      dbItem.is_issue,
      dbItem.item_name,
      dbItem.description,
      dbItem.due_date,
      dbItem.time_estimate,
      dbItem.created_by,
      dbItem.created_by_name,
      dbItem.assigned_to,
      dbItem.assigned_to_name,
      dbItem.labels,
      dbItem.created_at
    );
  }
}

module.exports = Item;
