// Edit method
function checkboxListener(event) {
  const checkbox = event.currentTarget;
  const id = checkbox.dataset.id;

  const body = new FormData();
  body.append("done", checkbox.checked.toString());

  fetch(`./api/v1/item/${id}`, { method: "PUT", body }).then(() =>
    fetchTodoList()
  );
}

// Delete method
function deleteButtonListener(event) {
  const button = event.currentTarget;
  const id = button.dataset.id;

  fetch(`./api/v1/item/${id}`, { method: "DELETE" }).then(() =>
    fetchTodoList()
  );
}

// render ToDoList
function renderTodoList(todoList) {
  const todoContainer = document.querySelector("#todo-container");

  const deleteButtonList = todoContainer.querySelectorAll(".delete-button");
  deleteButtonList.forEach((button) =>
    button.removeEventListener("click", deleteButtonListener)
  );

  const checkboxList = todoContainer.querySelectorAll(".checkbox");
  checkboxList.forEach((checkbox) =>
    checkbox.removeEventListener("change", checkboxListener)
  );

  todoContainer.innerHTML = "";

  for (const item of todoList) {
    const li = document.createElement("li");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;
    checkbox.dataset.id = item.id;
    checkbox.addEventListener("change", checkboxListener);

    const text = new Text(item.title);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除する";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id = item.id;
    deleteButton.addEventListener("click", deleteButtonListener);

    label.appendChild(checkbox);
    label.appendChild(text);
    label.appendChild(deleteButton);

    li.appendChild(label);

    todoContainer.appendChild(li);
  }
}

// render ToDoList by fetch from API
async function fetchTodoList() {
  return fetch("./api/v1/list")
    .then((response) => response.json())
    .then((todoList) => {
      renderTodoList(todoList);
    });
}

// POST new item to API
async function postNewItem(todoItem) {
  const body = new FormData();
  body.append("title", todoItem.title);

  return fetch("./api/v1/add", {
    method: "POST",
    body,
  }).then((response) => response.json());
}

const newTitleInput = document.querySelector("#new-title");
const newAddButton = document.querySelector("#new-add-button");

// POST new item when add-button clicked
newAddButton.addEventListener("click", (event) => {
  const title = newTitleInput.value;

  if (title) {
    postNewItem({ title }).then((item) => fetchTodoList());
  }
});

// Initial load
fetchTodoList();
