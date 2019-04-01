-- This is database create script as of:
-- Sun 17 Feb 2019 09:28:57 PM PST
-- it is an old version of teama_schema.sql. Schema changes have been made since this version
-- we're keeping this old copy here in case you need it for backwards compatibility

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
  `password` VARBINARY(256) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `email_verified` TINYINT NULL DEFAULT 0,
  `registered_at` DATETIME NULL,
  PRIMARY KEY (`user_id`),
  INDEX `idx_user_name` (`user_name` ASC))
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
  `added_at` DATETIME NULL,
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
    ON DELETE NO ACTION
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
    ON DELETE NO ACTION
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
  `added_at` DATETIME NULL,
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
    ON DELETE NO ACTION
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
  `priority_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`priority_id`),
  INDEX `idx_priority_name` (`priority_name` ASC),
  INDEX `fk_priorities_project_id_idx` (`project_id` ASC),
  CONSTRAINT `fk_priorities_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `teama`.`projects` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`statuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`statuses` ;

CREATE TABLE IF NOT EXISTS `teama`.`statuses` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `board_id` INT NOT NULL,
  `status_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`status_id`),
  INDEX `fk_statuses_board_id_idx` (`board_id` ASC),
  INDEX `idx_status_name` (`status_name` ASC),
  CONSTRAINT `fk_statuses_board_id`
    FOREIGN KEY (`board_id`)
    REFERENCES `teama`.`boards` (`board_id`)
    ON DELETE NO ACTION
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
    ON DELETE NO ACTION
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
  `created_at` DATETIME NULL,
  `comment` TINYTEXT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_item_id_idx` (`item_id` ASC),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_comments_item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `teama`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`time_entries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`time_entries` ;

CREATE TABLE IF NOT EXISTS `teama`.`time_entries` (
  `time_entry_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `entered_at` DATETIME NULL,
  `time` INT NOT NULL,
  PRIMARY KEY (`time_entry_id`),
  INDEX `fk_user_id_idx` (`user_id` ASC),
  INDEX `fk_item_id_idx` (`item_id` ASC),
  CONSTRAINT `fk_time_entries_item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `teama`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_time_entries_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `teama`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teama`.`labels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`labels` ;

CREATE TABLE IF NOT EXISTS `teama`.`labels` (
  `label_id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `label_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`label_id`),
  INDEX `fk_item_id_idx` (`item_id` ASC),
  INDEX `idx_label_name` (`label_name` ASC),
  CONSTRAINT `fk_labels_item_id`
    FOREIGN KEY (`item_id`)
    REFERENCES `teama`.`items` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `teama` ;

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_items` (`item_id` INT, `project_id` INT, `project_name` INT, `board_id` INT, `board_name` INT, `status_id` INT, `status_name` INT, `priority_id` INT, `priority_name` INT, `is_issue` INT, `item_name` INT, `description` INT, `due_date` INT, `time_estimate` INT, `actual_time` INT, `created_by` INT, `created_by_name` INT, `assigned_to` INT, `assigned_to_name` INT, `labels` INT);

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_issues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_issues` (`item_id` INT, `project_id` INT, `project_name` INT, `board_id` INT, `board_name` INT, `status_id` INT, `status_name` INT, `priority_id` INT, `priority_name` INT, `is_issue` INT, `item_name` INT, `description` INT, `due_date` INT, `time_estimate` INT, `actual_time` INT, `created_by` INT, `created_by_name` INT, `assigned_to` INT, `assigned_to_name` INT, `labels` INT);

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_comments` (`comment_id` INT, `item_id` INT, `user_id` INT, `user_name` INT, `created_at` INT, `comment` INT);

-- -----------------------------------------------------
-- Placeholder table for view `teama`.`v_time_entries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teama`.`v_time_entries` (`time_entry_id` INT, `item_id` INT, `item_name` INT, `user_id` INT, `user_name` INT, `entered_at` INT, `time` INT);

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
        SUM(time_entries.time) AS actual_time,
        items.created_by,
        created_users.user_name AS created_by_name,
        items.assigned_to,
        assigned_users.user_name AS assigned_to_name,
        items.labels
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
            LEFT JOIN
        time_entries ON items.item_id = time_entries.item_id
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
        SUM(time_entries.time) AS actual_time,
        items.created_by,
        created_users.user_name AS created_by_name,
        items.assigned_to,
        assigned_users.user_name AS assigned_to_name,
        items.labels
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
            LEFT JOIN
        time_entries ON items.item_id = time_entries.item_id
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

-- -----------------------------------------------------
-- View `teama`.`v_time_entries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teama`.`v_time_entries`;
DROP VIEW IF EXISTS `teama`.`v_time_entries` ;
USE `teama`;
CREATE OR REPLACE VIEW `v_time_entries` AS
    SELECT 
        time_entries.time_entry_id,
        time_entries.item_id,
        items.item_name,
        time_entries.user_id,
        users.user_name,
        time_entries.entered_at,
        time_entries.time
    FROM
        time_entries
            INNER JOIN
        items ON time_entries.item_id = items.item_id
            INNER JOIN
        users ON time_entries.user_id = users.user_id;
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
GRANT ALL ON TABLE `teama`.`time_entries` TO 'teama';
GRANT ALL ON TABLE `teama`.`labels` TO 'teama';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
