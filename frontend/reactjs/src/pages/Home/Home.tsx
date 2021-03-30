import React, { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import Particles from 'react-particles-js';

function Home() {
    const { theme } = useContext(ThemeContext);
    const size = {
        height: `${window.innerHeight - 68}px`,
        width: `${window.innerWidth}px`        
    };
    console.log(size);
    

    return(
        <div style={{ minHeight: 'calc(100vh - 64px)', minWidth: '100vw', backgroundColor: theme.bg, color: theme.color }}>
            <Particles 
                {...size} 
                params={
                    { 
                        particles: { 
                            color: { 
                                value: theme.color 
                            }, 
                            line_linked: { 
                                color: theme.color 
                            } 
                        } 
                    }
                } 
            />
        </div>
    );
}

export default Home;