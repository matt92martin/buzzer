import React from 'react'
import { Players } from './players'
import { Questions } from './questions'

const GameWindow = () => {
    return (
        <div>
            <Players title="Blue team" team="blue" />
            <Players title="Red team" team="red" />
            <Players title="Host" team="mod" />
            <Players title="Side line" team={[undefined, null, '']} />
            <Questions />
        </div>
    )
}

export { GameWindow }
