import '../css/App.css';
import MainBody from './MainBody/MainBody';
import TopNav from './TopNav/TopNav';
import { LabelProvider } from './Context/LabelContext';
import { loadData } from '../apiCalls/ApiCalls';
import { UserContext } from './Context/UserContext';
import { useState, useContext } from 'react';
import Cookies from "js-cookie"

function App() {
  const [user, setUser] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const userData = Cookies.get('userData');
  if (!user.loggedIn && userData) {
    loadData(userData).then((data) => {
      setUser(data)
      setIsLoading(false)
    })
  }

  return (
    <LabelProvider>
      <div className="App bg-body">
        <TopNav />
        {isLoading ?
          <div class="text-center isLoading">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          : <MainBody />}
      </div>
    </LabelProvider>
  );
}

export default App;
