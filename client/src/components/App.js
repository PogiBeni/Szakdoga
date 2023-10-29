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


  if (isLoading) {
    const userData = Cookies.get('userData');
    if (!user.loggedIn && userData) {
      loadData(userData).then((data) => {
        setUser(data)
        setIsLoading(false)
      })
    }
    else setIsLoading(false)
  }


  return (
    <LabelProvider>
      <div className="App bg-body">
        <TopNav />
        {isLoading ?
          <div className="text-center isLoading">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          : <MainBody />}
      </div>
    </LabelProvider>
  );
}

export default App;
