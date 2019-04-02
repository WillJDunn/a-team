-- Sun 31 Mar 2019 04:28:25 PM PDT

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teama
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teama
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teama` ;
USE `teama` ;

-- -----------------------------------------------------
-- Table `teama`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`users` ;

CREATE TABLE IF NOT EXISTS `teama`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARBINARY(256) NULL,
  `email` VARCHAR(45) NOT NULL,
  `email_verified` TINYINT NULL DEFAULT 0,
  `registered_at` DATETIME NULL DEFAULT NOW(),
  `deactivated` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  INDEX `idx_user_name` (`user_name` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idx_deactivated` (`deactivated` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`projects` ;

CREATE TABLE IF NOT EXISTS `teama`.`projects` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`project_id`),
  INDEX `idx_project_name` (`project_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`project_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`project_users` ;

CREATE TABLE IF NOT EXISTS `teama`.`project_users` (
  `project_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `is_admin` TINYINT NULL DEFAULT 0,
  `added_by` INT NULL,
  `added_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`project_id`, `user_id`),
  INDEX `fk_project_users_user_id_idx` (`user_id` ASC),
  INDEX `fk_project_users_1_idx` (`added_by` ASC),
  CONSTRAINT `fk_project_users_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `teama`.`projects` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_users_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_users_added_by`
    FOREIGN KEY (`added_by`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`boards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`boards` ;

CREATE TABLE IF NOT EXISTS `teama`.`boards` (
  `board_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `board_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`board_id`),
  INDEX `fk_boards_project_id_idx` (`project_id` ASC),
  INDEX `idx_board_name` (`board_name` ASC),
  CONSTRAINT `fk_boards_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `teama`.`projects` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`board_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`board_users` ;

CREATE TABLE IF NOT EXISTS `teama`.`board_users` (
  `board_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `is_admin` TINYINT NULL DEFAULT 0,
  `added_by` INT NULL,
  `added_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`board_id`, `user_id`),
  INDEX `fk_board_users_user_id_idx` (`user_id` ASC),
  INDEX `fk_board_users_1_idx` (`added_by` ASC),
  CONSTRAINT `fk_board_users_board_id`
    FOREIGN KEY (`board_id`)
    REFERENCES `teama`.`boards` (`board_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_users_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_users_added_by`
    FOREIGN KEY (`added_by`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`priorities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`priorities` ;

CREATE TABLE IF NOT EXISTS `teama`.`priorities` (
  `priority_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `priority_rank` INT NULL,
  `priority_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`priority_id`),
  INDEX `idx_priority_name` (`priority_name` ASC),
  INDEX `fk_priorities_project_id_idx` (`project_id` ASC),
  CONSTRAINT `fk_priorities_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `teama`.`projects` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`statuses` ;

CREATE TABLE IF NOT EXISTS `teama`.`statuses` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `board_id` INT NOT NULL,
  `status_rank` INT NULL,
  `status_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`status_id`),
  INDEX `fk_statuses_board_id_idx` (`board_id` ASC),
  INDEX `idx_status_name` (`status_name` ASC),
  CONSTRAINT `fk_statuses_board_id`
    FOREIGN KEY (`board_id`)
    REFERENCES `teama`.`boards` (`board_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`items` ;

CREATE TABLE IF NOT EXISTS `teama`.`items` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `board_id` INT NULL,
  `status_id` INT NULL,
  `priority_id` INT NULL,
  `is_issue` TINYINT NULL DEFAULT 0,
  `item_name` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NULL,
  `due_date` DATETIME NULL,
  `time_estimate` INT NULL,
  `created_by` INT NOT NULL,
  `assigned_to` INT NULL,
  `labels` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`item_id`),
  INDEX `fk_board_id_idx` (`board_id` ASC),
  INDEX `fk_priority_id_idx` (`priority_id` ASC),
  INDEX `fk_users_idx` (`created_by` ASC),
  INDEX `idx_is_issue` (`is_issue` ASC),
  INDEX `idx_issue_name` (`item_name` ASC),
  INDEX `fk_project_id_idx` (`project_id` ASC),
  INDEX `fk_status_id_idx` (`status_id` ASC),
  INDEX `fk_assigned_to_idx` (`assigned_to` ASC),
  CONSTRAINT `fk_items_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `teama`.`projects` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_board_id`
    FOREIGN KEY (`board_id`)
    REFERENCES `teama`.`boards` (`board_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_status_id`
    FOREIGN KEY (`status_id`)
    REFERENCES `teama`.`statuses` (`status_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_priority_id`
    FOREIGN KEY (`priority_id`)
    REFERENCES `teama`.`priorities` (`priority_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_assigned_to`
    FOREIGN KEY (`assigned_to`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`comments` ;

CREATE TABLE IF NOT EXISTS `teama`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_item_id_idx` (`item_id` ASC),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_comments_item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `teama`.`items` (`item_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`default_priorities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`default_priorities` ;

CREATE TABLE IF NOT EXISTS `teama`.`default_priorities` (
  `priority_rank` INT NULL,
  `priority_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`default_statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`default_statuses` ;

CREATE TABLE IF NOT EXISTS `teama`.`default_statuses` (
  `status_rank` INT NULL,
  `status_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL)
ENGINE = InnoDB;

USE `teama` ;

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_items` (`item_id` INT, `project_id` INT, `project_name` INT, `board_id` INT, `board_name` INT, `status_id` INT, `status_name` INT, `priority_id` INT, `priority_name` INT, `is_issue` INT, `item_name` INT, `description` INT, `due_date` INT, `time_estimate` INT, `created_by` INT, `created_by_name` INT, `assigned_to` INT, `assigned_to_name` INT, `labels` INT, `created_at` INT);

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_issues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_issues` (`item_id` INT, `project_id` INT, `project_name` INT, `board_id` INT, `board_name` INT, `status_id` INT, `status_name` INT, `priority_id` INT, `priority_name` INT, `is_issue` INT, `item_name` INT, `description` INT, `due_date` INT, `time_estimate` INT, `created_by` INT, `created_by_name` INT, `assigned_to` INT, `assigned_to_name` INT, `labels` INT, `created_at` INT);

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_comments` (`comment_id` INT, `item_id` INT, `user_id` INT, `user_name` INT, `created_at` INT, `comment` INT);

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
  IN in_email VARCHAR(45))
BEGIN
INSERT INTO users (user_name, password, email, registered_at)
  VALUES (in_user_name, SHA2(in_password, 256), in_email, NOW());
SELECT LAST_INSERT_ID() AS user_id;
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
SELECT in_project_id AS project_id, in_user_id AS user_id;
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
  IN in_description VARCHAR(255))
BEGIN
DECLARE out_id INT DEFAULT 0;
INSERT INTO projects (project_name, description)
  VALUES (in_project_name, in_description);
SELECT LAST_INSERT_ID() INTO out_id;
INSERT INTO priorities (project_id, priority_rank, priority_name, description)
  SELECT out_id, default_priorities.priority_rank, default_priorities.priority_name, default_priorities.description 
  FROM default_priorities;
SELECT out_id AS project_id;
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
  IN in_description VARCHAR(255))
BEGIN
INSERT INTO priorities (project_id, priority_rank, priority_name, description)
  VALUES (in_project_id, in_priority_rank, in_priority_name, in_description);
SELECT LAST_INSERT_ID() AS priority_id;
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
SELECT in_board_id AS board_id, in_user_id AS user_id;
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
  IN in_description VARCHAR(255))
BEGIN
DECLARE out_id INT DEFAULT 0;
INSERT INTO boards (project_id, board_name, description)
  VALUES (in_project_id, in_board_name, in_description);
SELECT LAST_INSERT_ID() INTO out_id;
INSERT INTO statuses (board_id, status_rank, status_name, description)
  SELECT out_id, default_statuses.status_rank, default_statuses.status_name, default_statuses.description 
  FROM default_statuses;
SELECT out_id AS board_id;
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
  IN in_description VARCHAR(255))
