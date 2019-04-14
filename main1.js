var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
all: [],
todo: [],
progress: [],
completed: []
};

var index, current;

renderTodoList();

function getArray(c){
    if(c==='all') return data.all;
    if(c==='todo') return data.todo;
    if(c==='progress') return data.progress;
    return data.completed;
}

document.getElementById('add').addEventListener('click', function() {
                                                var value = document.getElementById('item').value;
                                                var e = document.getElementById('type');
                                                var col = e.options[e.selectedIndex].value;
                                                if (value) {
                                                addItem(value, col);
                                                }
                                                });
document.getElementById('edit').addEventListener('click', function() {
                                                var value = document.getElementById('item').value;
                                                if (value) {
                                                editItem(value);
                                                }
                                                });
document.getElementById('remove').addEventListener('click', function() {
                                                 var value = document.getElementById('item').value;
                                                 if (value) {
                                                 removeItem(value);
                                                 }
                                                 });
document.getElementById('move').addEventListener('click', function() {
                                                   var value = document.getElementById('item').value;
                                                   var e = document.getElementById('type');
                                                   var col = e.options[e.selectedIndex].value;
                                                   if (value) {
                                                   removeItem(value);
                                                   addItem(value, col);
                                                   }
                                                   });

function addItem (value, col) {
    addItemToDOM(value,col);
    document.getElementById('item').value = '';
    
    getArray(col).push(value);
    dataObjectUpdated();
}

function editItem (value) {
    document.getElementById('item').value = '';
    getArray(current)[index] = value;
    items = document.querySelectorAll('.'+current),
    items[index].innerText = value;
    dataObjectUpdated();
}

function removeItem (value) {
    document.getElementById('item').value = '';
    getArray(current).splice(index, 1);
    var ul = document.querySelector('#'+current);
    var listLength = ul.children.length;
    ul.removeChild(ul.children[index]);
    dataObjectUpdated();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length &&!data.all.length &&!data.progress.length) return;
    
    for (var i = 0; i < data.all.length; i++) {
        var value = data.all[i];
        addItemToDOM(value, 'all');
    }
    
    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value, 'todo');
    }
    
    for (var i = 0; i < data.progress.length; i++) {
        var value = data.progress[i];
        addItemToDOM(value, 'progress');
    }
    
    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, 'completed');
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function addItemToDOM(text, divName) {
    var item = document.createElement('li');
    item.className = divName + ' task';
    item.innerText = text;
    var myDiv = document.getElementById(divName);
    myDiv.appendChild(item);
    item.addEventListener('click', function() {
                                  var value = this.innerText;
                                  document.getElementById('item').value = value;
                                  current = this.className.split(' ')[0];
                                  //console.log(current.split(' ')[0]);
                                  index = getArray(current).indexOf(value);
                                  });
}

