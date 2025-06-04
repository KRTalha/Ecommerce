//Whhat is react 
// React is a external library that helps us create websites easier.
//

//What is HTML code
//HTML code create a website


//How do we load Javascript on our websites
//1 By using the script element
//2 By saving the code in seperate file


//What is an external library 
//Externa library is a code that is outside our computer.
//Code that someone else wrote
//React is an external library 
//Its a bunch of code that is outside of our computer.
//We can load this code on our website and use it.



//Why there are two external libraries for react
// 1 is react.js and 2 is react-dom.js
//React can be used in different places for making websites
//and for making mobile apps
// 1 React = shared features
//2 ReactDOM = features to a specific websites

//So if we using react to create websites 
// we load React and ReactDOM

//And if we Using react to create mobile app:
// load react and ReactNative



// ReactDOM.createRoot() 
// Basically it Sets up React
// Why we use container in React because it keep the thing organize
// .render()
// render means to display something



// <!DOCTYPE html></> says that use the modern version of HTML
// <html> it represent a website
//<head> this section generally gets the things which are not visible in our page
// <body> the things which are visible on our page are on body element



// What is Babel?
// A babel is a javascript compiler
// It actually translate other languages into Javascript


//Why we use babel
// When using React, we dont use normal JavaScript.
//We use an enhanced version of JavaScript =JSX

// JSX = JavaScript XML
//  =Same as JavaScript, but we write HTML directly in our JavaScript code


//What is a Problem with JSX
//Our browser doesnot uunderstand JSX
// SO we need to translate JSX in JavaScript thats why we use babel


//SO what are main benefits using react 
// 1 It fee  nore natural
//2 It helps us find the error easier 
// 3 We can insert the JavaScript code into Element


//What are components 
//Component is a piece of the website
//So when building website its better to split the website int pieces.
//SO we can work on a small piece of the website at a time.

//Component must start with a capital letter.It is also called PascalCase
// PascalCase = each word start with a capital letter e.g ChatInput



//JSX is more strict than normal HTML
// All elements needs a closing tag.


//One of the main Idea of React
//We can create out own html elements


//What is Fragment
// Fragment let us group the element together , without creating any 
// extra <div>


//What is event and EventHandle
//Lets take a example of onClick ={function}
// in React this type of thing is event and eventHandler
//onClick is event and {function} this is event Handler 
//Here two things nooed to remember first is that event always use camelCase
//and the second is when using the eventHandle like this {abc} is like function 
// i cant use abc() like this this is wrong

//Event Handler runs a function when we interact with a website.


//What is State.
// State is a data that is connected to the  HTML
//WHen we will update this data we will update the HTML


// THe first value of array[0] in State give us the 
// The current data 
// The second value of array[1] 
//Give us a function that update the data.


//imp-note
//In React we should not modify the Data directly 
//We should always create a Copy and then modify the copy.


//Is it better way in React to use DOM 
//No it the not good way to use the DOM manually in React 
//bacause react is managing the website.


//What is onChange.
//onCHange is a event handler (every event starting with on is Event Handler)
//onChange runs a function when we change the text inside an <input>


//What hooks do?

//Hooks help us insert React features into our Component
//e.g Ract.useState('')


//useEffect()
// useEffect run some code after the component
//  is created or updated 


//useRef()
//useRef helps us automatically save an HTML element 
// from the component
//Ref is container with special React features 

//useContext()
//use()

// console.log('hi');

//there are 4 types of requests from the backend
//1 GET = get some data
//2 POST = create some data
//3 PUT = Update some Data
// DELETE = Delete Some data



// Testing the functions
// When we test the function we run the function e.g
//expect(formatMoney(1999)).toBe('$19.99)

//Testing a component 
// When we test the component we actually render the component :
// e.g 
// rendee(<Product />)
// render = display the component on the Page


// what render do?

// it Actually render a component in a fake web page.


// In our test , we should not contact a real beackend bacause the backend might not be available during test
// In out test might accidently update the backend (real Data) so best practise is to mode the test

// What is mock
// Mock actually create a fake version of a function

//What are test Hook
// There are some important test hooks
// 1. beforeEach
//2 . afterEach
//3 beforeAll
//4 afterAll

//Before each runs before running the test so if we save something inside the beforeEact so it will be created again
