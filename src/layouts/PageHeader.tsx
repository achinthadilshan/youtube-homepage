import { Bell, Menu, Upload, User } from 'lucide-react'
import logo from '../assets/logo.svg'
import Button from '../components/Button'

const PageHeader = () => {
  return <div className="flex justify-between gap-10 pt-2 mx-4 mb-6 lg:gap-20">
    <div className="flex items-center flex-shrink-0 gap-4">
      <Button variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} alt="Logo" className='h-6' />
      </a>
    </div>
    <div></div>
    <div className='flex flex-shrink-0 md:gap-2'>
      <Button variant="ghost" size="icon">
        <Upload />
      </Button>
      <Button variant="ghost" size="icon">
        <Bell />
      </Button>
      <Button variant="ghost" size="icon">
        <User />
      </Button>
    </div>
  </div>
}

export default PageHeader
