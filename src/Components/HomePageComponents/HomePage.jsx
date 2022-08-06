import './style.css'

import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Facts from './Facts'
import Reviews from './Reviews'
import Footer from '../Footer/Footer'

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Facts />
      <Reviews />
      <Footer />
    </div>
  )
}

export default HomePage
