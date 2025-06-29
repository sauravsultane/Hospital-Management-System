import { useState } from 'react'
import {assets} from'../assets/assets.js' 


import React from 'react'

const login = () => {
    const [state, setState] =useState('Admin')
  return (
    <div>
      <form>
        <div>
            <p><span>{state}</span> Login</p>
        </div>
      </form>
    </div>
  )
}

export default login
