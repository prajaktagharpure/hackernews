import "./index.css";

document.getElementById("app").innerHTML = "Boilerplate"




//Hot reload
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
  });
}
