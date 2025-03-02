// Modal Functions
function openReportModal() {
  document.getElementById('reportModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('reportModal').style.display = 'none';
  document.getElementById('response').textContent = '';
}

// Form Submission (Kept for future use)
document.getElementById('crimeForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const crimeData = Object.fromEntries(formData);

  if (!crimeData.title || !crimeData.description || !crimeData.location) {
    document.getElementById('response').textContent = 'Please fill all fields.';
    return;
  }

  const response = await fetch('/api/crimes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(crimeData)
  });
  const result = await response.json();
  document.getElementById('response').textContent = result.message || 'Crime reported successfully!';
  e.target.reset();
  closeModal();
});

// View Reported Crimes (For reported-crimes.html)
async function viewCrimes() {
  console.log('Fetching reported crimes...');
  try {
    const response = await fetch('/api/crimes');
    if (!response.ok) throw new Error('Network response was not ok');
    const crimes = await response.json();
    console.log('Crimes fetched:', crimes);

    const crimeTableBody = document.getElementById('crimeTableBody');
    crimeTableBody.innerHTML = '';

    if (crimes.length > 0) {
      crimes.forEach(crime => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${crime.title || 'N/A'}</td>
          <td>${crime.location || 'N/A'}</td>
          <td>${crime.date ? new Date(crime.date).toLocaleDateString() : 'No Date'}</td>
          <td>${crime.status || 'Not Set'}</td>
          <td><button onclick="alert('Details: ${crime.description || 'No description'}')">View</button></td>
        `;
        crimeTableBody.appendChild(row);
      });
    } else {
      crimeTableBody.innerHTML = '<tr><td colspan="5">No crimes reported yet.</td></tr>';
    }
  } catch (error) {
    console.error('Error fetching crimes:', error);
    const crimeTableBody = document.getElementById('crimeTableBody');
    crimeTableBody.innerHTML = '<tr><td colspan="5">Error loading crimes. Check console for details.</td></tr>';
  }
}

// Search Functionality (For reported-crimes.html)
function searchCrimes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  if (!query) {
    viewCrimes();
    return;
  }
  fetch('/api/crimes')
    .then(response => response.json())
    .then(crimes => {
      const filteredCrimes = crimes.filter(crime => 
        (crime.title && crime.title.toLowerCase().includes(query)) || 
        (crime.location && crime.location.toLowerCase().includes(query))
      );
      const crimeTableBody = document.getElementById('crimeTableBody');
      crimeTableBody.innerHTML = '';
      if (filteredCrimes.length > 0) {
        filteredCrimes.forEach(crime => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${crime.title || 'N/A'}</td>
            <td>${crime.location || 'N/A'}</td>
            <td>${crime.date ? new Date(crime.date).toLocaleDateString() : 'No Date'}</td>
            <td>${crime.status || 'Not Set'}</td>
            <td><button onclick="alert('Details: ${crime.description || 'No description'}')">View</button></td>
          `;
          crimeTableBody.appendChild(row);
        });
      } else {
        crimeTableBody.innerHTML = '<tr><td colspan="5">No matching crimes found.</td></tr>';
      }
    });
}

// Reset Search Functionality
function resetSearch() {
  document.getElementById('searchInput').value = '';
  viewCrimes(); // Reload the full list
}

// Load crimes on reported-crimes.html
if (window.location.pathname.includes('reported-crimes.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, fetching crimes...');
    viewCrimes();
  });
}