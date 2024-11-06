import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../features/themeSlice'

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function Nav() {
    const dispatch = useDispatch()
    const isLightMode = useSelector((state) => state.theme.lightMode)

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.style.setProperty('--bg-color', '#fffafa')
            document.documentElement.style.setProperty('--text-color', 'black')
        } else {
            document.documentElement.style.setProperty('--bg-color', '#232323')
            document.documentElement.style.setProperty('--text-color', 'white')
        }
    }, [isLightMode])
    
    
    return (
        <div className='max-w-[1680px] w-full my-2 px-2 flex justify-between bg-black bg-opacity-20 backdrop-blur-lg rounded-lg z-50'>
            <img className='w-20' src="src/assets/marvel.png" alt="" />
            <button
                className='w-20'
                onClick={() => dispatch(switchTheme())}
            >
                {isLightMode ? <MdOutlineDarkMode className='w-full h-8 text-black' /> : <MdOutlineLightMode className='w-full h-8' />}
            </button>
        </div>
    )
}
