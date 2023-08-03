const toDoList = document.getElementById("list");

const button = document.getElementById("button").addEventListener("click", function() {
    let inputValue = document.getElementById("input");

    if(inputValue.value.length) {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.innerText = inputValue.value;
        li.appendChild(p);
        toDoList.appendChild(li);
        inputValue.value = "";
        
        let span = document.createElement("span");
        span.innerText = "x";
        li.appendChild(span);
        saveToDos();
    }
});

// Toggle mark task as complete
toDoList.addEventListener("click", function(event) {

    if(event.target.tagName.toLowerCase() === "p") {
        event.target.classList.toggle("completed") // if class is "completed" - set css to line-through
        saveToDos();
    }
    if(event.target.tagName.toLowerCase() === "span") {
        event.target.parentElement.remove() // remove the parent element - li
        saveToDos();
    }
});

// Local storage
if(!localStorage.length) {
    saveToDos();
} else setToDos();

function saveToDos() {
    const toDos = [];
    const listItems = document.querySelectorAll("#list li"); // Select all to-do's
    console.log(listItems)
    listItems.forEach((item) => {
        const toDosText = item.querySelector("p").innerText;
        const isCompleted = item.querySelector("p").classList.contains("completed");
        toDos.push({ text: toDosText, completed: isCompleted });
    });
    // console.log(toDos)
    // console.log(JSON.stringify(toDos))
    localStorage.setItem("todos", JSON.stringify(toDos));
    console.log(localStorage.getItem("todos"))
}

function setToDos() {
    const toDos = JSON.parse(localStorage.getItem("todos"));
    const hasToDos = toDos.length;
    const savedToDos = hasToDos ? toDos : []; // Fallback -> Will take an empty array
    // console.log(savedToDos);
    // Attach stuff to the DOM
    savedToDos.forEach((toDo) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerText = toDo.text;
        li.appendChild(p);
        if (toDo.completed) {
            p.classList.add("completed");
        }
        toDoList.appendChild(li);
        const span = document.createElement("span");
        span.innerText = "x";
        li.appendChild(span);
    });
}


