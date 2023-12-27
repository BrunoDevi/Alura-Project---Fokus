const btnAddTask = document.querySelector('.app__button--add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const btnDelAll = document.getElementById('btn-remover-todas');
const btnDelCompleted = document.getElementById('btn-remover-concluidas');

const taskForm = document.querySelector('.app__form-add-task');
const taskList = document.querySelector('.app__section-task-list');
const taskText = document.querySelector('.app__form-textarea');
const taskContainer = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTask(){ // Cria ou Adiciona a task atual no localStorag
    localStorage.setItem('tarefas', JSON.stringify(taskContainer));
}

function criarElementoTask(task){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const checkBtn = document.createElement('a');
    checkBtn.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>`;

    checkBtn.onclick = ()=>{
        li.classList.toggle('app__section-task-list-item-complete');
    }

    const text = document.createElement('p');
    text.classList.add('app__section-task-list-item-description');
    text.textContent = task.descrição;

    const editBtn = document.createElement('button');
    editBtn.classList.add('app_button-edit');

    editBtn.onclick = ()=>{
        const newText = prompt('Digite o novo texto:');
        if(newText){
            text.textContent = newText;
            task.descrição = newText;
            atualizarTask();
        } else {
            alert('Preencha o campo com o novo texto!');
        }
    }

    const btnImagem = document.createElement('img');
    btnImagem.setAttribute('src', '/imagens/edit.png');
    
    editBtn.append(btnImagem);
    li.append(checkBtn);
    li.append(text);
    li.append(editBtn);

    return li 
}

function cancelarTask(){
    taskForm.classList.toggle('hidden');
    taskText.value = '';
}

taskForm.addEventListener('submit', (evento)=>{
    evento.preventDefault(); //Tira efeito de re-load do botão 'confirm'
    
    const task = { 
        descrição: taskText.value
    }

    taskList.append(criarElementoTask(task)); //Gera o elemento da Task com a função e adiciona a task na seção de lista de tarefas
    taskContainer.push(task); //adiciona a task no array 'taskContainer'
    atualizarTask();
    
    // esconde e reseta o elemento 'formulario'
    taskForm.classList.add('hidden');
    taskText.value = '';
})

btnAddTask.addEventListener('click', cancelarTask);
btnCancelar.addEventListener('click', cancelarTask);


// btnDelAll.addEventListener('click', () => {
//     taskContainer.forEach(tarefa => {
//         localStorage.clear();
//         taskList.innerHTML = '';
//         location.reload();
//     })
// })

taskContainer.forEach(tarefa => { //Executa ao acessar a pagina e add as task's salvas no localStorage na lista de tarefas
    taskList.append(criarElementoTask(tarefa))
});
