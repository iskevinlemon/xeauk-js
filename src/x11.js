/**
Xeauk JS | Enhanced JavaScript Templating
Created by: Kevin (https://github.com/iskevinlemon)
Version: 1.1 - January 2024

MIT License - Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Xeauk is is adapted from SuperHTML project which has sunset.

console.log("X11.js");
(function ($SuperHTML) {
  var superHTMLController;

  $SuperHTML.Xeauk = {
    // @param {string} controllerName - controller name
    controller: function (controllerName) {
      superHTMLController = document.querySelector(
        `[xController="${controllerName}"]`
      );
    },

    // @param {object} options - data to bind
    compile: function (options, templatingSyntax) {
      // Ensure the document body exists
      if (!document.body) {
        console.error("Error: Document body not found.");
        return;
      }

      // Get the data from options or set default data as empty object
      // TODO: data defined in compile can't seems to work
      var data = options || {};

      // Generate a unique data attribute to identify the template
      const dataSuperHtmlTag = `_data-x-bind_`;

      // Get the content of the body element
      var bodyContent;

      // This will be run if controller is incorrectly defined or not defined
      if (superHTMLController == undefined) {
        console.error("Error: Xeauk controller is not defined");
      }

      // New - user defined tempalating
      var xSyntax = templatingSyntax.option;
      var xExpression = /\@\{([^}]+)\}/g; // Default referencing by @{variable}

      // referencing by {{variable}}
      if (xSyntax == "{{}}"){
        xExpression = /\{\{([^}]+)\}\}/g;
      }

      // referencing by ${variable}
      if (xSyntax == "${}"){
        xExpression = /\$\{([^}]+)\}/g;
      }

      /**
       * Only run the templating and js scripts if controller is
       * correctly defined
       * */
      if (superHTMLController != undefined) {
        bodyContent = superHTMLController.innerHTML;

        // Clear the existing body content
        document.body.innerHTML = "";

        // Replace data placeholders and evaluate JavaScript expressions in the template
        const compiledHTML = bodyContent.replace(
            xExpression, 
          (match, expression) => {
            try {
              if (data.hasOwnProperty(expression)) {
                return data[expression];
              }
              const evaluatedExpression = new Function(
                `return ${expression}`
              )();
              return evaluatedExpression !== undefined
                ? evaluatedExpression
                : "";
            } catch (error) {
              console.error(`Error evaluating expression: ${error.message}`);
              return "";
            }
          }
        );

        // Temporary element to parse and execute embedded scripts
        const tempElement = document.createElement("div");
        tempElement.innerHTML = compiledHTML;
        tempElement.setAttribute(dataSuperHtmlTag, "");

        // Execute embedded script tags
        const scriptTags = tempElement.querySelectorAll("script");
        scriptTags.forEach((script) => {
          const scriptElement = document.createElement("script");
          scriptElement.textContent = script.textContent; // Use textContent to preserve the script content
          document.head.appendChild(scriptElement);
        });

        // Append the final compiled HTML with data, evaluated expressions, and executed scripts to the body
        document.body.appendChild(tempElement);
      }
    },
  };
})(window);
