const projectDao = require('./projectDao');


describe('projectDao', () => {
    it('retrieves project for project 1 correctly', () => {
        return projectDao.getProjectById(1)
            .then(projects => {
                expect(projects.length).toBe(1);
            });
    });

    it('i am another test', () => {
       // test code here
        return projectDao.getProjects()
            .then(results => {
               expect(results.length).toBe(3);
               const expectedFirstProject = {
                   id: 1,
                   name: 'Team A',
                   description: 'Team 1 semester project'
               };
               expect(results[0]).toEqual(expectedFirstProject);
            });
    });
    it('creates a project as expected', () => {
        const project = {
          name: 'Project from Jest Test',
          description: 'You can delete this when done',
        };
        return projectDao.createProject(project)
            .then(dbRes => {
                console.log(dbRes);
            });
    });
});
