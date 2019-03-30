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

The included SQL script "teama_schema.sql" creates a schema "teama" owned by a new user "teama" with default password "team1_teamA". It requires MYSQL 5.7.  The following views should be used when querying tables:

| Table         | View          
| ------------- |-------------
| items         | v_items 
| issues        | v_issues      
| comments      | v_comments

For queries use SELECT statements. For INSERTS and DELETES use the procedures described below:

```sql
-- The format for calling a procedure, using add_user as an example
-- You would probably create string variables in javascript like userName, password, emailAddress
-- also create a variable to store the id integer that is created
-- then you would execute the following SQL:
-- `CALL add_user(${userName}, ${password}, ${emailAddress}, @${id})

-- If the procedure inserts a row the variable out_id is used to return the unique ID created

-- You cannot pass empty values, instead pass NULL
--   - for example, if you were to add a project user without specifying a value for added_by you
--   - should execute  `CALL add_project_user(1,1,FALSE,NULL, @${returnedID})` NOT `CALL add_project_user(1,1,FALSE,, @${returnedID})`

`CALL add_user (
   ${user_name},
   ${password},
   ${email},
   @${returnedID})`

`CALL add_project_user (
   ${project_id},
   ${user_id},
   ${is_admin},
   ${added_by},
   @${returnedID})`


-- Note: when adding a project you should also execute add_project_user with the returned out_id
-- as project_id, the user_id of the user that created the project, and is_admin = True (1)
-- Also inserts into table priorities. The inserted rows include each row from the default_priorities
-- table along with the project_id created in this procedure
`CALL add_project (
   ${project_name},
   ${description},
   @${returnedID})`

`CALL add_board_user (
   ${board_id},
   ${user_id},
   ${is_admin},
   ${added_by},
   @${returnedID})`

-- Note: when adding a board you should also execute add_board_user with the returned out_id
-- as board_id, the user_id of the user that created the project, and is_admin = True (1)
-- Also inserts into table statuses. The inserted rows include each row from the default_statuses
-- table along with the board_id created in this procedure
`CALL add_board (
   ${project_id},
   ${board_name},
   ${description},
   @${returnedID})`


`CALL add_comment (
   ${item_id},
   ${user_id},
   ${comment},
   @${returnedID})`

`CALL add_item (
   ${project_id},
   ${board_id},
   ${status_id},
   ${priority_id},
   ${is_issue},
   ${item_name},
   ${description},
   ${due_date},
   ${time_estimate},
   ${created_by},
   ${assigned_to},
   ${labels},
   @${returnedID})`


-- Important: many values of other tables are deleted via cascading deletes!
--   - related rows of the table: priorities will be cascade deleted
--   - related rows of the table: items will be cascade deleted
--     - related rows of the table: comments will be cascade deleted
`CALL delete_project (${project_id})`


-- Important: this does not actually remove the user from the users table!
--   Instead, we set the 'deactivated' field = true, set the password field to
--   null, and remove them from the project_users and board_users tables.
--   We do this instead of actually deleting it from the users table because
--   there are rows referencing this value in tables like `items` and `comments` tables,
--   which we want to persist. This still prevents the user from being able to
--   login and access data but we can still have their user_name displayed when
--   presenting comments or items they made
--   - sets `password` to NULL
--   - sets `deactivated` to TRUE
--   - removes related rows of the table: project_users
--   - related rows of the table: board_users
`CALL delete_user (${user_id})`

-- - Important: rows of the `statuses` table are deleted from cascading deletes!
--   - related rows of the statuses table are removed via cascading deletes
--   - removes rows of the `items` table that are associated with this board_id
--     that are NOT issues (issues should persist since they are related to the project_id)
--     - rows of the `comments` table related to deleted items are removed via cascading delete
`CALL delete_board (${board_id})`

`CALL delete_project_user (
   ${board_id},
   ${user_id})`

`CALL delete_project_user (
   ${board_id},
   ${user_id})`

-- Important: related rows of the `comments` table will be deleted via cascade delete
`CALL delete_item (${item_id})`

`CALL delete_comment (${comment_id})
```

SQL for inserting sample data is maintained with this Google doc, is periodically copied to 'teama_sample_data.sql': https://docs.google.com/spreadsheets/d/1OoYSdDnV2SZvPscjIzZSVcfawIb_xjYi5DOU9pmlSLI/edit?usp=sharing
