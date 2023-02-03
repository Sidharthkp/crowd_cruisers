import { signOut } from "@firebase/auth";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BookmarkIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { setNotAuthenticated } from "../../../redux/Authentication/reducer";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authenticated = useSelector((state: any) => state.authentication.authenticated);

    const community = (e: any) => {
        e.preventDefault()
        navigate('/community');
    }
    const maps = (e: any) => {
        e.preventDefault()
        navigate('/map');
    }
    const login = (e: any) => {
        e.preventDefault()
        navigate('/login');
    }
    const signup = (e: any) => {
        e.preventDefault()
        navigate('/signup');
    }
    const wishlist = (e: any) => {
        e.preventDefault()
        navigate('/wishlist')
    }
    const profile = (e: any) => {
        e.preventDefault()
        navigate('/profile')
    }

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            dispatch(setNotAuthenticated())
            navigate("/");
        })
    }

    const home = (e: any) => {
        e.preventDefault()
        navigate('/');
    }

    const navigation = [
        { name: 'Home', onclick: home, current: true },
        { name: 'Map', onclick: maps, current: false },
        { name: 'Community', onclick: community, current: false },
        { name: 'Rides', current: false },
        { name: 'Events', current: false },
        { name: 'Apparel Store', current: false },
    ]

    const classNames = (...classes: any) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-8 2xl:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src="src\assets\Logo\logo.jpg"
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src="src\assets\Logo\logo.jpg"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={item.onclick}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                onClick={wishlist}
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View saved items</span>
                                    <BookmarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            {authenticated ? <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://avatars.githubusercontent.com/u/54587044?v=4"
                                                alt=""
                                            /> : <FaUserCircle className="text-2xl" />}
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        {authenticated ?
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={profile}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 cursor-pointer text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            onClick={logout}
                                                            className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items> :
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                        onClick={login}
                                                            className={classNames(active ? 'bg-gray-100 cursor-pointer w-full' : '', 'block px-4 py-2 w-full text-sm text-gray-700')}
                                                        >
                                                            Sign In
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={signup}
                                                            className={classNames(active ? 'bg-gray-100 cursor-pointer w-full' : '', 'block px-4 py-2 text-sm w-full text-gray-700')}
                                                        >
                                                            Sign Up
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        }
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    onClick={item.onclick}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}


export default NavBar;