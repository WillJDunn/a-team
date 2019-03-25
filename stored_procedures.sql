CREATE PROCEDURE `add_user` (
  IN in_user_name VARCHAR(45),
  IN in_password VARBINARY(256),
  IN in_email VARCHAR(45),
  IN in_registered_at DATETIME,
  OUT out_id INT)
BEGIN
  INSERT INTO users (user_name, password, email, registered_at)
  VALUES (in_user_name, in_password, in_email, in_registered_at);
  SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_project_user` (
  IN in_project_id INT,
  IN in_user_id INT,
  IN in_is_admin TINYINT,
  IN in_added_by INT,
  IN in_added_at DATETIME,
  OUT out_id INT)
BEGIN
INSERT INTO project_users (project_id, user_id, is_admin, added_by, added_at)
VALUES (in_project_id, in_user_id, in_is_admin, in_added_by, in_added_at);
SELECT LAST_INSERT_ID() INTO out_id;
END;

-- Note: when adding a project you should also execute add_project_user with the returned out_id
-- as project_id, the user_id of the user that created the project, and is_admin = True (1)
-- FIXME not sure what this is attempting to do.  project_users doesn't have project_name or description columns
# CREATE PROCEDURE `add_project` (
#   IN in_project_name VARCHAR(45),
#   IN in_description VARCHAR(255),
#   OUT out_id INT)
# BEGIN
#   INSERT INTO project_users (project_name, description)
#   VALUES (in_project_name, in_description);
#   SELECT LAST_INSERT_ID() INTO out_id;
# END;


CREATE PROCEDURE `add_priority` (
  IN in_project_id INT,
  IN in_priority_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO priorities (project_id, priority_name, description)
VALUES (in_project_id, in_priority_name, in_description);
SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_board_user` (
  IN in_board_id INT,
  IN in_user_id INT,
  IN in_is_admin TINYINT,
  IN in_added_by INT,
  IN in_added_at DATETIME,
  OUT out_id INT)
BEGIN
  INSERT INTO board_users (board_id, user_id, is_admin, added_by, added_at)
  VALUES (in_board_id, in_user_id, in_is_admin, in_added_by, in_added_at);
  SELECT LAST_INSERT_ID() INTO out_id;
END;


-- Note: when adding a project you should also execute add_board_user with the returned out_id
-- as board_id, the user_id of the user that created the project, and is_admin = True (1)
CREATE PROCEDURE `add_board` (
  IN in_project_id INT,
  IN in_board_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO boards (project_id, board_name, description)
VALUES (in_project_id, in_board_name, in_description);
SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_status` (
  IN in_board_id INT,
  IN in_status_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
  INSERT INTO statuses (board_id, status_name, description)
  VALUES (in_board_id, in_status_name, in_description);
  SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_item` (
  IN in_project_id INT,
  IN in_board_id INT,
  IN in_status_id INT,
  IN in_priority_id INT,
  IN in_is_issue TINYINT,
  IN in_item_name VARCHAR(45),
  IN in_description MEDIUMTEXT,
  IN in_due_date DATETIME,
  IN in_time_estimate INT,
  IN in_created_by INT,
  IN in_assigned_to INT,
  IN in_labels VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO items (project_id, board_id, status_id, priority_id, is_issue, item_name, description, due_date, time_estimate, created_by, assigned_to, labels)
VALUES (in_project_id, in_board_id, in_status_id, in_priority_id, in_is_issue, in_item_name, in_description, in_due_date, in_time_estimate, in_created_by, in_assigned_to, in_labels);
SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_comment` (
  IN in_item_id INT,
  IN in_user_id INT,
  IN in_created_at DATETIME,
  IN in_comment TINYTEXT,
  OUT out_id INT)
BEGIN
  INSERT INTO comments (item_id, user_id, created_at, comment)
  VALUES (in_item_id, in_user_id, in_created_at, in_comment);
  SELECT LAST_INSERT_ID() INTO out_id;
END;


CREATE PROCEDURE `add_time_entry` (
  IN in_item_id INT,
  IN in_user_id INT,
  IN in_created_at DATETIME,
  IN in_comment TINYTEXT,
  OUT out_id INT)
BEGIN
INSERT INTO comments (item_id, user_id, created_at, comment)
VALUES (in_item_id, in_user_id, in_created_at, in_comment);
SELECT LAST_INSERT_ID() INTO out_id;
END;

