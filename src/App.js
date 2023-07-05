import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App() {

  window.onmousemove = function (e) {

    const body = document.body;

    let x = e.clientX;
    let y = e.clientY;

    body.style.backgroundPositionX = x / 10 + "px"
    body.style.backgroundPositionY = y / 10 + "px"
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;