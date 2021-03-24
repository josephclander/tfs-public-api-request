const body = document.querySelector('body');
const searchbar = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');

// ---------------------
// Fetch Request
// ---------------------
fetch(
  'https://randomuser.me/api/?results=12&inc=name,email,location,cell,dob,picture&nat=us'
)
  .then((response) => response.json())
  .then(({ results: employeeObjectList }) => {
    // add an index and isHidden to find and hide
    for (let i = 0; i < employeeObjectList.length; i++) {
      const employee = employeeObjectList[i];
      employee.id = i;
      employee.isHidden = false;
    }
    // console.log(employeeObjectList);
    createEmployeeCards(employeeObjectList);
    clickHandler(employeeObjectList);
    createModal();
  });

// ---------------------
// Helper Functions
// ---------------------

/**
 * create employee cards and add to DOM
 * @param employees {object} - all info about each employee
 */
function createEmployeeCards(employees) {
  const htmlArray = employees.map((employee) => {
    // attaching the id - using strategy from React list items
    return `<div class="card" id="${employee.id}">
                <div class="card-img-container">
                  <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="card-text">${employee.email}</p>
                  <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
              </div>`;
  });
  const htmlOutput = htmlArray.join('');
  // add in one go to reduce calls to DOM
  gallery.insertAdjacentHTML('beforeend', htmlOutput);
}

/**
 * click handler to add eventlistener to each card
 */
function clickHandler(employeeObjectList) {
  // convert node list to array to use array methods
  const employeeDOMList = [...gallery.children];
  employeeDOMList.forEach((employee) => {
    employee.addEventListener('click', (event) => {
      const index = event.currentTarget.id;
      showModal(employeeObjectList[index]);
    });
  });
}

/**
 * create the frame for the modal and hide it with inline style
 */
function createModal() {
  const html = `<div class="modal-container">
                  <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                  </div>
                </div>`;
  body.insertAdjacentHTML('beforeend', html);
  document.querySelector('.modal-container').style.display = 'none';
}

/**
 * create a modal window based on clicked employee
 * @param employee {object} - all info about employee
 */
function showModal(employee) {
  modalContainer = document.querySelector('.modal-container');
  modalInfoContainer = document.querySelector('.modal-info-container');
  // wipe the current info
  console.log(employee);
  modalInfoContainer.innerHTML = '';
  const firstName = employee.name.first;
  const lastName = employee.name.last;
  const cell = parseCell(employee.cell);
  const email = employee.email;
  const image = employee.picture.large;
  const { street, city, state, postcode } = employee.location;
  const address = `${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
  const dateString = employee.dob.date;
  const birthday = parseDate(dateString);
  const html = `<img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="${firstName}-${lastName}" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${cell}</p>
                <p class="modal-text">${address}</p>
                <p class="modal-text">Birthday: ${birthday}</p>`;
  // insert info to the container
  modalInfoContainer.insertAdjacentHTML('beforeend', html);
  // display the modal - will stay displayed if already there
  modalContainer.style.display = 'block';
}

/**
 * date parser
 * @param date {date}
 */
function parseDate(date) {
  // need month / day / year
  // example input = 1957-11-16T01:45:46.027Z
  // so arrives as full year-month-day
  const year = date.substr(2, 2);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const parsedDate = `${month}/${day}/${year}`;
  return parsedDate;
}

/**
 * cell parser
 * @param cell {string}
 */
function parseCell(cell) {
  // cell to be in the format (XXX) XXX-XXXX
  // all cells from data come as (XXX)-XXX-XXXX
  // so only need to replace 6th char as a space
  const parsedCell = cell.replace(cell[5], ' ');
  return parsedCell;
}
