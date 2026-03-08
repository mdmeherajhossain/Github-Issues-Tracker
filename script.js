let allIssues = [];

function handleLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');

    fetchIssues();
  } else {
    alert('Wrong username or password');
  }
}

async function fetchIssues() {
  showLoader(true);

  try {
    const res = await fetch(
      'https://phi-lab-server.vercel.app/api/v1/lab/issues',
    );

    const data = await res.json();

    allIssues = data.data ? data.data : data;

    displayIssues(allIssues);
  } catch (error) {
    console.log(error);
  }

  showLoader(false);
}

function displayIssues(issues) {
  const container = document.getElementById('issues-container');

  const count = document.getElementById('issue-count');

  container.innerHTML = '';

  count.innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const card = document.createElement('div');

    card.className = `bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition
${issue.status === 'open' ? 'open-border' : 'closed-border'}`;

    card.addEventListener('click', () => loadIssueDetails(issue.id));

    card.innerHTML = `

<div class="flex justify-between mb-2">

<span class="text-green-500">
<img src="${
      issue.status.toLowerCase().includes('open')
        ? 'images/Open-Status.png'
        : 'images/Closed-Status.png'
    }" class="w-4 h-4">

</span>

<span class="text-xs font-bold px-2 py-1 rounded
${
  issue.priority === 'high'
    ? 'bg-red-100 text-red-600'
    : issue.priority === 'medium'
      ? 'bg-purple-100 text-purple-600'
      : 'bg-gray-100 text-gray-600'
}">

${issue.priority || 'low'}

</span>

</div>

<h3 class="font-semibold text-sm mb-2">

${issue.title}

</h3>

<p class="text-xs text-gray-500 mb-3">

${issue.description}

</p>

<div class="flex gap-2 mb-3">

<span class="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">

<i class="fa-solid fa-bug"></i> BUG

</span>

<span class="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">

<i class="fa-solid fa-handshake"></i> HELP WANTED

</span>

</div>

<p class="text-xs text-gray-400">

#${issue.id} by ${issue.author || 'unknown'}

</p>

<p class="text-xs text-gray-400">

${issue.date || '1/15/2024'}

</p>

`;

    container.appendChild(card);
  });
}

function filterIssues(status) {
  ['all', 'open', 'closed'].forEach(tab => {
    document.getElementById(`btn-${tab}`).classList.remove('active-tab');
  });

  document.getElementById(`btn-${status}`).classList.add('active-tab');

  if (status === 'all') {
    displayIssues(allIssues);
  } else {
    const filtered = allIssues.filter(issue => issue.status === status);

    displayIssues(filtered);
  }
}

function showModal(issue) {
  const modal = document.getElementById('issue-modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
  <div class="bg-white rounded-xl p-6 w-[520px] shadow-2xl">

    <h2 class="text-2xl font-bold text-gray-800 mb-2">
      ${issue.title}
    </h2>

    <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <span class="flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold text-white
${issue.status?.toLowerCase() === 'open' ? 'bg-green-500' : 'bg-purple-500'}">

<i class="fa-regular fa-circle-dot"></i> 
${issue.status?.toLowerCase() === 'open' ? 'Opened' : 'Closed'}

</span>
      <span>• Opened by ${issue.author} • ${issue.date || '22/02/2026'}</span>
    </div>

    <div class="flex gap-2 mb-5">
      <span class="flex items-center gap-1 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
        <i class="fa-solid fa-bug"></i> BUG
      </span>

      <span class="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
        <i class="fa-solid fa-handshake"></i> HELP WANTED
      </span>
    </div>

    <p class="text-gray-600 text-sm leading-relaxed mb-6">
      ${issue.description}
    </p>

    <div class="bg-gray-100 rounded-lg p-4 flex items-center gap-24">

      <div>
        <p class="text-xs text-gray-400 font-semibold">Assignee:</p>
        <p class="font-bold text-gray-800">${issue.author}</p>
      </div>

      <div class="text-right">
        <p class="text-xs text-gray-400 font-semibold">Priority:</p>
        <span class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold text-white
        ${
          issue.priority === 'HIGH'
            ? 'bg-red-500'
            : issue.priority === 'MEDIUM'
              ? 'bg-[#FF6347]'
              : 'bg-red-500'
        }">
          ${issue.priority}
        </span>
      </div>

    </div>

    <div class="flex justify-end mt-6">
      <button onclick="closeModal()" 
      class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-semibold shadow">
        Close
      </button>
    </div>

  </div>
  `;

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('issue-modal').classList.add('hidden');
}

async function loadIssueDetails(id) {
  showLoader(true);

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );

    const data = await res.json();

    const issue = data.data ? data.data : data;

    showLoader(false);

    showModal(issue);
  } catch (error) {
    console.log(error);

    showLoader(false);
  }
}

function showLoader(status) {
  const loader = document.getElementById('loader');

  loader.classList.toggle('hidden', !status);
}

async function searchIssues() {
  const text = document.getElementById('search-input').value;

  if (text.trim() === '') {
    displayIssues(allIssues);
    return;
  }

  showLoader(true);

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
    );

    const data = await res.json();

    const issues = data.data ? data.data : data;

    displayIssues(issues);
  } catch (error) {
    console.log(error);
  }

  showLoader(false);
}