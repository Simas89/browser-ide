import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes/cells';

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	const app = express();

	// console.log(path.join(__dirname, '../node_modules/local-client/build'));

	if (useProxy) {
		app.use(
			createProxyMiddleware({
				target: 'http://localhost:3000',
				ws: true,
				logLevel: 'silent',
			})
		);
	} else {
		const packagePath = require.resolve('local-client/build/index.html');
		app.use(express.static(path.dirname(packagePath)));
	}

	app.use(createCellsRouter(filename, dir));

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});

	// app.listen(port, () => {
	// 	console.log('Server runung at port: ', port);
	// });
};
