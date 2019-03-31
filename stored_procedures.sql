-- Updated Sat 30 Mar 2019 01:32:15 PM PDT
-- Note: also included in teama_schema.sql
-- -----------------------------------------------------
-- procedure add_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_user`;

DELIMITER $$
USE `teama`$$
-- Per NIST best practices accepts passwords up to 64 characters
-- passwords will be hashed with SHA2 encryption
CREATE PROCEDURE `add_user` (
  IN in_user_name VARCHAR(45),
  IN in_password VARCHAR(64),
  IN in_email VARCHAR(45),
  OUT out_id INT)
BEGIN
INSERT INTO users (user_name, password, email, registered_at)
  VALUES (in_user_name, SHA2(in_password, 256), in_email, NOW());
SELECT LAST_INSERT_ID() INTO @out_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_project_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_project_user`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `add_project_user` (
  IN in_project_id INT,
  IN in_user_id INT,
  IN in_is_admin TINYINT,
  IN in_added_by INT)
BEGIN
INSERT INTO project_users (project_id, user_id, is_admin, added_by, added_at)
  VALUES (in_project_id, in_user_id, in_is_admin, in_added_by, NOW());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_project
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_project`;

DELIMITER $$
USE `teama`$$
-- Note: when adding a project you should also execute add_project_user with the returned out_id
-- as project_id, the user_id of the user that created the project, and is_admin = True (1)
-- Also inserts into table priorities. The inserted rows include each row from the default_priorities
-- table along with the project_id created in this procedure
CREATE PROCEDURE `add_project` (
  IN in_project_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO projects (project_name, description)
  VALUES (in_project_name, in_description);
SELECT LAST_INSERT_ID() INTO @out_id;
INSERT INTO priorities (project_id, priority_rank, priority_name, description)
  SELECT @out_id, default_priorities.priority_rank, default_priorities.priority_name, default_priorities.description 
  FROM default_priorities;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_priority
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_priority`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `add_priority` (
  IN in_project_id INT,
  IN in_priority_rank INT,
  IN in_priority_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO priorities (project_id, priority_rank, priority_name, description)
  VALUES (in_project_id, in_priority_rank, in_priority_name, in_description);
SELECT LAST_INSERT_ID() INTO @out_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_board_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_board_user`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `add_board_user` (
  IN in_board_id INT,
  IN in_user_id INT,
  IN in_is_admin TINYINT,
  IN in_added_by INT)
BEGIN
INSERT INTO board_users (board_id, user_id, is_admin, added_by, added_at)
  VALUES (in_board_id, in_user_id, in_is_admin, in_added_by, NOW());
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_board
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_board`;

DELIMITER $$
USE `teama`$$
-- Note: when adding a board you should also execute add_board_user with the returned out_id
-- as board_id, the user_id of the user that created the board, and is_admin = True (1)
-- Also inserts into table statuses. The inserted rows include each row from the default_statuses
-- table along with the board_id created in this procedure
CREATE PROCEDURE `add_board` (
  IN in_project_id INT,
  IN in_board_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO boards (project_id, board_name, description)
  VALUES (in_project_id, in_board_name, in_description);
SELECT LAST_INSERT_ID() INTO @out_id;
INSERT INTO statuses (board_id, status_rank, status_name, description)
  SELECT @out_id, default_statuses.status_rank, default_statuses.status_name, default_statuses.description 
  FROM default_statuses;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_status
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_status`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `add_status` (
  IN in_board_id INT,
  IN in_status_rank INT,
  IN in_status_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT)
BEGIN
INSERT INTO statuses (board_id, status_rank, status_name, description)
  VALUES (in_board_id, in_status_rank, in_status_name, in_description);
SELECT LAST_INSERT_ID() INTO @out_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_comment
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_comment`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `add_comment` (
  IN in_item_id INT,
  IN in_user_id INT,
  IN in_comment TEXT,
  OUT out_id INT)
BEGIN
INSERT INTO comments (item_id, user_id, created_at, comment)
  VALUES (in_item_id, in_user_id, NOW(), in_comment);
SELECT LAST_INSERT_ID() INTO @out_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure add_item
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`add_item`;

DELIMITER $$
USE `teama`$$
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
INSERT INTO items (project_id, board_id, status_id, priority_id, is_issue, item_name, description, due_date, time_estimate, created_by, assigned_to, labels, created_at)
  VALUES (in_project_id, in_board_id, in_status_id, in_priority_id, in_is_issue, in_item_name, in_description, in_due_date, in_time_estimate, in_created_by, in_assigned_to, in_labels, NOW());
SELECT LAST_INSERT_ID() INTO @out_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_project
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_project`;

DELIMITER $$
USE `teama`$$
-- Important: many values of other tables are deleted via cascading deletes!
--   - related rows of the table: priorities will be cascade deleted
--   - related rows of the table: items will be cascade deleted
--     - related rows of the table: comments will be cascade deleted
CREATE PROCEDURE `delete_project` (IN in_project_id INT)
BEGIN
DELETE FROM projects WHERE project_id = in_project_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_user`;

DELIMITER $$
USE `teama`$$
-- Important: this does not actually remove the user from the users table!
--   Instead, we set the 'deactivated' field = true, set the password field to
-- 	 null, and remove them from the project_users and board_users tables.
--   We do this instead of actually deleting it from the users table because
--   there are rows referencing this value in tables like `items` and `comments` tables,
--   which we want to persist. This still prevents the user from being able to
--   login and access data but we can still have their user_name displayed when
--   presenting comments or items they made
--   - sets `password` to NULL
--   - sets `deactivated` to TRUE
--   - removes related rows of the table: project_users
--   - related rows of the table: board_users
CREATE PROCEDURE `delete_user` (IN in_user_id INT)
BEGIN
UPDATE users SET password = NULL WHERE user_id = in_user_id;
UPDATE users SET deactivated = TRUE WHERE user_id = in_user_id;
DELETE FROM project_users WHERE user_id = in_user_id;
DELETE FROM board_users WHERE user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_board
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_board`;

DELIMITER $$
USE `teama`$$
-- - Important: rows of the `statuses` table are deleted from cascading deletes!
--   - related rows of the statuses table are removed via cascading deletes
--   - removes rows of the `items` table that are associated with this board_id
--     that are NOT issues (issues should persist since they are related to the project_id)
--     - rows of the `comments` table related to deleted items are removed via cascading delete
CREATE PROCEDURE `delete_board` (IN in_board_id INT)
BEGIN
-- Note: deletes of `items` will result in cascade deletes of `comments`
DELETE FROM items WHERE board_id = in_board_id AND is_issue = FALSE;
-- Note: deletes from `boards` will result in cascade deletes of `statuses`
DELETE FROM boards WHERE board_id = in_board_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_project_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_project_user`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `delete_project_user` (
  IN in_project_id INT,
  IN in_user_id INT)
BEGIN
DELETE FROM project_users WHERE project_id = in_project_id AND user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_board_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_board_user`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `delete_board_user` (
  IN in_board_id INT,
  IN in_user_id INT)
BEGIN
DELETE FROM board_users WHERE board_id = in_board_id AND user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_item
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_item`;

DELIMITER $$
USE `teama`$$
-- Important: related rows of the `comments` table will be deleted via cascade delete
CREATE PROCEDURE `delete_item` (IN in_item_id INT)
BEGIN
-- Note: related rows of `comments` table are cascade deleted
DELETE FROM items WHERE item_id = in_item_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_comment
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_comment`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `delete_comment` (IN in_comment_id INT)
BEGIN
DELETE FROM comments WHERE comment_id = in_comment_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_board
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_board`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `edit_board` (
  IN in_board_id INT,
  IN in_board_name VARCHAR(45),
  IN in_description VARCHAR(255))
BEGIN
UPDATE boards SET board_name = in_board_name, description = in_description WHERE board_id = in_board_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure grant_board_admin
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`grant_board_admin`;

DELIMITER $$
USE `teama`$$
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CREATE PROCEDURE `grant_board_admin` (
  IN in_board_id INT,
  IN in_user_id INT,
  IN in_modified_by INT)
BEGIN
UPDATE board_users SET is_admin = TRUE, added_by = in_added_by WHERE board_id = in_board_id AND user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure revoke_board_admin
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`revoke_board_admin`;

DELIMITER $$
USE `teama`$$
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CREATE PROCEDURE `revoke_board_admin` (
  IN in_board_id INT,
  IN in_user_id INT,
  IN in_modified_by INT)
BEGIN
UPDATE board_users SET is_admin = FALSE, added_by = in_modified_by WHERE board_id = in_board_id AND user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_comment
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_comment`;

DELIMITER $$
USE `teama`$$
-- Note: you may want to append additional text to the updated comment such
-- as UPDATED <<timestamp>> so end users can know that the comment has been
-- updated. We do not do that in the procedure so application can control that
CREATE PROCEDURE `edit_comment` (
  IN in_comment_id INT,
  IN in_comment TEXT)
BEGIN
UPDATE comments SET comment = in_comment WHERE comment_id = in_comment_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_item
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_item`;

DELIMITER $$
USE `teama`$$
-- Note: when editing an item you should probably also add a comment (via add_comment)
-- showing the old/new values for the modified fields and who modified it for audit
CREATE PROCEDURE `edit_item` (
  IN in_item_id INT,
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
  IN in_labels VARCHAR(255))
BEGIN
UPDATE items SET board_id = in_board_id, status_id = in_status_id, priority_id = in_priority_id,
  is_issue = in_is_issue, item_name = in_item_name, description = in_description, due_date = in_due_date,
  time_estimate = in_time_estimate, created_by = in_created_by, assigned_to = in_assigned_to, labels = in_labels
WHERE item_id = in_item_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_priority
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_priority`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `edit_priority` (
  IN in_priority_id INT,
  IN in_priority_rank INT,
  IN in_priority_name VARCHAR(45),
  IN in_description VARCHAR(255))
BEGIN
UPDATE priorities SET priority_rank = in_priority_rank, priority_name = in_priority_name, description = in_description
WHERE priority_id = in_priority_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_priority
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_priority`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `delete_priority` (IN in_priority_id INT)
BEGIN
DELETE FROM priorities WHERE priority_id = in_priority_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_status
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_status`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `edit_status` (
  IN in_status_id INT,
  IN in_status_rank INT,
  IN in_status_name VARCHAR(45),
  IN in_description VARCHAR(255))
BEGIN
UPDATE statuses SET status_rank = in_status_rank, status_name = in_status_name, description = in_description
WHERE status_id = in_status_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_status
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`delete_status`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `delete_status` (IN in_status_id INT)
BEGIN
DELETE FROM statuses WHERE status_id = in_status_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_user_password_by_user_id
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`check_user_password_by_user_id`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `check_user_password_by_user_id` (
  IN in_user_id VARCHAR(45),
  IN in_password VARCHAR(64))
BEGIN
-- Looks up user_id and SHA2 encrypted password, returns user_id if there's a match on both
SELECT user_id FROM users WHERE user_id = in_user_id AND password = SHA2(in_password, 256);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_user_password_by_user_name
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`check_user_password_by_user_name`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `check_user_password_by_user_name` (
  IN in_user_name VARCHAR(45),
  IN in_password VARCHAR(64))
BEGIN
-- Looks up user_name and SHA2 encrypted password, returns user_id if there's a match on both
SELECT user_id FROM users WHERE user_name = in_user_name AND password = SHA2(in_password, 256);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure check_user_password_by_email
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`check_user_password_by_email`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `check_user_password_by_email` (
  IN in_email VARCHAR(45),
  IN in_password VARCHAR(64))
BEGIN
-- Looks up user_name and SHA2 encrypted password, returns user_id if there's a match on both
SELECT user_id FROM users WHERE email = in_email AND password = SHA2(in_password, 256);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_user
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_user`;

DELIMITER $$
USE `teama`$$
-- Per NIST best practices accepts passwords up to 64 characters
-- passwords will be hashed with SHA2 encryption
CREATE PROCEDURE `edit_user` (
  IN in_user_id INT,
  IN in_user_name VARCHAR(45),
  IN in_password VARCHAR(64),
  IN in_email VARCHAR(45))
BEGIN
UPDATE users SET user_name = in_user_name, password = SHA2(in_password, 256), email = in_email
WHERE user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure edit_project
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`edit_project`;

DELIMITER $$
USE `teama`$$
CREATE PROCEDURE `edit_project` (
  IN in_project_id INT,
  IN in_project_name VARCHAR(45),
  IN in_description VARCHAR(255))
BEGIN
UPDATE projects SET project_name = in_project_name, description = in_description
WHERE project_id = in_project_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure grant_project_admin
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`grant_project_admin`;

DELIMITER $$
USE `teama`$$
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CREATE PROCEDURE `grant_project_admin` (
  IN in_project_id INT,
  IN in_user_id INT,
  IN in_modified_by INT)
BEGIN
UPDATE project_users SET is_admin = TRUE, added_by = in_modified_by WHERE project_id = in_project_id AND user_id = in_user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure revoke_project_admin
-- -----------------------------------------------------

USE `teama`;
DROP procedure IF EXISTS `teama`.`revoke_project_admin`;

DELIMITER $$
USE `teama`$$
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CREATE PROCEDURE `revoke_project_admin` (
  IN in_board_id INT,
  IN in_user_id INT,
  IN in_modified_by INT)
BEGIN
UPDATE project_users SET is_admin = FALSE, added_by = in_modified_by WHERE project_id = in_project_id AND user_id = in_user_id;
END$$

DELIMITER ;
