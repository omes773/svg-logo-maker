const inquirer = require("inquirer");

const fs = require("fs");


const { Triangle, Square, Circle } = require("./lib/shapes");


function writeToFile(fileName, responses) {
 
  let svgString = "";
  
  svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
 
  svgString += "<g>";
  
  svgString += `${responses.shape}`;

 
  let shapeChoice;
  if (responses.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${responses.shapeBackgroundColor}"/>`;
  } else if (responses.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${responses.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${responses.shapeBackgroundColor}"/>`;
  }

 
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${responses.textColor}">${responses.text}</text>`;
  
  svgString += "</g>";
 
  svgString += "</svg>";

  
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}


function promptUser() {
  inquirer
    .prompt([
    
      {
        type: "input",
        message: "What letters would you like your logo to display? (Enter up to three characters)",
        name: "text",
      },
    
      {
        type: "input",
        message: "Choose a color for the text (Enter color keyword OR a hexadecimal number)",
        name: "textColor",
      },
     
      {
        type: "list",
        message: "What shape would you like the logo to use?",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      
      {
        type: "input",
        message: "Choose shape color (Enter color keyword OR a hexadecimal number)",
        name: "shapeBackgroundColor",
      },
    ])
    .then((responses) => {
      
      if (responses.text.length > 3) {
        console.log("Please enter a value of 3 characters or less");
        promptUser();
      } else {
        
        writeToFile("logo.svg", responses);
      }
    });
}


promptUser();