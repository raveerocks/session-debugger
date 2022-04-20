const program = require('commander');
const { download } = require('../core/download/download_service');
const { scan } = require('../core/scan/scan_service');

program.name('debugger').version('1.0.0');

program
  .command('download')
  .description('downloads logs')
  .argument('<session_id>', 'session_id')
  .argument('[category]', 'catergory', 'automate')
  .argument('[user]', 'user', process.env.BROWSERSTACK_ADMIN_USERNAME)
  .argument('[key]', 'key', process.env.BROWSERSTACK_ADMIN_ACCESS_KEY)
  .action((sessionId, category, user, key) => {
    download({ user: user, key: key }, category, sessionId);
  });

program
  .command('scan')
  .description('scans logs')
  .argument('<session_id>', 'session_id')
  .argument('<date>', 'date')
  .argument('<data_center>', 'data_center')
  .argument('[category]', 'catergory', 'automate')
  .action((sessionId, date, data_center, catergory) => {
    scan(sessionId, date, data_center, catergory);
  });

program.parse(process.argv);
