import React from 'react'
import cl from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]
    console.log("1. rootClasses array BEFORE condition:", rootClasses)
    console.log("   Type:", typeof rootClasses, "Is array:", Array.isArray(rootClasses))

    if (visible) {
        rootClasses.push(cl.active);
    }

    console.log("2. rootClasses array AFTER condition:", rootClasses)
    console.log("   Length:", rootClasses.length)
    console.log("   Contents:", JSON.stringify(rootClasses))
    
    const joinedClasses = rootClasses.join('  ')
    console.log("3. AFTER joining with two spaces:", joinedClasses)
    console.log("   Type of joined string:", typeof joinedClasses)
    console.log("   String length:", joinedClasses.length)
    console.log("   String representation:", `"${joinedClasses}"`)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal
