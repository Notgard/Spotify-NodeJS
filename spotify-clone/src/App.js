import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from "./Login"
import Dashboard from "./Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    code ? <Dashboard code={code} /> : <Login></Login>
  );
}

export default App;
