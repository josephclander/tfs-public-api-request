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
  .then(({ results }) => {
    createEmployeeCards(results);
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
    return `<div class="card">
                <div class="card-img-container">
                  <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                  <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                  <p class="card-text"><a href="mailto:${employee.email}">${employee.email}</a></p>
                  <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
              </div>`;
  });
  const htmlOutput = htmlArray.join('');
  gallery.insertAdjacentHTML('beforeend', htmlOutput);
}
