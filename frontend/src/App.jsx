import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'




function App() {


  return (
    <>


      <Navbar />
  
      <div className='min-h-[87.4vh] md:min-h-[85.6vh] bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]'>

        <Manager />
        
      </div>
      <Footer />


    </>
  )
}

export default App
