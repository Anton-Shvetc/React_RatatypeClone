import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {PrintPanel} from './components/PrintPanel'

function App() {

  return (
    <div className="App">
      <PrintPanel />
    </div>
  );
}

export default App;
