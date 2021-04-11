import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const testCommand = new Command()
	.command('test')
	.description('Test command description')
	.action(() => {
		console.log('TEST COMMAND RUN');
	});

export const serveCommand = new Command()
	.command('serve [filename]') // [uptional value]
	.description('Open a file for editing')
	.option('-p, --port <number>', 'port to run server on', '4005') // <reqired value>
	.action(async (filename = 'notebook.js', options: { port: string }) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(
				parseInt(options.port),
				path.basename(filename),
				dir,
				!isProduction
			);
			console.log(
				`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
			);
		} catch (error) {
			if (error.code === 'EADDRINUSE') {
				console.error('Port is in use. Try runnung on different port');
			} else {
				console.log('Error: ', error.message);
			}
			process.exit(1);
		}
	});
