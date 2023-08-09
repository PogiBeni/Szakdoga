import './css/App.css';
import MainBody from './components/MainBody/MainBody';
import TopNav from './components/TopNav/TopNav';
import { UserProvider } from './components/Context/UserContext';

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
