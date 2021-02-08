let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;
let indexEdit = null;
let inputR = '';
let red = null;


window.onload = function init () {
    input = document.getElementById('input-text');
    input.addEventListener('change', updateValue); 
    render();
}


onClickButton = () => {
    allTasks.push({
        text: valueInput,
        isCheck: false
    });
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    valueInput= '';
    input.value = '';
    render();
}

updateValue = (event) => {
    valueInput = event.target.value;
}



render = () => {
    const content = document.getElementById('tasks-container');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
 allTasks.map((item, index) => {
     const container = document.createElement('div');
     container.id = `task-${index}`;
     container.className = 'task-container'
     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.checked = item.isCheck;
     checkbox.onchange = function (){
        onChangeCheckbox(index)
     };
     container.appendChild(checkbox);
     if(indexEdit === index) {
        inputR = document.createElement('input');
        inputR.type = 'text';
        inputR.className = 'edit-now';
        inputR.id = `edit-${index}`;
        inputR.addEventListener('change', editValue);
        inputR.value = valueInput;
        container.appendChild(inputR);

        inputR.onblur = () => {
            allTasks[indexEdit].text = valueInput;
            indexEdit = null;
            localStorage.setItem('tasks', JSON.stringify(allTasks));
            render();
        }
     } else {
        const text = document.createElement('p');
        text.innerText = item.text;
        text.className = item.isCheck ? 'text-task done-text' : 'text-task';
        container.appendChild(text); 
     }
     
     if(indexEdit === index) {
        const imageDone = document.createElement('img');
        imageDone.src = 'images/check-mark.svg';
        imageDone.className = 'img-btn done-btn';
        imageDone.onclick = function () {
            onDoneText(index, container);
        }
        container.appendChild(imageDone);
    } else {
        const imageEdit = document.createElement('img');
        imageEdit.src = 'images/edit.svg';
        imageEdit.id = `img-${index}`;
        imageEdit.className = 'img-btn edit-btn';
        imageEdit.onclick = function () {
            onEditText(index, container);
        }
        container.appendChild(imageEdit);
    }

    

     const imageDel = document.createElement('img');
     imageDel.src = 'images/close.svg';
     imageDel.className = 'img-btn del-btn';
     container.appendChild(imageDel);
     imageDel.onclick = function () {
        onClickDel(index);
     }

     content.appendChild(container);  
 })
}

onChangeCheckbox = (index) => {
    allTasks[index].isCheck = !allTasks[index].isCheck;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

onClickDel = (index) => {
    allTasks.splice(index,1);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

onEditText = (index) => {
    indexEdit = index;
    valueInput = allTasks[index].text;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
    inputR.focus();
}

onDoneText = (index) => {
    allTasks[indexEdit].text = valueInput;
    indexEdit = null;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}

editValue = (event) => {
    valueInput = event.target.value;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
}
 