document.getElementById('jsonFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      displayData(data);
    } catch (err) {
      document.getElementById('output').innerHTML = '<p style="color:red;">Invalid JSON file.</p>';
    }
  };
  reader.readAsText(file);
});

function displayData(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  const coreInfo = data.core || {};
  const purchases = data.transactions || [];
  const friends = data.friends || [];
  const devices = data.trusted_devices || [];
  const faStatus = data['2fa'] || 'Unknown';

  output.innerHTML += '<h2>Core Information</h2>';
  output.innerHTML += `<p><strong>Full Name:</strong> ${coreInfo.name || 'N/A'}</p>`;
  output.innerHTML += `<p><strong>Email:</strong> ${coreInfo.email || 'N/A'}</p>`;
  output.innerHTML += `<p><strong>Username:</strong> ${coreInfo.username || 'N/A'}</p>`;
  output.innerHTML += `<p><strong>Country:</strong> ${coreInfo.country || 'N/A'}</p>`;
  output.innerHTML += `<p><strong>Member Since:</strong> ${coreInfo.member_since || 'N/A'}</p>`;

  output.innerHTML += '<h2>2FA Status</h2>';
  output.innerHTML += `<p>${faStatus}</p>`;

  output.innerHTML += '<h2>Friends</h2>';
  output.innerHTML += friends.length > 0
    ? '<ul>' + friends.map(f => `<li>${f}</li>`).join('') + '</ul>'
    : '<p>No friends listed.</p>';

  output.innerHTML += '<h2>Purchase History</h2>';
  output.innerHTML += purchases.length > 0
    ? '<ul>' + purchases.map(p => `<li>${p.date}: ${p.item} - ${p.amount}</li>`).join('') + '</ul>'
    : '<p>No transactions found.</p>';

  output.innerHTML += '<h2>Trusted Devices</h2>';
  output.innerHTML += devices.length > 0
    ? '<ul>' + devices.map(d => `<li>${d}</li>`).join('') + '</ul>'
    : '<p>No trusted devices found.</p>';
}
