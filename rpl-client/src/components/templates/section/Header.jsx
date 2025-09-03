import Navbar from '../../moleculs/Navbar'
import HeroSection from './HeroSection'
import SectionKerjaSama from './SectionKerjaSama'

const Header = () => {
  return (
    <header className='bg-[var(--indigo-dark)] text-white'>
        <Navbar/>
        <HeroSection/>
        <SectionKerjaSama/>
    </header>
  )
}

export default Header