BEGIN
INSERT INTO statuses (board_id, status_rank, status_name, description)
  VALUES (in_board_id, in_status_rank, in_status_name, in_description);
SELECT LAST_INSERT_ID() AS status_id;
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
  IN in_comment TEXT)
BEGIN
INSERT INTO comments (item_id, user_id, created_at, comment)
  VALUES (in_item_id, in_user_id, NOW(), in_comment);
SELECT LAST_INSERT_ID() AS comment_id;
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
  IN in_labels VARCHAR(255))
BEGIN
INSERT INTO items (project_id, board_id, status_id, priority_id, is_issue, item_name, description, due_date, time_estimate, created_by, assigned_to, labels, created_at)
  VALUES (in_project_id, in_board_id, in_status_id, in_priority_id, in_is_issue, in_item_name, in_description, in_due_date, in_time_estimate, in_created_by, in_assigned_to, in_labels, NOW());
SELECT LAST_INSERT_ID() AS item_id;
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

-- -----------------------------------------------------
-- View `teama`.`v_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`v_items`;
DROP VIEW IF EXISTS `teama`.`v_items` ;
USE `teama`;
CREATE OR REPLACE VIEW `v_items` AS
    SELECT
        items.item_id,
        items.project_id,
        projects.project_name,
        items.board_id,
        boards.board_name,
        items.status_id,
        statuses.status_name,
        items.priority_id,
        priorities.priority_name,
        items.is_issue,
        items.item_name,
        items.description,
        items.due_date,
        items.time_estimate,
        items.created_by,
        created_users.user_name AS created_by_name,
        items.assigned_to,
        assigned_users.user_name AS assigned_to_name,
        items.labels,
        items.created_at
    FROM
        items
            INNER JOIN
        projects ON items.project_id = projects.project_id
            LEFT JOIN
        boards ON items.board_id = boards.board_id
            LEFT JOIN
        statuses ON items.status_id = statuses.status_id
            LEFT JOIN
        priorities ON items.priority_id = priorities.priority_id
            LEFT JOIN
        users AS created_users ON items.created_by = created_users.user_id
            LEFT JOIN
        users AS assigned_users ON items.assigned_to = assigned_users.user_id
    GROUP BY items.item_id;

-- -----------------------------------------------------
-- View `teama`.`v_issues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`v_issues`;
DROP VIEW IF EXISTS `teama`.`v_issues` ;
USE `teama`;
CREATE OR REPLACE VIEW `v_issues` AS
    SELECT
        items.item_id,
        items.project_id,
        projects.project_name,
        items.board_id,
        boards.board_name,
        items.status_id,
        statuses.status_name,
        items.priority_id,
        priorities.priority_name,
        items.is_issue,
        items.item_name,
        items.description,
        items.due_date,
        items.time_estimate,
        items.created_by,
        created_users.user_name AS created_by_name,
        items.assigned_to,
        assigned_users.user_name AS assigned_to_name,
        items.labels,
        items.created_at
    FROM
        items
            INNER JOIN
        projects ON items.project_id = projects.project_id
            LEFT JOIN
        boards ON items.board_id = boards.board_id
            LEFT JOIN
        statuses ON items.status_id = statuses.status_id
            LEFT JOIN
        priorities ON items.priority_id = priorities.priority_id
            LEFT JOIN
        users AS created_users ON items.created_by = created_users.user_id
            LEFT JOIN
        users AS assigned_users ON items.assigned_to = assigned_users.user_id
    WHERE
        items.is_issue = 1
    GROUP BY items.item_id;

