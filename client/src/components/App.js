import '../css/App.css';
import MainBody from './MainBody/MainBody';
import TopNav from './TopNav/TopNav';
import { UserProvider } from './Context/UserContext';
import { LabelProvider } from './Context/LabelContext';

function App() {
  return (
    <UserProvider>
      <LabelProvider>
      <div className="App bg-body">
        <TopNav />
        <MainBody />
      </div>
      </LabelProvider>
    </UserProvider>
  );
}

export default App;
