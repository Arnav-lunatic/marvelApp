import React, {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { switchTheme } from '../features/themeSlice'
import marvelIcon from '/src/assets/marvel.png'
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Nav: React.FC = () =>  {
    const dispatch = useAppDispatch()
    const isLightMode = useAppSelector((state) => state.theme.lightMode)

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.style.setProperty('--bg-color', '#fffafa')
            document.documentElement.style.setProperty('--text-color', 'black')
        } else {
            document.documentElement.style.setProperty('--bg-color', '#262626')
            document.documentElement.style.setProperty('--text-color', 'white')
        }
    }, [isLightMode])
    
    
    return (
        <div className='absolute top-0 right-0 left-0 w-full my-2 px-2 flex justify-between bg-black bg-opacity-20 backdrop-blur-lg rounded-lg z-50'>
            <img className='w-20' src={marvelIcon} alt="" />
            <button
                className='w-20'
                onClick={() => dispatch(switchTheme())}
            >
                {isLightMode ? <MdOutlineDarkMode className='w-full h-8 text-black' /> : <MdOutlineLightMode className='w-full h-8' />}
            </button>
        </div>
    )
}

export default Nav;