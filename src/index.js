import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './css/index.css'
import { App } from './js/app'
import configureStore from './js/store/index'

// document.getElementById("app").innerHTML = "Boilerplate"
const store = configureStore({})
App.init(store)

// Hot reload
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(function () {
  })
}
