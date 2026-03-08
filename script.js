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

