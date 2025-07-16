import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export default function Header() {
  const [toggleOn, setToggleOn] = useState<boolean>(false);

  useEffect(()=>{

    const handleScroll =()=>{
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('py-8');
        } else {
          header.classList.remove('py-8');
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  },[])

  return(
    <header
      id="header"
      className="bg-white fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300"
    >
    <div
      id="container"
      className="mx-auto flex items-end justify-between p-6 transition-all duration-300"
    >
      <a href="/" className="max-w-[150px] md:max-w-[250px]">
        <img src={logo.src} alt="Logo" className="md:h-auto md:w-auto max-h-16" />
      </a>

      <div
        className={`md:hidden cursor-pointer flex flex-col ${toggleOn ? 'hamburger': ''}`}
        onClick={() => {;
          setToggleOn(!toggleOn)}}
      >
        <span className="h-[2px] bg-[#c3a76c] w-[24px] line-top"></span>
        <span className="h-[2px] bg-[#c3a76c] w-[16px] my-[5px] self-end line-middle"></span>
        <span className="h-[2px] bg-[#c3a76c] w-[24px] line-bottom"></span>
      </div>
      <nav
      id="menu"
      className={`${toggleOn?'animate-slide-down': 'hidden'} md:flex flex-col md:flex-row md:items-center bg-white md:bg-transparent absolute md:static top-full left-0 w-full md:w-auto shadow-md md:shadow-none transition-all duration-300 overflow-hidden`}
    >
      <ul
        className="flex flex-col md:flex-row text-lg p-4 md:p-0"
      >
        <li className="group cursor-pointer text-secondary text-center py-8 md:py-0 hover:text-primary md:mr-[40px]">
          <a
            href="https://liff.line.me/1661148667-2dKY7gPB?cname=hgLZx5Zmb7gj2DZE6US4hD&origin=other"
            target="_blank"
            className="group-hover:hidden block"
          >
            預約體驗
          </a>
          <a
            href="https://liff.line.me/1661148667-2dKY7gPB?cname=hgLZx5Zmb7gj2DZE6US4hD&origin=other"
            target="_blank"
            className="hidden group-hover:inline"
          >
            RESERVATION
          </a>
        </li>
        <li className="group cursor-pointer text-secondary text-center py-8 md:py-0">
          <a href="#service" className="group-hover:hidden block"> 服務項目 </a>
          <a href="#service" className="hidden group-hover:inline"> SERVICES </a>
        </li>
      </ul>
      </nav>
      </div>
    </header>
  )
}
