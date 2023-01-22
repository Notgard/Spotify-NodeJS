import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Login from "./Login"
import Dashboard from "./Dashboard"
import { ReactSession } from 'react-client-session';
import ReactDOM from "react-dom";

console.log(sessionStorage);
ReactSession.setStoreType("sessionStorage");
const code = new URLSearchParams(window.location.search).get("code")
ReactSession.set("code", code);
console.log(ReactSession.get("code"));
function App() {
  return (
    ReactSession.get("code") ? <Dashboard code={code} /> : <Login></Login>
  );
}

export default App;
