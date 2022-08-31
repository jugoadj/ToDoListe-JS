///////SELECTEURS/////

// on va selectionner nos element a laide de leurs class(selectors)et les enregistrer dans des const
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//////ECOUTEURS///////

//pour crrer une action on ajoute des ecouteur addeventlistener
document.addEventListener("DOMContentLoaded", getTodos); //au chargement de la page on va executer la fonction gettodos

todoButton.addEventListener("click", addTodo); // quand on click sur le boutyon on ajoute la fonction addtodo

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("input", filterTodo);



///////FUNCTIONS///////

function addTodo(event) {
  event.preventDefault(); // pour stopper le comportement qui redirige lutisateur et qui recharge la page
 
  //creer la  DIV
  const todoDiv = document.createElement("div"); //crrer un elemnt html de type DIV
  todoDiv.classList.add("todo");// on lui ajoute la class todo
  
  //creer le li
  const newTodo = document.createElement("li");//crrer le li
  newTodo.innerText = todoInput.value;//on ajoute la valeur saisie dans le todoinput qui est text dans le li avc la methode inertext 
  newTodo.classList.add("todo-item");//lui ajouter la class todo-item
  todoDiv.appendChild(newTodo);//pour ajouter le li dans le div (pour que le li(newtodo) soit un fils du div  (tododiv))

  //Ajouter la todo au localstorage
  saveLocalTodos(todoInput.value);

  //Boutton Check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';// on ajoute un elemnt html au boutton qui est la balise <i>
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);//on ajoute le boutton comme fils de tododiv
 
  //Button suppr
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

   //AJOUTER NOTRE TODO À TODO-LIST
   todoList.appendChild(todoDiv);// ajouter la div qu'on a creer(tododiv) comme fils de l'elemnent (todolist) qu'ona recup en haut
   todoInput.value = ""; 

} 

function deleteCheck(e) {
  
  const item = e.target; // e.target  C'est une référence à l'objet html qui a envoyé l'événement
  
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {//si l'objet qu'on a selecionner a a classe trash-btn 
    
    const todo = item.parentElement;//on recupere le parent de l'objet qu'on a selectionner  dans une const todo
    todo.classList.add("fall");//on luit met la class fall (styliser en css)
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }


}

function filterTodo(e) {
  const todos = todoList.childNodes; //RECUP les enfant de todolist
  todos.forEach(function (todo) {// La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
    switch (e.target.value) { //switvh la valeur de l'element qu'on cible la quel est definit dans le html
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//stocker les items de la todoliste pour que qu'on on recharge la todoliste ne disparaisse pas
//avc le localstorage

function saveLocalTodos(todo) {
  //Checker si il y a des items existants
  let todos;
  if (localStorage.getItem("todos") === null) {// méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));// méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //AJOUTER NOTRE TODO À TODO-LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);//La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments
  localStorage.setItem("todos", JSON.stringify(todos));
}