const boardDao = require('./boardDao');


describe('boardDao', () => {
    it('retrieves boards for project 1 correctly', () => {
        return boardDao.getBoardsForProject(1)
            .then(boards => {
                console.log(boards);
                expect(boards.length).toBe(2);
            });
    });
});
