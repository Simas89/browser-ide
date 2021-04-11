import express from 'express';

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();

	router.get('/cells', async (req, res) => {
		// Make sure cell storage file exists
		// if not exists add default list ofcells
		//Read file and parse cells
		// send back to browser
	});

	router.post('/cells', async (req, res) => {
		// Make sure cell storage file exists
		// if not , create it
		// take list of cells of req oj
		// serialize
		// write to file
	});

	return router;
};
