/////////////
/* GLOBALS */

const PAGE_HEADING = 'Calculator';
const MULTIPLIER = 2; // Scale of graphical representation of rectangle

// Default values for width and height
let TARGET_WIDTH = 200;
let TARGET_HEIGHT = 100;

// Element to insert HTML inside
const CONTAINER = document.getElementsByTagName('BODY')[0];
// HTML code to insert
const HTML_TEMPLATE = `
    <h1>${PAGE_HEADING}</h1>
    <p>For rectangles</p>
    <div class='input-container'>
        <div>
            <h5>Width:</h5>
            <input id='width' type='number' value='${TARGET_WIDTH}'>
        </div>
        <div>
            <h5>Height:</h5>
            <input id='height' type='number' value='${TARGET_HEIGHT}'>
        </div>
    </div>
`;

//////////////////////
/* HELPERS FUNCTIONS*/

// Appends new html to self
HTMLElement.prototype.appendHTML = function(html) {
    this.insertAdjacentHTML('beforeend', html);
}

///////////////
/* MAIN CODE */

// Decode and log ASCII art to console. Encoding was necessary, as some characters in the string were escape characters
const ASCII = '%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%2C---._%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20.--%20-.%27%20%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20___%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%7C%20%20%20%20%7C%20%20%20%3A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C--.%27%7C_%20%20%20%20%20%20%20%20%20%20%20%20%20%20%2C--%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%3A%20%20%20%20%3B%20%20%20%7C%20%20%20%2C---.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%20%7C%20%3A%2C%27%20%20%20%20%20%20%20%20%20%20%20%2C--.%27%7C%20%20%20%20%20%20%20%20%20%2C---%2C%20%20%0A%20%20%20%20%20%20%20%3A%20%20%20%20%20%20%20%20%7C%20%20%27%20%20%20%2C%27%5C%20%20%20.--.--.%20%20%20%3A%20%20%3A%20%27%20%3A%20%20%20%20%20%20%20%20%20%20%20%7C%20%20%7C%2C%20%20%20%20%20%20%2C-%2B-.%20%2F%20%20%7C%20%0A%20%20%20%20%20%20%20%7C%20%20%20%20%3A%20%20%20%3A%20%2F%20%20%20%2F%20%20%20%7C%20%2F%20%20%2F%20%20%20%20%27.%3B__%2C%27%20%20%2F%20%20%20%20%20%2C---.%20%20%60--%27_%20%20%20%20%20%2C--.%27%7C%27%20%20%20%7C%20%0A%20%20%20%20%20%20%20%3A%20%20%20%20%20%20%20%20%20.%20%20%20%3B%20%2C.%20%3A%7C%20%20%3A%20%20%2F%60.%2F%7C%20%20%7C%20%20%20%7C%20%20%20%20%20%2F%20%20%20%20%20%5C%20%2C%27%20%2C%27%7C%20%20%20%7C%20%20%20%7C%20%20%2C%22%27%20%7C%20%0A%20%20%20%20%20%20%20%7C%20%20%20%20%3B%20%20%20%7C%27%20%20%20%7C%20%7C%3A%20%3A%7C%20%20%3A%20%20%3B_%20%20%3A__%2C%27%7C%20%3A%20%20%20%20%2F%20%20%20%20%2F%20%20%7C%27%20%20%7C%20%7C%20%20%20%7C%20%20%20%7C%20%2F%20%20%7C%20%7C%20%0A%20%20%20___%20l%20%20%20%20%20%20%20%20%20%27%20%20%20%7C%20.%3B%20%3A%20%5C%20%20%5C%20%20%20%20%60.%20%27%20%20%3A%20%7C__%20.%20%20%20%20%27%20%2F%20%7C%7C%20%20%7C%20%3A%20%20%20%7C%20%20%20%7C%20%7C%20%20%7C%20%7C%20%0A%20%2F%20%20%20%20%2F%5C%20%20%20%20J%20%20%20%3A%7C%20%20%20%3A%20%20%20%20%7C%20%20%60----.%20%20%20%5C%7C%20%20%7C%20%27.%27%7C%27%20%20%20%3B%20%20%20%2F%7C%27%20%20%3A%20%7C__%20%7C%20%20%20%7C%20%7C%20%20%7C%2F%20%20%0A%2F%20%20..%2F%20%20%60..-%20%20%20%20%2C%20%5C%20%20%20%5C%20%20%2F%20%20%2F%20%20%2F%60--%27%20%20%2F%3B%20%20%3A%20%20%20%20%3B%27%20%20%20%7C%20%20%2F%20%7C%7C%20%20%7C%20%27.%27%7C%7C%20%20%20%7C%20%7C--%27%20%20%20%0A%5C%20%20%20%20%5C%20%20%20%20%20%20%20%20%20%3B%20%20%20%60----%27%20%20%27--%27.%20%20%20%20%20%2F%20%7C%20%20%2C%20%20%20%2F%20%7C%20%20%20%3A%20%20%20%20%7C%3B%20%20%3A%20%20%20%20%3B%7C%20%20%20%7C%2F%20%20%20%20%20%20%20%0A%20%5C%20%20%20%20%5C%20%20%20%20%20%20%2C%27%20%20%20%20%20%20%20%20%20%20%20%20%20%20%60--%27---%27%20%20%20---%60-%27%20%20%20%5C%20%20%20%5C%20%20%2F%20%7C%20%20%2C%20%20%20%2F%20%27---%27%20%20%20%20%20%20%20%20%0A%20%20%22---....--%27%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%60----%27%20%20%20---%60-%27%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20';
console.log(decodeURIComponent(ASCII));