-- -----------------------------------------------------
-- View `teama`.`v_comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`v_comments`;
DROP VIEW IF EXISTS `teama`.`v_comments` ;
USE `teama`;
CREATE OR REPLACE VIEW `v_comments` AS
    SELECT
        comments.comment_id,
        comments.item_id,
        comments.user_id,
        users.user_name,
        comments.created_at,
        comments.comment
    FROM
        comments
            INNER JOIN
        users ON comments.user_id = users.user_id;
SET SQL_MODE = '';
DROP USER IF EXISTS teama;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'teama' IDENTIFIED BY 'team1_teamA';

GRANT ALL ON `teama`.* TO 'teama';
GRANT ALL ON TABLE `teama`.`users` TO 'teama';
GRANT ALL ON TABLE `teama`.`project_users` TO 'teama';
GRANT ALL ON TABLE `teama`.`projects` TO 'teama';
GRANT ALL ON TABLE `teama`.`board_users` TO 'teama';
GRANT ALL ON TABLE `teama`.`priorities` TO 'teama';
GRANT ALL ON TABLE `teama`.`statuses` TO 'teama';
GRANT ALL ON TABLE `teama`.`comments` TO 'teama';
GRANT ALL ON TABLE `teama`.`boards` TO 'teama';
GRANT ALL ON TABLE `teama`.`items` TO 'teama';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
