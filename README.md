This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run dev`

Runs both the frontend in development mode (like `npm start` above) and the ExpressJS backend.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### TeamA DB

The included SQL script "teama_schema.sql" creates a schema "teama" owned by a new user "teama" with default password "team1_teamA". It requires MYSQL 5.7.  

To create a new instance, connect to mysql as root. For convenience consider starting the connection from the directory containing the sql scripts
```bash
mysql -u root -p
```

If you are replacing an instance that already exists execute
```sql
DROP SCHEMA teama;
```

Execute teama_schema.sql which creates the schema, tables, stored procedures, user (teama)/ password
```sql
SOURCE teama_schema.sql;
```

To insert the sample data into the database, execute teama_sample_data.sql
```sql
SOURCE teama_sample_data.sql;
```

The database schema was last updated Sun 31 Mar 2019 04:28:25 PM PDT.
The database stored procedures were last updated Sun 31 Mar 2019 04:28:25 PM PDT.
If your database schema is already up to date but your stored procedures are not, you can update just the stored procedures by executing stored_procedures.sql.

The following views should be used when querying tables:

| Table         | View          
| ------------- |-------------
| items         | v_items 
| issues        | v_issues      
| comments      | v_comments

For queries use SELECT statements. For INSERTS and DELETES use the procedures described below.
The passwords column of the users table is SHA2 encrypted. To check if a user's password is correct use the following stored procedures:
```sql
CALL check_user_password_by_user_id(user_id,'password');
```
```sql
CALL check_user_password_by_user_name(user_name,'password');
```
```sql
CALL check_user_password_by_email(email,'password');
```

Procedures
/*
The syntax for calling a MySQL stored procedure is
CALL procedure_name(variable1, variable2);

You cannot pass empty variables. Pass NULL instead.
For example:
CALL add_example(variable1, NULL);
NOT: add_example(variable1, );

Procedures that insert data (add_`*`) usually create a unique ID for what they just inserted.
When the procedure finishes executing, it will execute a SELECT SQL which returns the ID number
that was created:
mysql> CALL add_comment(1, 3, 'Test comment for item 1 by user 3');
+----+
| id |
+----+
|  4 |
+----+
1 row in set (0.00 sec)


That ID can be used to access the inserted data
mysql> SELECT * FROM comments WHERE comment_id = 4;
+------------+---------+---------+---------------------+-----------------------------------+
| comment_id | item_id | user_id | created_at          | comment                           |
+------------+---------+---------+---------------------+-----------------------------------+
|          4 |       1 |       3 | 2019-03-31 18:39:54 | Test comment for item 1 by user 3 |
+------------+---------+---------+---------------------+-----------------------------------+
1 row in set (0.00 sec)
*/

/*
-- PROCEDURES DESCRIPTION FORMAT:
   CALL procedure_name(
     variable_name DATATYPE(MAX LENGTH),
     variable_name DATATYPE(MAX LENGTH))
*/

-- -----------------------------------------------------
-- procedure add_user
-- -----------------------------------------------------
-- Per NIST best practices accepts passwords up to 64 characters
-- passwords will be hashed with SHA2 encryption
CALL add_user(
  user_name VARCHAR(45),
  password VARCHAR(64),
  email VARCHAR(45))


-- -----------------------------------------------------
-- procedure add_project_user
-- -----------------------------------------------------
CALL add_project_user(
  project_id INT,
  user_id INT,
  is_admin TINYINT,
  added_by INT)


-- -----------------------------------------------------
-- procedure add_project
-- -----------------------------------------------------
-- Note: when adding a project you should also execute add_project_user with the returned out_id
-- as project_id, the user_id of the user that created the project, and is_admin = True (1)
-- Also inserts into table priorities. The inserted rows include each row from the default_priorities
-- table along with the project_id created in this procedure
CALL add_project(
  project_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure add_priority
-- -----------------------------------------------------
CALL add_priority(
  project_id INT,
  priority_rank INT,
  priority_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure add_board_user
-- -----------------------------------------------------
CALL add_board_user(
  board_id INT,
  user_id INT,
  is_admin TINYINT,
  added_by INT)


-- -----------------------------------------------------
-- procedure add_board
-- -----------------------------------------------------
-- Note: when adding a board you should also execute add_board_user with the returned out_id
-- as board_id, the user_id of the user that created the board, and is_admin = True (1)
-- Also inserts into table statuses. The inserted rows include each row from the default_statuses
-- table along with the board_id created in this procedure
CALL add_board(
  project_id INT,
  board_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure add_status
-- -----------------------------------------------------
CALL add_status(
  board_id INT,
  status_rank INT,
  status_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure add_comment
-- -----------------------------------------------------
CALL add_comment(
  item_id INT,
  user_id INT,
  comment TEXT)


-- -----------------------------------------------------
-- procedure add_item
-- -----------------------------------------------------
CALL add_item(
  project_id INT,
  board_id INT,
  status_id INT,
  priority_id INT,
  is_issue TINYINT,
  item_name VARCHAR(45),
  description MEDIUMTEXT,
  due_date DATETIME,
  time_estimate INT,
  created_by INT,
  assigned_to INT,
  labels VARCHAR(255))


-- -----------------------------------------------------
-- procedure delete_project
-- -----------------------------------------------------
-- Important: many values of other tables are deleted via cascading deletes!
--   - related rows of the table: priorities will be cascade deleted
--   - related rows of the table: items will be cascade deleted
--     - related rows of the table: comments will be cascade deleted
CALL delete_project(project_id INT)


-- -----------------------------------------------------
-- procedure delete_user
-- -----------------------------------------------------
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
CALL delete_user(user_id INT)


-- -----------------------------------------------------
-- procedure delete_board
-- -----------------------------------------------------
-- - Important: rows of the `statuses` table are deleted from cascading deletes!
--   - related rows of the statuses table are removed via cascading deletes
--   - removes rows of the `items` table that are associated with this board_id
--     that are NOT issues (issues should persist since they are related to the project_id)
--     - rows of the `comments` table related to deleted items are removed via cascading delete
CALL delete_board(board_id INT)


-- -----------------------------------------------------
-- procedure delete_project_user
-- -----------------------------------------------------
CALL delete_project_user(
  project_id INT,
  user_id INT)


-- -----------------------------------------------------
-- procedure delete_board_user
-- -----------------------------------------------------
CALL delete_board_user(
  board_id INT,
  user_id INT)


-- -----------------------------------------------------
-- procedure delete_item
-- -----------------------------------------------------
-- Important: related rows of the `comments` table will be deleted via cascade delete
-- Note: related rows of `comments` table are cascade deleted
CALL delete_item(item_id INT)


-- -----------------------------------------------------
-- procedure delete_comment
-- -----------------------------------------------------
CALL delete_comment(comment_id INT)


-- -----------------------------------------------------
-- procedure edit_board
-- -----------------------------------------------------
CALL edit_board(
  board_id INT,
  board_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure grant_board_admin
-- -----------------------------------------------------
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CALL grant_board_admin(
  board_id INT,
  user_id INT,
  modified_by INT)


-- -----------------------------------------------------
-- procedure revoke_board_admin
-- -----------------------------------------------------
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CALL revoke_board_admin(
  board_id INT,
  user_id INT,
  modified_by INT)


-- -----------------------------------------------------
-- procedure edit_comment
-- -----------------------------------------------------
-- Note: you may want to append additional text to the updated comment such
-- as UPDATED <<timestamp>> so end users can know that the comment has been
-- updated. We do not do that in the procedure so application can control that
CALL edit_comment(
  comment_id INT,
  comment TEXT)


-- -----------------------------------------------------
-- procedure edit_item
-- -----------------------------------------------------
-- Note: when editing an item you should probably also add a comment (via add_comment)
-- showing the old/new values for the modified fields and who modified it for audit
CALL edit_item(
  item_id INT,
  board_id INT,
  status_id INT,
  priority_id INT,
  is_issue TINYINT,
  item_name VARCHAR(45),
  description MEDIUMTEXT,
  due_date DATETIME,
  time_estimate INT,
  created_by INT,
  assigned_to INT,
  labels VARCHAR(255))


-- -----------------------------------------------------
-- procedure edit_priority
-- -----------------------------------------------------
CALL edit_priority(
  priority_id INT,
  priority_rank INT,
  priority_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure delete_priority
-- -----------------------------------------------------
CALL delete_priority(priority_id INT)


-- -----------------------------------------------------
-- procedure edit_status
-- -----------------------------------------------------
CALL edit_status(
  status_id INT,
  status_rank INT,
  status_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure delete_status
-- -----------------------------------------------------
CALL delete_status(status_id INT)


-- -----------------------------------------------------
-- procedure check_user_password_by_user_id
-- -----------------------------------------------------
CALL check_user_password_by_user_id(
  user_id VARCHAR(45),
  password VARCHAR(64))


-- -----------------------------------------------------
-- procedure check_user_password_by_user_name
-- -----------------------------------------------------
-- Looks up user_name and SHA2 encrypted password, returns user_id if there's a match on both
CALL check_user_password_by_user_name(
  user_name VARCHAR(45),
  password VARCHAR(64))


-- -----------------------------------------------------
-- procedure check_user_password_by_email
-- -----------------------------------------------------
CALL check_user_password_by_email(
  email VARCHAR(45),
  password VARCHAR(64))


-- -----------------------------------------------------
-- procedure edit_user
-- -----------------------------------------------------
-- Per NIST best practices accepts passwords up to 64 characters
-- passwords will be hashed with SHA2 encryption
CALL edit_user(
  user_id INT,
  user_name VARCHAR(45),
  password VARCHAR(64),
  email VARCHAR(45))


-- -----------------------------------------------------
-- procedure edit_project
-- -----------------------------------------------------
CALL edit_project(
  project_id INT,
  project_name VARCHAR(45),
  description VARCHAR(255))


-- -----------------------------------------------------
-- procedure grant_project_admin
-- -----------------------------------------------------
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CALL grant_project_admin(
  project_id INT,
  user_id INT,
  modified_by INT)


-- -----------------------------------------------------
-- procedure revoke_project_admin
-- -----------------------------------------------------
-- Note: updates added_by field = in_modified_by, since tracking who granted or revoked
-- admin privileges is important
CALL revoke_project_admin(
  board_id INT,
  user_id INT,
  modified_by INT)
```

SQL for inserting sample data is maintained with this Google doc, is periodically copied to 'teama_sample_data.sql': https://docs.google.com/spreadsheets/d/1OoYSdDnV2SZvPscjIzZSVcfawIb_xjYi5DOU9pmlSLI/edit?usp=sharing
