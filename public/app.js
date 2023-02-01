document.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (event.target.dataset.type === 'remove') {
    remove(id).then(() => {
      console.log(event.target);
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const newText = prompt('Edit notes');
    if (newText) {
      edit(id).then(() => {
        event.target.closest('li').innerHtml = newText;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}
async function edit(id) {
  await fetch(`/${id}`, { method: 'PUT' });
}
