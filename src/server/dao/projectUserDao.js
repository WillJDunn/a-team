const db = require('./PooledDatabaseConnection');
const Project_user = require('../dto/Project');


//api/projects/:projectId/user/:username/POST:
// Add an already existing user to an already existing project
// INSERT INTO teama.project_users( project_id, user_id, is_admin, added_by, added_at)
// VALUES(in_project_id, in_user_id, in_is_admin, in_added_by, in_added_at);

add_project_user