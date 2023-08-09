import './App.css';
import MainBody from './components/MainBody';
import TopNav from './components/TopNav/TopNav';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <TopNav />
        <MainBody />
      </div>
    </UserProvider>
  );
}

export default App;
