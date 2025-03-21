function getRoleFromURL() { //index.html
    const params = new URLSearchParams(window.location.search);
    return params.get('role') || 'guest';
}

function login() { //login.html
    var tdn = document.getElementById("txttendn").value;
    var mk = document.getElementById("txtmk").value;
    var diachi;

    if (tdn === 'admin@gmail.com' && mk === 'admin') {
        diachi = "index.html?role=admin";
        window.location.href = diachi;
    } else if (tdn === 'patient@gmail.com' && mk === 'patient') {
        diachi = "index.html?role=patient";
        window.location.href = diachi;
    } else if (tdn === 'guest@gmail.com' && mk === 'guest') {
        diachi = "index.html?role=guest";
        window.location.href = diachi;
    } else {
        alert("Invalid user ID or password!");
    }
}
function updateDoctor() {
    const doctorTypeSelect = document.getElementById('doctorType');
    const doctorSelect = document.getElementById('doctor');

    const selectedType = doctorTypeSelect.value;

    doctorSelect.innerHTML = '';

    if (selectedType === 'internal') {
        const doctors = [
            { value: '1', name: 'Dr. Nguyen Van Dung' },
            { value: '2', name: 'Dr. Tran Minh Quan' }
        ];
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.value;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    } else if (selectedType === 'foreign') {
        const doctors = [
            { value: '3', name: 'Dr. Le Thi Hong' },
            { value: '4', name: 'Dr. Pham Duc Thinh' }
        ];
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.value;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }
}


function quyen(role) { //index.html
    document.getElementById('ahome').style.display = 'none';
    document.getElementById('ainfo').style.display = 'none';
    document.getElementById('alist').style.display = 'none';
    document.getElementById('aadd').style.display = 'none';
    document.getElementById('alogout').style.display = 'none';

    switch (role) {
        case 'guest':
            document.getElementById('ahome').style.display = 'inline';
            document.getElementById('ainfo').style.display = 'inline';
            document.getElementById('alogout').style.display = 'inline';
            break;
        case 'patient':
            document.getElementById('ahome').style.display = 'inline';
            document.getElementById('ainfo').style.display = 'inline';
            document.getElementById('aadd').style.display = 'inline';
            document.getElementById('alogout').style.display = 'inline';
            break;
        case 'admin':
            document.getElementById('ahome').style.display = 'inline';
            document.getElementById('ainfo').style.display = 'inline';
            document.getElementById('alist').style.display = 'inline';
            document.getElementById('alogout').style.display = 'inline';
            break;
    }
}
//localStorage list.html
let productList = [];
function saveAppointment() {
    const patientName = document.getElementById('patientName').value;
    const patientNumber = document.getElementById('patientNumber').value;
    const spec = document.getElementById('spec').value;
    const doctorType = document.getElementById('doctorType').value;
    const doctor = document.getElementById('doctor').value;

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push({ patientName, patientNumber, spec, doctorType, doctor });
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('Appointment saved successfully!');
    displayAppointments();
}

function toggleAddForm(page, event) {
    event.preventDefault();

    const iframe = document.getElementById('addFormFrame');

    if (page) {
        iframe.src = page;
    } else {
        iframe.src = '';
    }
}

function displayAppointments() {
    const appointmentList = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentTable = document.getElementById('appointmentList');

    appointmentTable.innerHTML = `
        <tr>
            <th>Patient's Full Name</th>
            <th>Phone Number</th>
            <th>Speciality</th>
            <th>Doctor</th>
            <th>Action</th>
        </tr>
    `;

    // Hiển thị từng cuộc hẹn
    appointmentList.forEach((appointment, index) => {
        const row = appointmentTable.insertRow();
        row.innerHTML = `
            <td>${appointment.patientName}</td>
            <td>${appointment.patientNumber}</td>
            <td>${appointment.spec}</td>
            <td>${appointment.doctor}</td>
            <td><button onclick="deleteAppointment(${index})">Delete</button></td>
        `;
    });
}

window.onload = displayAppointments;

function deleteAppointment(index) {
    // Lấy danh sách cuộc hẹn từ localStorage
    const appointmentList = JSON.parse(localStorage.getItem('appointments')) || [];

    if (index >= 0 && index < appointmentList.length) {
        appointmentList.splice(index, 1); // Xóa cuộc hẹn tại vị trí index

        localStorage.setItem('appointments', JSON.stringify(appointmentList));

        alert('Appointment deleted successfully!');
    } else {
        alert('Error: Appointment not found.');
    }

    displayAppointments();
}
