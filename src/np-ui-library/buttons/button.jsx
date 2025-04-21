import React from 'react'
import './button.css'
import { ScaleLoader } from 'react-spinners'

function Button({ clickEvent, label, loading, btnWidth = '150px', disabled = false}) {
  return (
    <div className='btnContainer' style={ disabled? { opacity: 0.5, pointerEvents: 'none' } : null}>
        <div className='button' onClick={clickEvent} style={ loading? { pointerEvents: 'none', minWidth: btnWidth } : null }>
            {(loading == true)?
                <ScaleLoader
                    height={10}
                    loading = {loading}
                    color = 'white'
                    width={3}
                    radius={20}
                    cssOverride={{
                        opacity: '0.8',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                />
                :
                <>{label}</>
            }
        </div>
    </div>
  )
}

export default Button