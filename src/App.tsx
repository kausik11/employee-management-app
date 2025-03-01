import './App.css'
import Routing from './Routing/Routing'
import { useEffect } from 'react'


function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());


    document.addEventListener("keydown", (event) => {
      if (event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
        (event.ctrlKey && event.key === "U")) {

        event.preventDefault();
      }
    })

    return () => {
      document.removeEventListener("contextmenu", (event) => event.preventDefault());
      document.removeEventListener("keydown", (event) => event.preventDefault());
    }
  }, [])


  return (
    <>
      <Routing />
    </>
  )
}

export default App
