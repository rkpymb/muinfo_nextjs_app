import React from 'react'
import Mstyles from '/Styles/customstyle.module.css'
const HomeAsideAddLaptop = () => {
    return (
        <div className={Mstyles.Addbox}>
            <div className={Mstyles.HomeAsideAddLaptop}>
                <img src='http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A3001%2Fcontent%2F1714433000401-458409737.jpg&w=1920&q=100' width={'100%'} />
            </div>
            <div className={Mstyles.AddboxText}>
                <span>sponsored</span>
            </div>
        </div>
    )
}

export default HomeAsideAddLaptop
