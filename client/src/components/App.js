import '../css/App.css';
import MainBody from './MainBody/MainBody';
import TopNav from './TopNav/TopNavParts/TopNav';
import { UserProvider } from './Context/UserContext';

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
