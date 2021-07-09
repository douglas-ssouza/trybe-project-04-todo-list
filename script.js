const input = document.getElementById('texto-tarefa');
const lista = document.getElementById('lista-tarefas');
const btnAdd = document.getElementById('criar-tarefa');
const btnClear = document.getElementById('apaga-tudo');

function addTask() {
  const texto = input.value;
  const itemLista = document.createElement('li');
  itemLista.innerText = texto;
  lista.appendChild(itemLista);
  input.value = '';
  input.blur();
}
btnAdd.addEventListener('click', addTask);

function removeSelected() {
  for (const item of lista.children) {
    item.classList.remove('selected');
  }
}

function selectItem(event) {
  removeSelected()
  event.target.classList.add('selected');
}
lista.addEventListener('click', selectItem);

function isCompleted(event) {
  completed = false;
  for (const classe of event.target.classList) {
    if (classe === 'completed') {
      return true;
    }
  }
  return false;
}

function completeTask(event) {
  completed = isCompleted(event);

  if (completed) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed')
  }
}
lista.addEventListener('dblclick', completeTask)

function clearList() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    lista.removeChild(lista.children[index]);
  }
}
btnClear.addEventListener('click', clearList);
