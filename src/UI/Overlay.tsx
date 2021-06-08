import React, {CSSProperties} from 'react'

const modelStyle: CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    zIndex: 1,
    background: 'rgba(0, 0, 0, 0.75)'
}

interface ToggleProps {
    closeOverLay: () => void
}


const Overlay = (Props: ToggleProps) => {
    return <div style={modelStyle}  onClick={Props.closeOverLay}/>;
}

export default Overlay
