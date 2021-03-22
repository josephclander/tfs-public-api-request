//
// Fetch request
//
fetch(
  'https://randomuser.me/api/?results=12&inc=name,email,location,cell,dob,picture&nat=gb'
)
  .then((response) => response.json())
  .then((data) => console.log(data.results));
