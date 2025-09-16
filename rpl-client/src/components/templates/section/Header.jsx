import Navbar from '@/components/moleculs/Navbar'
import HeroSection from './HeroSection'
import SectionKerjaSama from './SectionKerjaSama'


const Header = () => {
  return (
    <header className='bg-slate-50'>
        <Navbar/>
        <HeroSection/>
        <SectionKerjaSama/>
    </header>
  )
}

export default Header