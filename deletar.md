This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
- [Notes](#notes)
  - [Questions I would ask and my own answers/assumptions](#questions-i-would-ask-and-my-own-answers-assumptions)
  - [Highlights of my logic/code writing style](#highlights-of-my-logic-code-writing-style)
  - [What could have been done in a better way, what would I do in version 2.0](#what-could-have-been-done-in-a-better-way-what-would-i-do-in-version-2.0)
  - [Additional notes](#additional-notes)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.


## Notes

### `Questions I would ask and my own answers/assumptions`

- How would you like to view/keep track the data?
  - All beers status in the same screen

- How would you like to be notified when some beer temperature is out the correct range?
  - I would like to get the visual feedback of every beer/container status.

- Which informations would you like to view for each beer?
  - Name;
  - Current temperature;
  - Status, where it says if the temperature is right and if it's below, between or above the recommended.

- Will you use the app in your mobile/tablet device?
  - Yes.


### `Highlights of my logic/code writing style`

**App folder structure:**

**_src/_**

*app/* File where the Router is configured, so depending on where the person is currently in (Route), the corresponding component will be loaded here, and nothing else.

*core/* All the files that are responsible for configuring the app functionalities (API, Routes, Forms, Redux).

*layout/* Files that composes the main layout structure (Header and Footer).<br>
The Layout.js file is a Higher Order Component and it also contains a method that sets the page title dynamically, depending on the current route.

*pages/* All the features/pages folders, if the app has multiple pages that are part of a same feature, here it will have the folder representing this feature (e.g. News) and inside it, all its pages/folders (e.g. Blog, Post, EditPost).</br>
If there is a simple page like Home for example, where it does not belong to any feature, this page/folder goes inside the "pages/" folder as a direct children (without any feature folder as direct parent).

*shared/* All the files that are imported/used for more than one component (or has the potential to be).

*styles/* The scss files serated in 2 folders:<br>
Helpers (variables, mixins, placeholders and functions).<br>
Layout (elements, general).<br>
These files are imported by the mais scss file (index.scss)<br>

**Components writing style:**

- The pages files are always statefull components (Class) while its children are stateless components (const or let), this way all the HTTP requests and lifecycle hooks corresponding to that page and its components, are managed by one file (the page file).

- The page file has the option to use or not the main layout structure, to use it, just import the Layout component and wrap its content with the Layout component tag.

- All the components have a "data-component" attribute, it is used as a namespace/indentifier for its styles.

### `What could have been done in a better way, what would I do in version 2.0`

- A block that displays a general status of all beers/containers, telling the total number in which every beer/container are currently in.

- A modal or page with all the beer data details, where the user may go when clicking in the beer card.

- The including of a library responsible for dysplaying a graphic for each beer card.

- The including of some buttons to play/pause the beers monitoring.

- An authentication step, so before viewing the data, the user must first register/sign in to access it.

### `Additional notes`

- Some css class names are the same used in Bootstrap (e.g. d-block, d-flex), because everytime I see a patter that I like, I adopt it in my writting style, and as a bonus, if some day the app grows where there is a need to implement the Bootstrap framework, it's css classes are already there giving the specific style that I need.
