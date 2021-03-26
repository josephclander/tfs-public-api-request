const body = document.querySelector('body');
const searchbar = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
// ---------------------------------------
// Fetch Request
// ---------------------------------------
fetch(
  'https://randomuser.me/api/?results=12&inc=name,email,location,cell,dob,picture&nat=us'
)
  .then((response) => response.json())
  .then(({ results: employeeObjectList }) => {
    // add an id to each employee
    for (let i = 0; i < employeeObjectList.length; i++) {
      const employee = employeeObjectList[i];
      let name = `${employee.name.first}-${employee.name.last}`;
      employee.id = name.toLowerCase();
    }
    addSearchbar();
    createEmployeeCards(employeeObjectList);
    employeeClickHandler(employeeObjectList);
    addModal();
    modalClickHandler(employeeObjectList);
  });
// ---------------------------------------
// SEARCH FUNCTIONS
// ---------------------------------------
/**
 * add a searchbar to the DOM
 */
function addSearchbar() {
  const html = `<form action="#" method="get">
                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                </form>`;
  searchbar.insertAdjacentHTML('beforeend', html);
  const form = document.querySelector('form');
  form.addEventListener('submit', searchSubmitHandler);
}
/**
 * search submit handler
 */
function searchSubmitHandler() {
  const query = document.querySelector('#search-input').value.toLowerCase();
  const employeeDOMList = [...gallery.children];
  for (let employee of employeeDOMList) {
    const employeeName = employee
      .querySelector('#name')
      .textContent.toLowerCase();
    // check the name has those joined characters
    const isValid = employeeName.indexOf(query) > -1;
    if (isValid) {
      employee.style.display = '';
    } else {
      employee.style.display = 'none';
    }
  }
}
// ---------------------------------------
// EMPLOYEE CARD FUNCTIONS
// ---------------------------------------
/**
 * create employee cards and add to DOM
 * @param employeeObjectList {object} - all info about each employee
 */
function createEmployeeCards(employeeObjectList) {
  const htmlArray = employeeObjectList.map((employee) => {
    // attaching the id - using strategy from React list items
    return `<div class="card" data-id="${employee.id}">
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
 * @param employeeObjectList {object} - all info about each employee
 */
function employeeClickHandler(employeeObjectList) {
  // convert node list to array to use array methods
  const employeeDOMList = [...gallery.children];
  employeeDOMList.forEach((employee) => {
    employee.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.id;
      let employeeObject;
      for (let employee of employeeObjectList) {
        if (employee.id === id) employeeObject = employee;
      }
      showModal(employeeObject);
    });
  });
}
// ---------------------------------------
// MODAL FUNCTIONS
// ---------------------------------------
/**
 * create the frame for the modal and hide it with inline style
 * adding the modal toggle buttons and listeners beneath
 */
function addModal() {
  const html = `<div class="modal-container">
                  <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                  </div>
                  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                  </div>
                </div>`;
  body.insertAdjacentHTML('beforeend', html);
  // remove the modal from display at the start
  document.querySelector('.modal-container').style.display = 'none';
}
/**
 * modal close and toggle click handler
 * @param employeeObjectList {object} - all info about each employee
 */
function modalClickHandler(employeeObjectList) {
  const modalCloseBtn = document.querySelector('#modal-close-btn');
  const modalPrevBtn = document.querySelector('#modal-prev');
  const modalNextBtn = document.querySelector('#modal-next');
  modalCloseBtn.addEventListener('click', closeModal);
  modalPrevBtn.addEventListener('click', () =>
    modalToggle('prev', employeeObjectList)
  );
  modalNextBtn.addEventListener('click', () =>
    modalToggle('next', employeeObjectList)
  );
}
/**
 * search for next employee
 * @param direction {string} - options are 'prev' or 'next'
 * @param employeeObjectList {object} - all info about each employee
 */
function modalToggle(direction, employeeObjectList) {
  // get list of visible employees from the DOM
  const visibleEmployeeList = [...gallery.children].filter((card) => {
    return card.style.display === '';
  });
  // get id of the employee displayed in the modal
  const displayedEmployeeID = document.querySelector('.modal-name').id;
  // find the index of displayed in full list
  let currentIndex;
  for (let i = 0; i < visibleEmployeeList.length; i++) {
    if (visibleEmployeeList[i].dataset.id === displayedEmployeeID) {
      currentIndex = i;
    }
  }
  // different routes for 'prev' or 'next' btn press
  if (direction === 'prev') {
    // if it exists and is not first value - display employee
    if (currentIndex > 0) {
      const nextValueLower = currentIndex - 1;
      const id = visibleEmployeeList[nextValueLower].dataset.id;
      let employeeObject;
      for (let employee of employeeObjectList) {
        if (employee.id === id) employeeObject = employee;
      }
      showModal(employeeObject);
    }
  } else if (direction === 'next') {
    // if it exists and is not last value - display employee
    if (currentIndex < visibleEmployeeList.length - 1) {
      const nextValueHigher = currentIndex + 1;
      const id = visibleEmployeeList[nextValueHigher].dataset.id;
      let employeeObject;
      for (let employee of employeeObjectList) {
        if (employee.id === id) employeeObject = employee;
      }
      showModal(employeeObject);
    }
  }
}
/**
 * create a modal window based on clicked employee
 * @param employee {object} - all info about employee
 */
function showModal(employee) {
  const modalContainer = document.querySelector('.modal-container');
  const modalInfoContainer = document.querySelector('.modal-info-container');
  const firstName = employee.name.first;
  const lastName = employee.name.last;
  // add id to help locate
  const idName = firstName.toLowerCase() + `-` + lastName.toLowerCase();
  const cell = parseCell(employee.cell);
  const email = employee.email;
  const image = employee.picture.large;
  const { street, city, state, postcode } = employee.location;
  const address = `${street.number} ${street.name}, ${city}, ${state} ${postcode}`;
  const dateString = employee.dob.date;
  const birthday = parseDate(dateString);
  const html = `<img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="${idName}" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${cell}</p>
                <p class="modal-text">${address}</p>
                <p class="modal-text">Birthday: ${birthday}</p>`;
  // wipe the current info
  modalInfoContainer.innerHTML = '';
  // insert info to the container
  modalInfoContainer.insertAdjacentHTML('beforeend', html);
  // display the modal - will stay displayed if already there
  modalContainer.style.display = '';
}
/**
 * close the modal
 */
function closeModal() {
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none';
}
// ---------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------
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
