import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { IndexProvider } from './context'

const Index = () => {
    return (
        <IndexProvider>
            <App />
        </IndexProvider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))
