const STORAGE_KEY = 'devlaunch-admin-v1';

const state = loadState();

const teamForm = document.getElementById('team-form');
const taskForm = document.getElementById('task-form');
const certForm = document.getElementById('cert-form');

const statTeams = document.getElementById('stat-teams');
const statTasks = document.getElementById('stat-tasks');
const statDone = document.getElementById('stat-done');
const statCerts = document.getElementById('stat-certs');

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { teams: [], tasks: [], certs: [] };

  try {
    const parsed = JSON.parse(raw);
    return {
      teams: Array.isArray(parsed.teams) ? parsed.teams : [],
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      certs: Array.isArray(parsed.certs) ? parsed.certs : [],
    };
  } catch {
    return { teams: [], tasks: [], certs: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderStats() {
  statTeams.textContent = String(state.teams.length);
  statTasks.textContent = String(state.tasks.length);
  statDone.textContent = String(state.tasks.filter((x) => x.status === 'done').length);
  statCerts.textContent = String(state.certs.length);
}

teamForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cohort = document.getElementById('team-cohort').value.trim();
  const name = document.getElementById('team-name').value.trim();
  const track = document.getElementById('team-track').value;
  const members = document.getElementById('team-members').value.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 5);

  if (members.length < 2) return;

  state.teams.push({ id: crypto.randomUUID(), cohort, name, track, members });
  saveState();
  renderStats();
  teamForm.reset();
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const project = document.getElementById('task-project').value.trim();
  const title = document.getElementById('task-title').value.trim();
  const assignee = document.getElementById('task-assignee').value.trim();
  const status = document.getElementById('task-status').value;

  state.tasks.push({ id: crypto.randomUUID(), project, title, assignee, status });
  saveState();
  renderStats();
  taskForm.reset();
});

certForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('cert-name').value.trim();
  const track = document.getElementById('cert-track').value;
  const partner = document.getElementById('cert-partner').value.trim();

  state.certs.push({ id: `CERT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, name, track, partner });
  saveState();
  renderStats();
  certForm.reset();
});

renderStats();
