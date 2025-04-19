const sampleUsers = {
  "suleiman@example.com": {
    password: "1234",
    core: {
      name: "Aristotelis Beihammer",
      email: "suleiman@example.com",
      username: "xxSuleimanxx",
      country: "GB",
      member_since: "2015-12-01"
    },
    "2fa": "Enabled",
    friends: ["AlphaWolf", "GhostReaper", "LunaSky"],
    transactions: [
      { "date": "2022-08-12", "item": "Assassin's Creed Valhalla", "amount": "$59.99" },
      { "date": "2023-03-22", "item": "Rainbow Six Credits", "amount": "$19.99" }
    ],
    trusted_devices: ["iPhone 13 Pro", "Windows PC", "PlayStation 5"]
  }
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const user = sampleUsers[email];

  if (!user || user.password !== password) {
    document.getElementById('output').innerHTML = '<p style="color:red;">Invalid email or password.</p>';
    return;
  }

  displayData(user);
});

function displayData(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  const coreInfo = data.core;
  const purchases = data.transactions || [];
  const friends = data.friends || [];
  const devices = data.trusted_devices || [];
  const faStatus = data['2fa'] || 'Unknown';

  output.innerHTML += '<h2>Core Information</h2>';
  output.innerHTML += `<p><strong>Full Name:</strong> ${coreInfo.name}</p>`;
  output.innerHTML += `<p><strong>Email:</strong> ${coreInfo.email}</p>`;
  output.innerHTML += `<p><strong>Username:</strong> ${coreInfo.username}</p>`;
  output.innerHTML += `<p><strong>Country:</strong> ${coreInfo.country}</p>`;
  output.innerHTML += `<p><strong>Member Since:</strong> ${coreInfo.member_since}</p>`;

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
