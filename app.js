const STORAGE_KEY = 'devlaunch-mvp-v2';

const emptyState = {
  teams: [],
  tasks: [],
  certs: [],
};

const demoPayload = {
  teams: [
    {
      id: 't1',
      cohort: 'Spring 2026',
      name: 'Rocket Pixels',
      members: ['Aylin', 'David', 'Mina', 'Omar', 'Sena'],
      track: 'Unity',
    },
    {
      id: 't2',
      cohort: 'Spring 2026',
      name: 'Droid Builders',
      members: ['Liam', 'Noah', 'Emma', 'Ava', 'Ethan'],
      track: 'Android',
    },
  ],
  tasks: [
    {
      id: 'x1',
      project: 'Space Miner',
      title: 'Build player movement controller',
      difficulty: 'B',
      assignee: 'Aylin',
      status: 'in-progress',
    },
    {
      id: 'x2',
      project: 'FlashCart',
      title: 'Implement product list pagination',
      difficulty: 'C',
      assignee: 'Noah',
      status: 'todo',
    },
    {
      id: 'x3',
      project: 'Space Miner',
      title: 'Integrate in-app purchase flow',
      difficulty: 'A',
      assignee: 'Mina',
      status: 'done',
    },
  ],
  certs: [
    {
      id: 'CERT-A001',
      name: 'Mina',
      track: 'Unity',
      partner: 'Nova Studios',
    },
  ],
};

const messageEl = document.getElementById('message');

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

const teamsCount = document.getElementById('teams-count');
const tasksCount = document.getElementById('tasks-count');
const doneCount = document.getElementById('done-count');
const certsCount = document.getElementById('certs-count');

const taskFilterStatus = document.getElementById('task-filter-status');
const certFilterTrack = document.getElementById('cert-filter-track');

const seedBtn = document.getElementById('seed-btn');
const resetBtn = document.getElementById('reset-btn');

function readState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(emptyState);

  try {
    const parsed = JSON.parse(raw);
    return {
      teams: Array.isArray(parsed.teams) ? parsed.teams : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      certs: Array.isArray(parsed.certs) ? parsed.certs : [],
    };
  } catch {
    return structuredClone(emptyState);
  }
}

let state = readState();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function notify(message, isError = false) {
  messageEl.textContent = message;
  messageEl.style.color = isError ? '#be123c' : '#0b7a35';
}

function id() {
  return crypto.randomUUID().slice(0, 8);
}

