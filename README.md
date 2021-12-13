## App Name: 

### Elevator pitch:
 

### ChangeList: 
- implemented googlecloud and firebase to handle userauth and database storage. 
- implemented menu items details screen. 
- reorganized menu screen. 
- reorganized home screen
- added restaurant image with animated phase in effect on home screen. 
- adjusted app logic and moved submit button to the cart screen. 

### Developer notes: 
- The general idea is to whitelabel the app to different restaurants so that 
  - each of them can load in different menu items and restaurant images
  - and item prices are dynamically fetched from DB 
  - so the unimplemented idea is to provide restaurant owners with an admin-app for them to manage orders, adjust item prices based on daily raw material cost, 
  - also since payment vendors like square and paypal are costly to implement, in app payment functionalities are not implemented for now, but ideally it should have one implemented if it were to be released to production
- In terms of servers and database, the current plan is to be a serverless app and relies on firebase to handle server & DB functions. 
- menu images are not dynamically loaded from DB because concurrently loading dozens of remote images can take a while. So images are stored locally in the assets folder. 

### Grading Rubrics

list: 
  - [x] JSX the app has a TextInput component and a button and Views with vertical and horizontal layout
    - textinput can be found in the cart page, and buttons and vertical & horizontal layouts can be found on various pages. 
  - [x] Stylesheets the app uses style to set font sizes, and colors.
    - stylesheets are stored in styles/globalStyle.js
  - [x] Multiscreen App The app has at least 4 different screens
    - The app has three main screens, and mutiple item details screen for each individual menu items, and three tab screens for different item types. 
  - [x] useState and event handling the app has components which maintain state that the user can change by interacting with the component
    - useState and event handling can be found pretty much in all screens. 
  - [x] useEffect/Asynchronous events and C7 Local Persistence the app uses Asynchronous Storage to maintain local state
    - storage persistence is realized via localStorage 
    - local storage data shape is handled by immutable.js
    - when user first logged in via google, the app fetches user ordered item list & all prices for all items from db hosted on firebase. 
    - when user clicks on submit on the cart screen, data is synced with firebase DB. 
  - [x] Git/Github/Scrum the app has been pushed to github
  - [x] The app uses FlatLists or SectionLists
    - used in menu and cart screen
  - [x] The app uses Context for global variables
    - used context for user data shape localstorage, and provided it in App.js when app loads. 
  - [x] The app uses some components not yet covered in the class
    - used native components like Animated, and custom components like react-native-really-awesome-button
  - [x] The movie shows the app running through the terminal with expo start
  - [x] The movies shows the App running on a phone!
  
