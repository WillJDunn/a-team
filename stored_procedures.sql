CREATE PROCEDURE `add_board`(
  IN in_project_id INT,
  IN in_board_name VARCHAR(45),
  IN in_description VARCHAR(255),
  OUT out_id INT
)
BEGIN
  INSERT INTO boards (project_id, board_name, description)
  VALUES (in_project_id, in_board_name, in_description);
  SELECT LAST_INSERT_ID() INTO out_id;
END;