function parseMembers(input) {
  return input
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function updateStats() {
  teamsCount.textContent = String(state.teams.length);
  tasksCount.textContent = String(state.tasks.length);
  doneCount.textContent = String(state.tasks.filter((task) => task.status === 'done').length);
  certsCount.textContent = String(state.certs.length);
}

function renderTeams() {
  teamList.innerHTML = '';
  state.teams.forEach((team) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <strong>${team.name}</strong>
      <small>${team.cohort} · ${team.track}</small>
      <small>${team.members.join(', ')}</small>
      <div class="item-controls">
        <button class="secondary" data-action="delete-team" data-id="${team.id}">Delete</button>
      </div>
    `;
    li.innerHTML = `<strong>${team.team}</strong><small>${team.cohort}</small><small>${team.members.join(', ')}</small>`;
    teamList.appendChild(li);
  });
}

function taskActionButtons(task) {
  if (task.status === 'todo') {
    return `<button data-action="advance-task" data-id="${task.id}">Start</button>`;
  }

  if (task.status === 'in-progress') {
    return `<button data-action="advance-task" data-id="${task.id}">Mark Done</button>`;
  }

  return '<small>Completed</small>';
}

function statusMatch(task) {
  const activeFilter = taskFilterStatus.value;
  return activeFilter === 'all' || activeFilter === task.status;
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

  state.tasks.filter(statusMatch).forEach((task) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <strong>${task.title}</strong>
      <small>${task.project} · Level ${task.difficulty} · ${task.assignee}</small>
      <div class="item-controls">
        ${taskActionButtons(task)}
        <button class="secondary" data-action="delete-task" data-id="${task.id}">Delete</button>
      </div>
    `;
  state.tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${task.title}</strong><small>${task.project} · Level ${task.difficulty} · ${task.assignee}</small>${taskControls(task)}`;

    if (task.status === 'todo') todoList.appendChild(li);
    if (task.status === 'in-progress') inProgressList.appendChild(li);
    if (task.status === 'done') doneList.appendChild(li);
  });
}

function certMatch(cert) {
  const activeFilter = certFilterTrack.value;
  return activeFilter === 'all' || cert.track.toLowerCase() === activeFilter.toLowerCase();
}

function renderCertificates() {
  certList.innerHTML = '';
  state.certs.filter(certMatch).forEach((cert) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <strong>${cert.name}</strong>
      <small>${cert.track} · Verified by ${cert.partner}</small>
      <small>ID: ${cert.id}</small>
      <div class="item-controls">
        <button class="secondary" data-action="delete-cert" data-id="${cert.id}">Delete</button>
      </div>
    `;
function renderCerts() {
  certList.innerHTML = '';
  state.certs.forEach((cert) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${cert.name}</strong><small>${cert.track} · Verified by ${cert.partner}</small><small>ID: ${cert.id}</small>`;
    certList.appendChild(li);
  });
}

function renderAll() {
  updateStats();
  renderTeams();
  renderTasks();
  renderCertificates();
}

teamForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cohort = document.getElementById('cohort').value.trim();
  const name = document.getElementById('team').value.trim();
  const members = parseMembers(document.getElementById('members').value);
  const track = document.getElementById('team-track').value;

  if (members.length < 2) {
    notify('Please add at least 2 team members.', true);
    return;
  }

  state.teams.push({ id: id(), cohort, name, members, track });
  persist();
  renderAll();
  teamForm.reset();
  notify(`Team "${name}" was added.`);
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

  if (!project || !title || !assignee) {
    notify('Please complete all task fields.', true);
    return;
  }

  state.tasks.push({
    id: id(),
  state.tasks.push({
    id: crypto.randomUUID(),
    project,
    title,
    difficulty,
    assignee,
    status: 'todo',
  });

  persist();
  renderAll();
  taskForm.reset();
  notify(`Task "${title}" was created.`);
  store.write('tasks', state.tasks);
  renderTasks();
  taskForm.reset();
});

certForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('cert-name').value.trim();
  const track = document.getElementById('cert-track').value.trim();
  const partner = document.getElementById('cert-partner').value.trim();

  if (!name || !track || !partner) {
    notify('Please complete all certificate fields.', true);
    return;
  }

  const certId = `CERT-${id().toUpperCase()}`;
  state.certs.push({ id: certId, name, track, partner });

  persist();
  renderAll();
  certForm.reset();
  notify(`Certificate ${certId} issued for ${name}.`);
});

taskFilterStatus.addEventListener('change', () => {
  renderTasks();
});

certFilterTrack.addEventListener('change', () => {
  renderCertificates();
});

seedBtn.addEventListener('click', () => {
  state = structuredClone(demoPayload);
  persist();
  renderAll();
  notify('Demo data loaded.');
});

resetBtn.addEventListener('click', () => {
  state = structuredClone(emptyState);
  persist();
  renderAll();
  notify('All data has been reset.');
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
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const itemId = target.dataset.id;
  if (!action || !itemId) {
    return;
  }

  if (action === 'advance-task') {
    state.tasks = state.tasks.map((task) => {
      if (task.id !== itemId) return task;
      if (task.status === 'todo') return { ...task, status: 'in-progress' };
      if (task.status === 'in-progress') return { ...task, status: 'done' };
      return task;
    });
    persist();
    renderAll();
    notify('Task status updated.');
    return;
  }

  if (action === 'delete-team') {
    state.teams = state.teams.filter((team) => team.id !== itemId);
    persist();
    renderAll();
    notify('Team deleted.');
    return;
  }

  if (action === 'delete-task') {
    state.tasks = state.tasks.filter((task) => task.id !== itemId);
    persist();
    renderAll();
    notify('Task deleted.');
    return;
  }

  if (action === 'delete-cert') {
    state.certs = state.certs.filter((cert) => cert.id !== itemId);
    persist();
    renderAll();
    notify('Certificate deleted.');
  }
});

renderAll();
notify('Ready. Start by adding a team or loading demo data.');
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
