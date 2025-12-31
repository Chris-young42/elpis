<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{ name }}</title>
    <link rel="stylesheet" href="/static/normalize.css" />
    <link type="image/x-icon" rel="icon" href="/static/logo.png" />
  </head>
  <body style="color: red">
    <h1>Page1</h1>
    <input type="text" id="env" value="{{ env }}" style="display: none" />
    <input
      type="text"
      id="options"
      value="{{ options }}"
      style="display: none"
    />
  </body>

  <script>
    try {
      window.env = document.getElementById("env").value;
      window.options = document.getElementById("options").value;
      window.options = JSON.parse(options);
    } catch (error) {
      console.log(e);
    }
  </script>
</html>
