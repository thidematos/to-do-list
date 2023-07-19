'use strict';

const btnExpand = document.querySelectorAll('.btn-expand');
const expandModal = document.querySelector('.expandModal');

const modalCover = document.querySelector('.modal__cover');
const modal = document.querySelector('.modal');
const closeInModal = document.querySelector('.closeInModal');

const toDoHeader = document.querySelectorAll('.toDo__header');
const toDoList = document.querySelector('.toDo__list');
const doneList = document.querySelector('.done__list');

const modalDetails = document.querySelector('.modal__details');
const modalTaskTitle = document.querySelector('.modal__taskTitle');
const modalTaskDescription = document.querySelector('.modal__taskDescription');
const modalTaskImportance = document.querySelector('.modal__taskImportance');
const modalTimeStamp = document.querySelector('.modal__timeStamp');

const btnCrud = document.querySelector('.btnCrud');
const inputTaskTitle = document.querySelector('#taskTitle');
const inputTaskDescription = document.querySelector('#taskDescription');
const inputTaskImportance = document.querySelector('#taskPriority');
const taskPriorityLabel = document.querySelector('.taskPriority-importance');

const closeModal = function () {
  modalCover.classList.add('hidden');
  modal.classList.add('hidden');
  modalDetails.classList.add('hidden');

  inputTaskTitle.value = '';
  inputTaskDescription.value = '';
};

closeInModal.addEventListener('click', closeModal);
modalCover.addEventListener('click', closeModal);

expandModal.addEventListener('click', () => {
  modalCover.classList.remove('hidden');
  modal.classList.remove('hidden');
});

let toDoHeaderStatus = [true, false];

toDoHeader.forEach((element) => {
  element.addEventListener('click', (e) => {
    const target = Number(
      e.target.closest('.toDo__header').dataset.headerstatus
    );

    const awesome = e.target.closest('.toDo__header').querySelector('.awesome');

    toDoHeaderStatus[target] = !toDoHeaderStatus[target];

    if (toDoHeaderStatus[target]) {
      e.target
        .closest('.toDo__header')
        .nextElementSibling.classList.remove('scaleHidden');

      awesome.classList.remove('fa-angles-down');

      awesome.classList.add('fa-angles-up');
    } else {
      e.target
        .closest('.toDo__header')
        .nextElementSibling.classList.add('scaleHidden');

      awesome.classList.add('fa-angles-down');

      awesome.classList.remove('fa-angles-up');
    }
  });
});

const toDo = {};
const done = {};

class Task {
  status;

  constructor(taskTitle, taskDescription, timeStamp, taskImportance) {
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.timeStamp = timeStamp;
    this.taskImportance = taskImportance;

    this.status = false;

    toDo[timeStamp] = this;
  }

  #generateHTML(taskTitle, state) {
    const html = `<li class="toDo__item" data-tasknum="${this.timeStamp}">
    <h1 class="taskTitle ${state ? 'line-through' : ''}">${taskTitle}</h1>
    <div>
      <i class="fa-solid fa-circle text-xl" style="color: ${
        this.getHexImportance()[0]
      }"></i>
      <button>
        <i class="doneBtn fa-${
          state ? 'solid' : 'regular'
        } fa-circle text-xl" style="color: #2ab760"></i>
      </button>
      <button>
        <i
          class="trash fa-solid fa-circle-xmark text-xl"
          style="color: #862727"
        ></i>
      </button>
    </div>
  </li>`;

    return html;
  }

  getHexImportance() {
    if (this.taskImportance < 4) {
      return ['#72F789', 'Normal'];
    } else if (this.taskImportance >= 5 && this.taskImportance < 8) {
      return ['#F7EA59', 'Important'];
    } else {
      return ['#E14330', 'Critic'];
    }
  }

  insertToDoTask(state) {
    const html = this.#generateHTML(this.taskTitle, state);

    if (state) doneList.insertAdjacentHTML('beforeend', html);
    else toDoList.insertAdjacentHTML('beforeend', html);

    document
      .querySelectorAll('.trash')
      .forEach((e) => e.addEventListener('click', trash));
  }

  get getDate() {
    return new Date(this.timeStamp);
  }
}

const itsDone = function (e) {
  const target = toDo[e.target.closest('.toDo__item').dataset.tasknum];

  done[target.timeStamp] = new Task(
    target.taskTitle,
    target.taskDescription,
    target.timeStamp,
    target.taskImportance
  );

  e.target.closest('.toDo__item').remove();
  delete toDo[target.timeStamp];

  done[target.timeStamp].insertToDoTask(true);

  console.log(toDo);
  console.log(done);

  closeModal();
};

const trash = function (e) {
  console.log(e.target);
  const parent =
    e.target.closest('.toDo__list')?.dataset.which ||
    e.target.closest('.done__list').dataset.which;

  console.log(parent);

  if (parent == 0) {
    const target = toDo[e.target.closest('.toDo__item').dataset.tasknum];
    e.target.closest('.toDo__item').remove();
    delete toDo[target.timeStamp];
  } else {
    const target = done[e.target.closest('.toDo__item').dataset.tasknum];
    e.target.closest('.toDo__item').remove();
    delete done[target.timeStamp];
  }
};

btnCrud.addEventListener('click', () => {
  const newTaskTitle = inputTaskTitle.value;
  const newTaskDescription = inputTaskDescription.value;
  const newTaskImportance = inputTaskImportance.value;
  const timeNow = Date.now();

  const newTask = new Task(
    newTaskTitle,
    newTaskDescription,
    timeNow,
    newTaskImportance
  );

  newTask.insertToDoTask(false);
  const btnDone = document.querySelectorAll('.doneBtn');

  btnDone.forEach((e) => e.addEventListener('click', itsDone));
  closeModal();
  console.log(toDo);
});

const handleDetails = function (e) {
  if (e.target.classList.contains('doneBtn')) return;
  if (e.target.classList.contains('trash')) return;

  modalDetails.classList.remove('hidden');
  modalCover.classList.remove('hidden');

  const target =
    toDo[e.target.closest('.toDo__item').dataset.tasknum] ||
    done[e.target.closest('.toDo__item').dataset.tasknum];
  const time = target.getDate;
  const [hexImportance, importance] = target.getHexImportance();

  modalTaskTitle.textContent = target.taskTitle;
  modalTaskDescription.textContent = target.taskDescription;
  modalTimeStamp.textContent = `${String(time.getDate()).padStart(
    2,
    '0'
  )}/${String(time.getMonth()).padStart(
    2,
    '0'
  )}/${time.getFullYear()} - ${String(time.getHours()).padStart(
    2,
    '0'
  )}:${String(time.getMinutes()).padStart(2, '0')}`;

  modalTaskImportance.style.backgroundColor = hexImportance;
  modalTaskImportance.textContent = importance;
};

toDoList.addEventListener('click', handleDetails);
doneList.addEventListener('click', handleDetails);

inputTaskImportance.addEventListener('change', () => {
  const priority = inputTaskImportance.value;

  if (priority < 4) {
    taskPriorityLabel.style.backgroundColor = '#72F789';
    taskPriorityLabel.textContent = 'Normal';
  } else if (priority >= 5 && priority < 8) {
    taskPriorityLabel.style.backgroundColor = '#F7EA59';
    taskPriorityLabel.textContent = 'Important';
  } else {
    taskPriorityLabel.style.backgroundColor = '#E14330';
    taskPriorityLabel.textContent = 'Critic';
  }
});
