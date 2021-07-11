const input = document.getElementById('texto-tarefa');
const lista = document.getElementById('lista-tarefas');
const btnAdd = document.getElementById('criar-tarefa');
const btnClear = document.getElementById('apaga-tudo');
const btnRemCompleted = document.getElementById('remover-finalizados');
const btnSave = document.getElementById('salvar-tarefas');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');
const btnRemSelected = document.getElementById('remover-selecionado');

// Adiciona uma tarefa a lista
function addTask() {
  const texto = input.value;
  const itemLista = document.createElement('li');
  itemLista.innerText = texto;
  lista.appendChild(itemLista);
  input.value = '';
}

// 8 - Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo
// remove a classe selected de todos os elementos
function removeSelected() {
  for (const item of lista.children) {
    item.classList.remove('selected');
  }
}

// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza rgb(128,128,128)
// adidciona a classe selected ao elemento selecionado
function selectItem(event) {
  removeSelected();
  event.target.classList.add('selected');
}

// Verifica se o elemento passado possui a classe completed
function isCompleted(classes) {
  for (const classe of classes) {
    if (classe === 'completed') {
      return true;
    }
  }
  return false;
}

// Verifica se o elemento passado possui a classe selected
function isSelected(classes) {
  for (const classe of classes) {
    if (classe === 'selected') {
      return true;
    }
  }
  return false;
}

// Remove da lista o item com a classe selected
function removeSeleceted() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    if (isSelected(lista.children[index].classList)) {
      lista.removeChild(lista.children[index]);
      break;
    }
  }
}

// 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completo. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
// Adiciona ou remove a classe completed do elemento manipulado
function completeTask(event) {
  const completed = isCompleted(event.target.classList);

  if (completed) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

// Remove da lista todos os elementos com a classe completed
function removeCompleted() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    if (isCompleted(lista.children[index].classList)) {
      lista.removeChild(lista.children[index]);
    }
  }
}

// Remove todas as tarefas da lista
function clearList() {
  for (let index = lista.children.length - 1; index >= 0; index -= 1) {
    lista.removeChild(lista.children[index]);
  }
}

// Move o elemento selecionado para cima na lista
function moveUp() {
  const selected = document.querySelector('.selected');
  const anterior = selected.previousSibling;
  if (selected !== lista.firstElementChild) {
    lista.insertBefore(selected, anterior);
  }
}

// Move o elemento selecionado para baixo na lista
function moveDown() {
  const selected = document.querySelector('.selected');
  const proximo = selected.nextSibling;
  if (selected !== lista.lastElementChild) {
    lista.insertBefore(proximo, selected);
  }
}

// Salva os dados da lista em localStorage
function saveTasks() {
  localStorage.setItem('items', lista.innerHTML);
}

btnAdd.addEventListener('click', addTask);
input.addEventListener('keyup', function() {
  if (event.keyCode === 13) {
    btnAdd.click();
  }
});
lista.addEventListener('click', selectItem);
lista.addEventListener('dblclick', completeTask);
btnRemSelected.addEventListener('click', removeSeleceted);
btnRemCompleted.addEventListener('click', removeCompleted);
btnClear.addEventListener('click', clearList);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnSave.addEventListener('click', saveTasks);

// Preenche a lista com os dados salvos ao carregar a página
window.onload = function () {
  lista.innerHTML = localStorage.getItem('items');
};
