// Select elements
const form = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

// Retrieve students from local storage or initialize empty array
let students = JSON.parse(localStorage.getItem('students')) || [];

// Event Listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById('studentName').value,
    id: document.getElementById('studentID').value,
    email: document.getElementById('email').value,
    contact: document.getElementById('contactNumber').value,
  };

  if (validateStudent(student)) {
    students.push(student);
    saveStudents();
    renderTable();
    form.reset();
  }
});

// Render table with student data
function renderTable() {
  studentTable.innerHTML = '';
  students.forEach((student, index) => {
    const row = studentTable.insertRow();
    row.insertCell(0).textContent = student.name;
    row.insertCell(1).textContent = student.id;
    row.insertCell(2).textContent = student.email;
    row.insertCell(3).textContent = student.contact;

    const actionsCell = row.insertCell(4);
    actionsCell.innerHTML = `
      <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
    `;
  });
}

// Save students to local storage
function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Edit student record
function editStudent(index) {
  const student = students[index];
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentID').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contactNumber').value = student.contact;

  deleteStudent(index); // Remove the student so the edited one can be added
}

// Delete student record
function deleteStudent(index) {
  students.splice(index, 1);
  saveStudents();
  renderTable();
}

// Validate student input
function validateStudent(student) {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const idRegex = /^[0-9]+$/;
  const contactRegex = /^[0-9]{10}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!nameRegex.test(student.name)) {
    alert('Please enter a valid name (letters only).');
    return false;
  }
  if (!idRegex.test(student.id)) {
    alert('Student ID must be numeric.');
    return false;
  }
  if (!emailRegex.test(student.email)) {
    alert('Please enter a valid email.');
    return false;
  }
  if (!contactRegex.test(student.contact)) {
    alert('Please enter a 10-digit contact number.');
    return false;
  }
  return true;
}

// Initial render of the student table
renderTable();


