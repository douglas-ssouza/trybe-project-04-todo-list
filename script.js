const input = document.getElementById('texto-tarefa');
const lista = document.getElementById('lista-tarefas');
const btnAdd = document.getElementById('criar-tarefa');
const btnClear = document.getElementById('apaga-tudo');
const btnRemCompleted = document.getElementById('remover-finalizados');
const btnSave = document.getElementById('salvar-tarefas');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const btnRemSelected = document.getElementById('remover-selecionado');

function addTask() {
  const texto = input.value;
  const itemLista = document.createElement('li');
  itemLista.innerText = texto;
  lista.appendChild(itemLista);
  input.value = '';
}
btnAdd.addEventListener('click', addTask);
input.addEventListener('keyup', function() {
  if (event.keyCode === 13) {
    btnAdd.click();
  }
}) 

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

function isCompleted(classes) {
  for (const classe of classes) {
    if (classe === 'completed') {
      return true;
    }
  }
  return false;
}

function isSelected(classes) {
  for (const classe of classes) {
    if (classe === 'selected'){
      return true;
    }
  }
  return false;
}

function removeSeleceted() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    if (isSelected(lista.children[index].classList)) {
      lista.removeChild(lista.children[index]);
      break;
    }
  }
}
btnRemSelected.addEventListener('click', removeSeleceted);

function completeTask(event) {
  completed = isCompleted(event.target.classList);

  if (completed) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed')
  }
}
lista.addEventListener('dblclick', completeTask)


function removeCompleted() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    if (isCompleted(lista.children[index].classList)) {
      lista.removeChild(lista.children[index]);
    }
  }
}
btnRemCompleted.addEventListener('click', removeCompleted);

function clearList() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    lista.removeChild(lista.children[index]);
  }
}
btnClear.addEventListener('click', clearList);

function moveUp() {
  let move = false;
  for (const item of lista.children) {
    move = isSelected(item.classList);
    if (move) break;
  }

  if (move) {
    let selected = document.querySelector('.selected');
    let anterior = selected.previousSibling;
    if (selected != lista.firstElementChild) {
      lista.insertBefore(selected, anterior);
    }
  }
}
btnUp.addEventListener('click', moveUp);

function moveDown() {  
  let move =  false;
  for (const item of lista.children) {
    move = isSelected(item.classList);
    if (move) break;
  }

  if (move) {
    let selected = document.querySelector('.selected');
    let proximo = selected.nextSibling;
    if (selected != lista.lastElementChild) {
      lista.insertBefore(proximo, selected);
    }
  }
}
btnDown.addEventListener('click', moveDown);

function saveTasks() {
  localStorage.setItem('items', lista.innerHTML);
}
btnSave.addEventListener('click', saveTasks);

window.onload = function () {
  lista.innerHTML = localStorage.getItem('items');
};
