const inquirer = require("inquirer");
const Triangle = require("./lib/triangle");
const Circle = require("./lib/circle");
const Square = require("./lib/square");
const SVGGenerator = require("./svgGenerator");

inquirer
  .prompt([
    {
      type: "input",
      name: "text",
      message: "What text should go inside of the SVG (at most 3 characters)?",
      validate: function (answer) {
        if (answer.length > 3) {
          return false;
        }
        return true;
      },
    },
    {
      type: "input",
      name: "textColor",
      message:
        "What color should the text be (must be a valid color or a hexadecimal)?",
    },
    {
      type: "list",
      name: "shape",
      message: "What shape should the logo be?",
      choices: ["circle", "triangle", "square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "What color should the svg be?",
    },
  ])
  .then(answers => {
    let shape;
    switch (answers.shape) {
      case "circle":
        shape = new Circle();
        break;
      case "triangle":
        shape = new Triangle();
        break;
      case "square":
        shape = new Square();
        break;
      default:
        console.error("Invalid shape selection");
        return;
    }
    shape.setColor(answers.shapeColor);
    const svgGenerator = new SVGGenerator(answers);
    svgGenerator.generateSVG();
  })
  .catch(error => {
    console.error("Error occurred:", error);
  });