// Load Calculator
CONTAINER.appendHTML(HTML_TEMPLATE);
initGraphicsUpdaters();

///////////////
/* FUNCTIONS */

// Initializes value updaters for graphics rendering
function initGraphicsUpdaters() {
    const widthElement = $('#width');
    const heightElement = $('#height');    

    initEventHandlers(widthElement, heightElement);
}

// Creates event handlers that updates rectangle width and height
function initEventHandlers(widthElement, heightElement) {
    // Creates event handler for widthElement
    widthElement.on('keyup change click', () => {
        const widthValue = Number(widthElement.val());
        updateWidth(widthValue);
    });

    // Creates event handler for heightElement
    heightElement.on('keyup change click', () => {
        const heightValue = Number(heightElement.val());
        updateHeight(heightValue)
    });
}

// Updates rectangle width
function updateWidth(newValue) {
    TARGET_WIDTH = newValue;
}

// Updates rectangle height
function updateHeight(newValue) {
    TARGET_HEIGHT = newValue;

    // Resize canvas height in relation to new height
    const newHeight = calcNewHeight();
    resizeCanvas(width, newHeight);
}

// Setup function for graphics rendering, called by p5.js on load
function setup() {
    // Create the canvas
    const maxWidth = calcMaxWidth();
    const newHeight = calcNewHeight();
    createCanvas(maxWidth, newHeight);

    // Set text characteristics
    //textFont(font);
    textAlign(CENTER, CENTER);

    // Rectangle setup
    fill(color('#000000'));
    noStroke();
    rectMode(CENTER);
}

// Updates rectangle and text. Called every frame by p5.js
function draw() {
    const newWidth = calcNewWidth();
    const newHeight = calcNewHeight();
    const white = color('#FFFFFF');
    const dark = color('#202124');

    // Scale text based on size of rectangle
    if(newHeight < 75 || newWidth < 144)
        textSize(20);
    else
        textSize(40);
    
    // Reset canvas
    background(white);

    // Draw rectangle in center
    translate(width/2, height/2);
    fill(dark);
    rect(0, 0, newWidth, newHeight);

    // Draw text in center of rectangle
    fill(white);
    text('P: ' + calcPerimeter(), 0, -20);
    text('A: ' + calcArea(), 0, 20);
}

// Resize canvas when window is resized
function windowResized() {
    const maxWidth = calcMaxWidth();
    resizeCanvas(maxWidth, height);
}

// Anonymous utility functions
const calcMaxWidth = () => windowWidth - (windowWidth - CONTAINER.offsetWidth); // window width - container margin
const calcNewWidth = () => TARGET_WIDTH * MULTIPLIER;
const calcNewHeight = () => TARGET_HEIGHT * MULTIPLIER;
const calcPerimeter = () => (TARGET_WIDTH + TARGET_HEIGHT) * 2;
const calcArea = () => TARGET_WIDTH * TARGET_HEIGHT;