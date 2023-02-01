const express = require('express');
const chalk = require('chalk');
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller');
const path = require('path');
const date = new Date();
function getTime(currentTime) {
  return currentTime < 10 ? '0' + currentTime : currentTime;
}
const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await editNote(req.params.id, req.body.title);
  console.log(req.body.title);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(
    chalk.green(
      `Server has been started on port ${port} in ${date.toLocaleDateString()}, ${getTime(
        date.getHours()
      )}:${getTime(date.getMinutes())}:${getTime(date.getSeconds())}`
    )
  );
});
