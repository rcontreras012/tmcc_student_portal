import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import { Routes, Route, Link, BrowserRouter, Switch, NavLink } from "react-router-dom";
import { AuthPage } from './Pages/Auth';
import { StudentPage } from './Pages/StudentPage';
import ProtectedRoute from './Pages/Security';

function App() {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <div>
          <Routes>

            <Route path='/' element={<AuthPage />}>




            </Route>

            <Route path='/home'
              element={
                <ProtectedRoute>
                  <StudentPage />
                </ProtectedRoute>
              }>

            </Route>
          </Routes>


        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
