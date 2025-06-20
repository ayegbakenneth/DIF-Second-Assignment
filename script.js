let request = (obj) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve((xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
}

let object = {
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'get',
    body: null
}

let todoList = document.getElementById('todoList');


async function doIt() {
    try {
        const results = await request(object);
        if (results) {
            results.forEach(todo => {
                let li = document.createElement('li');
                li.textContent = `${todo.id}: ${todo.title} (${todo.completed ? "Completed" : "Not Completed"})`; // Display status
                todoList.appendChild(li);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

doIt();
