import { program } from 'commander';
import { serveCommand, testCommand } from './commands/serve';

program.addCommand(serveCommand);
program.addCommand(testCommand);

program.parse(process.argv);
