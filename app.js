const store = {
  read(key, fallback = []) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  },
  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const state = {
  teams: store.read('teams'),
  tasks: store.read('tasks'),
  certs: store.read('certs'),
};

const teamForm = document.getElementById('team-form');
const taskForm = document.getElementById('task-form');
const certForm = document.getElementById('cert-form');

const teamList = document.getElementById('team-list');
const todoList = document.getElementById('todo');
const inProgressList = document.getElementById('in-progress');
const doneList = document.getElementById('done');
const certList = document.getElementById('cert-list');

function renderTeams() {
  teamList.innerHTML = '';
  state.teams.forEach((team) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${team.team}</strong><small>${team.cohort}</small><small>${team.members.join(', ')}</small>`;
    teamList.appendChild(li);
  });
}

function taskControls(task) {
  if (task.status === 'todo') {
    return `<button data-action="start" data-id="${task.id}">Start</button>`;
  }
  if (task.status === 'in-progress') {
    return `<button data-action="done" data-id="${task.id}">Mark Done</button>`;
  }
  return `<small>Completed</small>`;
}

function renderTasks() {
  todoList.innerHTML = '';
  inProgressList.innerHTML = '';
  doneList.innerHTML = '';

  state.tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${task.title}</strong><small>${task.project} · Level ${task.difficulty} · ${task.assignee}</small>${taskControls(task)}`;

    if (task.status === 'todo') todoList.appendChild(li);
    if (task.status === 'in-progress') inProgressList.appendChild(li);
    if (task.status === 'done') doneList.appendChild(li);
  });
}

function renderCerts() {
  certList.innerHTML = '';
  state.certs.forEach((cert) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${cert.name}</strong><small>${cert.track} · Verified by ${cert.partner}</small><small>ID: ${cert.id}</small>`;
    certList.appendChild(li);
  });
}

teamForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cohort = document.getElementById('cohort').value.trim();
  const team = document.getElementById('team').value.trim();
  const members = document
    .getElementById('members')
    .value.split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 5);

  state.teams.push({ cohort, team, members });
  store.write('teams', state.teams);
  renderTeams();
  teamForm.reset();
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const project = document.getElementById('project').value.trim();
  const title = document.getElementById('task').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  const assignee = document.getElementById('assignee').value.trim();

  state.tasks.push({
    id: crypto.randomUUID(),
    project,
    title,
    difficulty,
    assignee,
    status: 'todo',
  });

  store.write('tasks', state.tasks);
  renderTasks();
  taskForm.reset();
});

certForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('cert-name').value.trim();
  const track = document.getElementById('cert-track').value.trim();
  const partner = document.getElementById('cert-partner').value.trim();

  state.certs.push({
    id: crypto.randomUUID().slice(0, 8).toUpperCase(),
    name,
    track,
    partner,
  });

  store.write('certs', state.certs);
  renderCerts();
  certForm.reset();
});

document.body.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const id = target.dataset.id;
  const action = target.dataset.action;
  if (!id || !action) return;

  state.tasks = state.tasks.map((task) => {
    if (task.id !== id) return task;
    if (action === 'start') return { ...task, status: 'in-progress' };
    if (action === 'done') return { ...task, status: 'done' };
    return task;
  });

  store.write('tasks', state.tasks);
  renderTasks();
});

renderTeams();
renderTasks();
renderCerts();
