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

