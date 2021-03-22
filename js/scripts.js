//
// Fetch request
//
fetch(
  'https://randomuser.me/api/?results=12&inc=name,email,location,cell,dob,picture&nat=us'
)
  .then((response) => response.json())
  .then((data) => {
    return console.log(data.results);
  });
