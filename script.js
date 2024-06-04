let students = [];
const apiURL =
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  renderTable(students);
});

async function fetchData() {
  const response = await fetch(apiURL);
  students = await response.json();
}

function renderTable(data) {
  const tableContainer = document.getElementById("student-table");
  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Passing</th>
            <th>Class</th>
            <th>Gender</th>
        </tr>
    `;

  data.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${student.image}" alt="${student.first_name} ${
      student.last_name
    }">
                ${student.first_name} ${student.last_name}
            </td>
            <td>${student.email}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.class}</td>
            <td>${student.gender}</td>
        `;
    table.appendChild(row);
  });

  tableContainer.appendChild(table);
}

function handleSearch() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
  );
  renderTable(filteredStudents);
}

function sortAZ() {
  const sortedStudents = [...students].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  renderTable(sortedStudents);
}

function sortZA() {
  const sortedStudents = [...students].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    return nameB.localeCompare(nameA);
  });
  renderTable(sortedStudents);
}

function sortByMarks() {
  const sortedStudents = [...students].sort((a, b) => a.marks - b.marks);
  renderTable(sortedStudents);
}

function sortByPassing() {
  const passingStudents = students.filter((student) => student.passing);
  renderTable(passingStudents);
}

function sortByClass() {
  const sortedStudents = [...students].sort((a, b) => a.class - b.class);
  renderTable(sortedStudents);
}

function sortByGender() {
  const maleStudents = students.filter((student) => student.gender === "male");
  const femaleStudents = students.filter(
    (student) => student.gender === "female"
  );

  const tableContainer = document.getElementById("student-table");
  tableContainer.innerHTML = "";

  const maleTable = document.createElement("table");
  maleTable.innerHTML =
    `<tr><th colspan="6">Male Students</th></tr>` + getTableHeaders();
  maleStudents.forEach((student) =>
    maleTable.appendChild(getTableRow(student))
  );

  const femaleTable = document.createElement("table");
  femaleTable.innerHTML =
    `<tr><th colspan="6">Female Students</th></tr>` + getTableHeaders();
  femaleStudents.forEach((student) =>
    femaleTable.appendChild(getTableRow(student))
  );

  tableContainer.appendChild(maleTable);
  tableContainer.appendChild(femaleTable);
}

function getTableHeaders() {
  return `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Passing</th>
            <th>Class</th>
            <th>Gender</th>
        </tr>
    `;
}

function getTableRow(student) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${student.image}" alt="${student.first_name} ${
    student.last_name
  }">
            ${student.first_name} ${student.last_name}
        </td>
        <td>${student.email}</td>
        <td>${student.marks}</td>
        <td>${student.passing ? "Passing" : "Failed"}</td>
        <td>${student.class}</td>
        <td>${student.gender}</td>
    `;
  return row;
}
