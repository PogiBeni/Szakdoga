import '../css/App.css';
import MainBody from './MainBody/MainBody';
import TopNav from './TopNav/TopNav';
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App bg-body">
        <TopNav />
        <MainBody />
      </div>
    </UserProvider>
  );
}

export default App;
