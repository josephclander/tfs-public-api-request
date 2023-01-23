# Public API Requests

A client task to create a site for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

You’ll use the Random User Generator API (https://randomuser.me/) to grab information for 12 random “employees,” and use that data to build a prototype for an Awesome Startup employee directory.

## Screenshots

<img width="300px" src="https://user-images.githubusercontent.com/19231569/214103642-461cba20-98db-4b50-ad9d-a2ddf237faca.png"> <img width="300px" src="https://user-images.githubusercontent.com/19231569/214103756-eec6fbb5-1a03-474e-8c8d-98ff5bfc07c8.png"> <img width="300px" src="https://user-images.githubusercontent.com/19231569/214103768-870f4315-c947-4ea7-b251-3108094c1485.png">

## Table of Contents!

[Instructions](#instructions)

[Extra Credit Instructions](#extra-credit-instructions)

[Browser Testing](#browser-testing)

[Notes from the Build](#notes-from-the-build)

[Treehouse Frontend Techdegree Version](#treehouse-frontend-techdegree-version)

## Instructions

1. Create your js/scripts.js file and wire it up to the HTML

   - You may use jQuery if you like.
   - Other frameworks, libraries or plugins are not permitted.

2. HTML

   - You'll be provided with a basic index.html file to use in your project. But this file is missing the main components of the app, which you will need to create and add to the DOM dynamically.
   - Comments in the index.html file contain examples of the markup you'll need to add. So use the markup in those comments as a template. And keep in mind that altering the arrangement of the markup and the attributes used may break the styles or functionality.

   ```
   NOTE: When adding or concatenating to the DOM, avoid doing this:

   element.innerHTML += 'HTML string'.

   That technique rewrites the entire DOM. This is problematic because any rewritten elements won't retain any event listeners that were attached to the DOM before the rewrite occurs. Use this method instead:

   element.insertAdjacentHTML('beforeend', 'HTML string').

    That technique will allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM.
   ```

3. Structure, style and CSS

   - Your finished project should match the general position and layout of the mockups. If you followed the arrangement and attributes of the template markup in the HTML comments, then the provided styles should accomplish this for you.
   - You are encouraged to experiment with things like color, background color, font, shadows, transitions and animations to make this project your own.

4. Get and display 12 random users

   - With information provided from [The Random User Generator API](https://randomuser.me/), send a **single** request to the API, and use the response data to display 12 users, along with some basic information for each:
     - Image
     - First and Last Name
     - Email
     - City or location
   - Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

5. Create a modal window

   - When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
     - Image
     - Name
     - Email
     - City or location
     - Cell Number
     - Detailed Address, including street name and number, state or country, and post code.
     - Birthday
   - Make sure there’s a way to close the modal window
   - Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

   **NOTE:** The formatting of the Cell Number should be (XXX) XXX-XXXX and the formatting of the Birthday should be MM/DD/YYYY.

## Extra Credit Instructions

1. Search

   - Add a way to filter the directory by name. To do this, you’ll need to adjust your API request to retrieve a user nationality that will only return data in the English alphabet.
   - Example markup for this feature is included in the HTML comments.
     **Note:** Your search feature should filters results that are already on the page. So don't request new info from the API for your search.

2. Modal toggle

   - Add a way to toggle back and forth between employees when the modal window is open.
   - There should be no errors once the end or beginning of the list is reached.
   - Example markup for this feature is included in the HTML comments.

3. Structure, style and CSS
   - Add or change at least one of the following:
     - color
     - background color
     - font
     - box or text shadows
   - Document your style changes in your readme file and the project submission notes.
   - Do not alter the layout or position of the important elements on the page.

## Browser Testing

This was tested on the following browsers:
Chrome 89, Safari 14.03 and Firefox 87.

Functionality is the same. The search input cancel button is different across browsers.

## Notes from the Build

### Added Elements

- Error handling in fetch request

  - Simple console error message enabled

- CSS Root color scheme variables added

- Simple color changes to `h1`, `body`

- Border to cards and image on hover [desktop only]

  - added on desktop only like card background color

  - transparent border and scale transform used to img to avoid affecting surrounding elements

- `modal-close-btn` styles on hover [desktop only]

- `modal-text` select color change
  - as no option to copy to clipboard or a link, users will copy paste so this interactivity has been added.

## Treehouse Frontend Techdegree Version

I completed the Treehouse Frontend Techdegree in January and this project was a part of the course. Many elements are shared but a greater emphasis was put on the building of the HTML and CSS structure.
Please take a look to see how I constructed it using the `Gulp` build tool and `Sass`:

[Treehouse Frontend Employee Directory Source Code]([https://github.com/josephclander/Treehouse_Employee_Directory](https://github.com/josephclander/JS_search_employee_directory))

You can see it deployed on Github pages:
[Employee Directory](https://josephclander.github.io/JS_search_employee_directory/)
