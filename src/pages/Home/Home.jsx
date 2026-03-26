import NavigationBar from '../../components/Navigation/NavigationBar'
import Hero from '../../components/HomeSections/Hero'
import Services from '../../components/HomeSections/Services'
import AboutUs from '../../components/HomeSections/AboutUs'
import '../../components/HomeSections/Home.css'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <AboutUs />
      <Services />

      {/* BecomeProvider */}
      <div className='Provider-heading mt-5'>
        <h1 className='text-center'>BECOME A <span>PROVIDER</span></h1>
      </div>
      <div className='mt-5 mb-5 p-5 mx-10 provider-container container' >
        <h3 className='text-center'>Join Our Network</h3>
        <p className='text-center'>Become a DIGIseva provider and unlock a world of opportunities! Partner with us to offer a wide range of digital and financial services to your customers, earn competitive commissions, and grow your business with our robust support system. With DIGIseva, you get access to advanced technology, training, and 24/7 assistance to ensure your success.</p>
        <Link to="/signup" className='btn cta'>Sign Up</Link>
      </div>
        <Footer />
    </>
  )
}

export default Home