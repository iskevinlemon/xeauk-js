# Xeauk JS
Enhanced JavaScript Templating
<br/>

# Installation via CDN
**CDN installation is recommended**
```html
<script src="https://cdn.jsdelivr.net/gh/iskevinlemon/xeauk-js/src/xeauk.js"></script>
```

# Setting up
**How to correctly setup Xeauk JS** <br/>
View the docs <a href="" target="_blank">here</a>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xeauk JS Demo</title>
    <!-- STEP 1: Include the script in the head tag -->
    <script src="https://cdn.jsdelivr.net/gh/iskevinlemon/xeauk-js/src/xeauk.js"></script>
</head>
<!-- 
    STEP 2: Attach a xController in the body and provide a name .
    For this demo, the name is "myController"
-->
<body xController="myController">

    <!-- 
        STEP 6: bind the data by using @{variable} 
        variable is the "text" defined in STEP 5
    -->
    <h1>@{text}</h1>

    <script>
    // STEP 3: create an instance of Xeauk
    // For this demo, the instance is "x"
    var x = Xeauk;

    // STEP 4: Define the controller from the .controller()
    // and pass in "myController"
    x.controller("myController");

    // Step 5: Define a dummy data
    var text = "Hello World from Xeauk JS";

    // Step 7: Compile the instance
    // ONLY COMPILE at the end of all the JavaScript
    // Else it will not work.
    x.compile();
    </script>

</body>
</html>
```