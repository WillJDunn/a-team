const boardDao = require('./boardDao');


describe('boardDao', () => {
    // test getBoards()
    it('retrieves all boards correctly', () => {
        // test code here
        return boardDao.getBoards()
            .then(results => {
                expect(results.length).toBe(4);
                const expectedFirstBoard = {
                    id: 1,
                    projectId: 1,
                    name: 'Development',
                    description: 'Development team board project TeamA'
                };
                expect(results[0]).toEqual(expectedFirstBoard);
            });
    });

    // test getBoardsForProject
    it('retrieves board for project 1 correctly', () => {
        return boardDao.getBoardsForProject(1)
            .then(projects => {
                expect(projects.length).toBe(2);
            });
    });


    //test getBoardById()
    it('retrieves board for board 1 correctly', () => {
        return boardDao.getBoardById(1)
            .then(boards => {
                expect(boards.length).toBe(1);
            });
    });


    // test createBoardForProject()
    it('creates a board for project 2 as expected', () => {
        const board = {
            projectId: 2,
            name: 'board from Jest Test',
            description: 'You can delete this when done',
        };
        return boardDao.createBoardForProject(2,board)
            .then(insertId => {
                return boardDao.getBoardById(insertId)
                    .then(actualBoard => {
                        console.log(actualBoard);
                        const expectedBoard = { id: insertId, ...board };
                        console.log(actualBoard);
                        expect(actualBoard).toEqual(expectedBoard);
                    });
            });
    });
});
