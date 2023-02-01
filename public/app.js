document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const newText = prompt('Edit notes');
    if (newText) {
      edit(id, newText).then(() => {});
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}
async function edit(id, newText) {
  const response = await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newText }),
  });
  if (response.ok) {
    window.location.reload();
  }
}
