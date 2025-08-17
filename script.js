// ---------- TAB SWITCHING ----------
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tabContent');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabContents.forEach(tc => tc.style.display = 'none');
    document.getElementById(tab.dataset.tab).style.display = 'block';
  });
});

// ---------- ROUTE DATA ----------
const routeData = [
  { sno: 1, station: 'DHANAS', time: '7:15 AM' },
  { sno: 2, station: 'KHUDA LAHORA', time: '7:24 AM' },
  { sno: 3, station: 'PGI', time: '7:28 AM' },
  { sno: 4, station: 'PGI NEW OPD', time: '7:29 AM' },
  { sno: 5, station: 'NAYAGAON BARRIER', time: '7:32 AM' },
  { sno: 6, station: 'SECRETARIATE', time: '7:40 AM' },
  { sno: 7, station: 'SECTOR-15-16 LIGHTS', time: '7:47 AM' },
  { sno: 8, station: 'SECTOR-14-15 LIGHTS', time: '7:48 AM' },
  { sno: 9, station: 'SECTOR-15-24 LIGHT', time: '7:51 AM' },
  { sno: 10, station: 'SECTOR-23-24 LIGHT', time: '7:54 AM' },
  { sno: 11, station: 'SECTOR-36-34 LIGHT', time: '7:58 AM' },
  { sno: 12, station: 'SECTOR-37 BSNL LIGHT', time: '8:03 AM' },
  { sno: 13, station: 'SECTOR-38 MARKET', time: '8:05 AM' },
  { sno: 14, station: 'SECTOR-38 WEST', time: '8:08 AM' },
  { sno: 15, station: 'MADANPUR CHOWNK', time: '8:10 AM' },
  { sno: 16, station: 'PHASE-3/5 LIGHTS', time: '8:20 AM' },
  { sno: 17, station: 'PHASE-4', time: '8:25 AM' },
  { sno: 18, station: 'PHASE-5 GURUDWARA', time: '8:30 AM' },
  { sno: 19, station: 'IVY HOSPITAL', time: '8:35 AM' },
  { sno: 20, station: 'COLLEGE CAMPUS', time: '8:50 AM' }
];

const routeTableBody = document.querySelector('#routeTable tbody');
routeData.forEach(row => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${row.sno}</td>
    <td>${row.station}</td>
    <td>${row.time}</td>
  `;
  routeTableBody.appendChild(tr);
});

// ---------- SEAT RESERVATION ----------
const seatContainer = document.getElementById('seatContainer');
const message = document.getElementById('message');

const rows = 5; // number of seat rows
const cols = 4; // seats per row

let reservedSeats = [];
let selectedSeat = null;

// Create seat layout
for (let i = 0; i < rows; i++) {
  const rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  for (let j = 0; j < cols; j++) {
    const seatNumber = i * cols + j + 1;
    const seat = document.createElement('div');
    seat.className = 'seat available';
    seat.innerText = seatNumber;

    seat.addEventListener('click', () => {
      if (seat.classList.contains('reserved')) return;
      if (selectedSeat) selectedSeat.classList.remove('selected');
      seat.classList.add('selected');
      selectedSeat = seat;
    });

    rowDiv.appendChild(seat);
  }
  seatContainer.appendChild(rowDiv);
}

// Book Seat
document.getElementById('bookBtn').addEventListener('click', () => {
  if (!selectedSeat) {
    message.innerText = 'Please select a seat to book!';
    return;
  }
  selectedSeat.classList.remove('available', 'selected');
  selectedSeat.classList.add('reserved');
  reservedSeats.push(selectedSeat.innerText);
  message.innerText = `Seat ${selectedSeat.innerText} booked successfully!`;
  selectedSeat = null;
});

// Cancel Seat
document.getElementById('cancelBtn').addEventListener('click', () => {
  if (!selectedSeat) {
    message.innerText = 'Please select a seat to cancel!';
    return;
  }
  if (!selectedSeat.classList.contains('reserved')) {
    message.innerText = 'This seat is not reserved!';
    return;
  }
  selectedSeat.classList.remove('reserved', 'selected');
  selectedSeat.classList.add('available');
  reservedSeats = reservedSeats.filter(s => s !== selectedSeat.innerText);
  message.innerText = `Seat ${selectedSeat.innerText} canceled successfully!`;
  selectedSeat = null;
});

// Women Safety Alert
document.getElementById('alertBtn').addEventListener('click', () => {
  addNotification('Women Safety Alert triggered! Admin has been notified.');
});

// ---------- NOTIFICATIONS ----------
const notificationsDiv = document.getElementById('notifications');

function addNotification(text) {
  const notif = document.createElement('div');
  notif.className = 'notif';
  notif.innerText = `${new Date().toLocaleTimeString()} - ${text}`;
  notificationsDiv.prepend(notif);
}

// ---------- SETTINGS ----------
document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  addNotification('Settings saved successfully!');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  addNotification('User logged out!');
});
