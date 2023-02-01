// This is example of console app
const yargs = require('yargs');
const { addNote, printNotes, removeNote } = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});
yargs.command({
  command: 'list',
  describe: 'Print all note',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();

// Example of vanilla node
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'));
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(content);
  } else if (req.method === 'POST') {
    const body = [];
    req.on('data', (data) => {
      body.push(Buffer.from(data));
    });
    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
      addNote(title);
    });
    res.end('post suck');
  }
});
