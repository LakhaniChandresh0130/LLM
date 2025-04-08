
import './App.css';
import axios from "axios";
import { useState} from "react";

function App() {

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlesubmit =(e)=>{
    e.preventDefault();

    axios
    .post("http://localhost:8080/chat",{prompt})
    .then((res) => {setResponse(res.data)})
    .catch((err) => {console.error(err)});
  };

  return (
    <>
        <div className ="w-[720px]  py-24 items-center mx-10px">
          <h1>ChatGPT Clone</h1>
          <form className='w-full text-center' onSubmit={handlesubmit}>
          <input type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Enter your prompt here"/>
          <button type="submit" >Generate Response</button>
          </form>
          <div className="w-full items-center mt-4">
            <div>{response}</div>
  <div id="data-container"></div>
          </div>
          
        </div>
    </>
  );
}

export default App;
