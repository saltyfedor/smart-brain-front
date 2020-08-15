import React from 'react';
import Tilt from 'react-tilt'
import chungus from './chungus.png';
import './Logo.css'


const Logo = () => {
    return (
       <div className = 'tilt-container ma4 mt0 '>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
                    <div className="Tilt-inner pa3"> <img className = 'logo' alt='logo' src={chungus}></img> 
                    </div>
            </Tilt>
       </div>
    );
};

export default Logo;