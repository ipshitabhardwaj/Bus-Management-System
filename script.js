// Tab switching
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

// DOM elements
const placeDropdown = document.getElementById('placeDropdown');
const routeDropdown = document.getElementById('routeDropdown');
const driverInfoDiv = document.getElementById('driverInfo');
const routeTableBody = document.querySelector('#routeTable tbody');
const routeTitle = document.getElementById('routeTitle');

// Populate route dropdown when place is selected
placeDropdown.addEventListener('change', () => {
    const place = placeDropdown.value;

    // Clear previous route options
    routeDropdown.innerHTML = '<option value="">--Choose Route--</option>';

    if (place && busRoutes[place]) {
        const routes = Object.keys(busRoutes[place]);
        routes.forEach(routeNo => {
            const option = document.createElement('option');
            option.value = routeNo;
            option.textContent = 'Route ' + routeNo;
            routeDropdown.appendChild(option);
        });
    }

    // Clear driver info and table
    driverInfoDiv.innerHTML = '';
    routeTableBody.innerHTML = '';
    routeTitle.textContent = 'Route Details';
});

// Populate route table and driver info when route is selected
routeDropdown.addEventListener('change', () => {
    const place = placeDropdown.value;
    const routeNo = routeDropdown.value;

    if (place && routeNo && busRoutes[place][routeNo]) {
        const route = busRoutes[place][routeNo];

        // Update driver info
        driverInfoDiv.innerHTML = `<strong>Driver:</strong> ${route.driver} | <strong>Mobile:</strong> ${route.mobile}`;

        // Update route table
        routeTableBody.innerHTML = '';
        route.stations.forEach(station => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${station.sno}</td>
                <td>${station.station}</td>
                <td>${station.time}</td>
            `;
            routeTableBody.appendChild(tr);
        });

        routeTitle.textContent = `Route ${routeNo} Details`;
    } else {
        // Clear if route not found
        driverInfoDiv.innerHTML = '';
        routeTableBody.innerHTML = '';
        routeTitle.textContent = 'Route Details';
    }
});
