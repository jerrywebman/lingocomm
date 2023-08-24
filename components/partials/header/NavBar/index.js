
"use client"
import { useContext } from "react"
import { FaArrowRight, FaUserAlt, FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
// IMAGES
import logo from "/public/images/logocolor.jpg";
import es from "/public/images/flags/es.svg";
import PT from "/public/images/flags/PT.svg";
import US from "/public/images/flags/US.svg";
import { Navbar, Dropdown } from "flowbite-react";
import { UserContext } from "@/context/user.context";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from 'next-intl';



export default function Index() {
  const router = useRouter();
  const { user } = useContext(UserContext)
  //translation
  const t = useTranslations('Menu');

  const logout = () => {
    localStorage.removeItem("lingoUser");
    window.location.href = "/";
  }

  const languages = [
    {
      id: 1,
      code: "en",
      lname: "English",
      country_code: "gb",
      image: US
    },
    {
      id: 2,
      code: "es",
      lname: "Spanish",
      country_code: "es",
      image: es
    },
    {
      id: 3,
      code: "pt",
      lname: "Portuguese",
      country_code: "pt",
      image: PT
    }
  ];

  return (
    <nav className="sticky top-0 shadow-md z-50 leading-relaxed tracking-wide md:px-8 px-4">
      <Navbar
        fluid
        rounded
      >

        <Navbar.Brand href="/" >
          <Image src={logo} alt="Lingo Comms" width={50} height={50} />
        </Navbar.Brand>

        <div className="flex md:order-2">
          <div className="mt-4 mx-8">
            <div className="flex md:order-2 pl-3 md:pl-0 text-base font-bold hover:text-primary-blue hover:text-xl">
              <LocaleSwitcher />
            </div>
          </div>
          {user === null ? <Link href={"/customer/sign-in"} className="my-4">
            <button
              type="submit"
              className={`hidden md:inline-flex px-4 py-2 rounded-lg bg-secondary-purple text-md md:text-base font-medium text-white w-full hover:shadow-lg hover:bg-primary-purple hover:text-black`}
            >
              {t('login')}
              <FaArrowRight className="inline text-base md:text-lg hover:visible my-1 mx-2" />
            </button>
            <FaUserPlus className="mx-2 inline-flex md:hidden text-secondary-purple " />

          </Link>
            :
            <>
              <Dropdown
                inline
                hover={true}
                label={<FaUserAlt className="my-4 text-secondary-purple" />}
              >
                <Dropdown.Header>
                  <span className="block text-sm font-bold">
                    {user?.firstname + " " + user?.lastname}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>
                <Link href={"/customer/my-profile"} >
                  <Dropdown.Item className="hover:bg-secondary-purple hover:text-white">
                    {t('profile')}
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logout()} className="text-primary-red font-bold hover:bg-primary-red hover:text-white">
                  {t('Signout')}
                </Dropdown.Item>
              </Dropdown>
            </>
          }
          <Navbar.Toggle className="mx-2" />
        </div>
        <Navbar.Collapse>
          <Link
            // active
            href="/"
            className="my-2"
          >
            <span className="pl-3 md:pl-0 text-base font-bold hover:text-primary-blue hover:text-xl"> {t('home')}</span>
          </Link>
          <Link
            href="/services"
            className="my-2"
          >
            <span className="pl-3 md:pl-0 text-base font-bold hover:text-primary-blue hover:text-xl"> {t('services')}</span>
          </Link>
          <div className="flex my-2">
            <div className="flex md:order-2 pl-3 md:pl-0 text-base font-bold hover:text-primary-blue hover:text-xl">
              <Dropdown
                inline
                label={t('career')}
              >
                <Link href="/jobs" >
                  <Dropdown.Item>
                    <span className="text-sm font-bold hover:text-primary-blue hover:text-lg"> {t('jobs')}</span>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link href="/apply" >
                  <Dropdown.Item>
                    <span className="text-sm font-bold hover:text-primary-blue hover:text-lg"> {t('application')}</span>
                  </Dropdown.Item>
                </Link>
              </Dropdown>
            </div>
          </div>
          <div className="flex my-2">
            <div className="flex md:order-2 pl-3 md:pl-0  text-base font-bold hover:text-primary-blue hover:text-xl">
              <Dropdown
                inline
                label={t('about')}
              >
                <Dropdown.Item>
                  <Link href="/about-us"><span className="text-sm font-bold hover:text-primary-blue hover:text-lg"> {t('aboutLingo')}</span></Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link href="/faq" ><span className="text-sm font-bold hover:text-primary-blue hover:text-lg">FAQ</span></Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link href="/security" ><span className="text-sm font-bold hover:text-primary-blue hover:text-lg"> {t('security')}</span></Link>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <Link href="/contact" className="my-2">
            <span className="pl-3 md:pl-0 text-base font-bold hover:text-primary-blue hover:text-xl"> {t('contactUs')}</span>
          </Link>

        </Navbar.Collapse>
      </Navbar>
    </nav >

  )
}

