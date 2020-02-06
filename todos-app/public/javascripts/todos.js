const toggleTodo = (id, status) => {
  axios
    .patch(`http://localhost:8000/todos/${id}`, { completed: status })
    .then(response => {
      getTodos();
      console.log(response.data);
    });
};

const getTodos = () => {
  axios.get("http://localhost:8000/todos").then(response => {
    const todoItems = response.data;
    const ul = document.querySelector("ul");

    ul.innerHTML = "";

    todoItems.forEach(todo => {
      const li = document.createElement("li");
      li.innerHTML = todo.title;

      li.onclick = () => {
        toggleTodo(todo.id, !todo.completed);
      };

      if (todo.completed) {
        li.classList.add("done");
      }
      ul.appendChild(li);
    });
  });
};

getTodos();

document.querySelector("form").onsubmit = event => {
  event.preventDefault();

  axios
    .post("http://localhost:8000/todos", {
      title: document.querySelector("input").value,
      completed: false
    })
    .then(response => {
      getTodos();
      document.querySelector("form").reset();
    });
};
