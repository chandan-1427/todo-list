const savedList = JSON.parse(localStorage.getItem('todoList'));
const todoList = savedList || [];

function savingListInLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

renderTodoList();

function renderTodoList() {
  const todoContainer = document.querySelector('.js-todo-list');
  let todoListHTML = '';

  if (todoList.length === 0) {
    todoListHTML = '<p class="text-center text-gray-500">No tasks added yet!</p>';
  } else {
    todoList.forEach((todoObject, i) => {
      const { name, dueDate } = todoObject;
      todoListHTML += `
        <div class="grid grid-cols-3 items-center bg-white p-3 rounded shadow-sm border">
          <div class="text-gray-800 font-medium">${escapeHTML(name)}</div>
          <div class="text-gray-500">${dueDate}</div>
          <button class="delete-todo-button bg-red-600 text-white py-2 rounded hover:bg-red-700" 
            onclick="handleDelete(${i})">Delete</button>
        </div>
      `;
    });
  }

  todoContainer.innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value.trim();
  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;
  const warningElement = document.querySelector('.js-warning-pane');

  if (name === '' || dueDate === '') {
    warningElement.textContent = 'Please enter name and date!';
    setTimeout(() => (warningElement.textContent = ''), 3000);
    return;
  } else {
    warningElement.textContent = '';
  }

  todoList.push({ name, dueDate });
  savingListInLocalStorage();
  inputElement.value = '';
  dateInputElement.value = '';
  renderTodoList();
}

function handleDelete(index) {
  const confirmed = confirm('Are you sure you want to delete this task?');
  if (!confirmed) return;
  todoList.splice(index, 1);
  savingListInLocalStorage();
  renderTodoList();
}

document.getElementById('addButton').addEventListener('click', addTodo);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function escapeHTML(str) {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
}
