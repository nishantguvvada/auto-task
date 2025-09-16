import { Navbar } from './components/Navbar.jsx'

import { TaskList } from './components/TaskList.jsx' 
import { Hero } from './components/Hero.jsx'
import { ThemeProvider } from "next-themes";

function App() {


  return (
    <>
    <ThemeProvider attribute="class">
      <Navbar/>
      <Hero/>
      <TaskList/>
    </ThemeProvider>

    </>
  )
}

export default App
