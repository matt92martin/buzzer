import React from 'react'
import { JoinGame } from '../component/joinGame'
import { ModJoinGame } from '../component/modJoinGame'
import { CreateGame } from '../component/createGame'

const StartGame = () => {
    return (
        <div>
            <div>
                <CreateGame />
            </div>
            <div>
                <ModJoinGame />
            </div>

            <div>
                <JoinGame />
            </div>
        </div>
    )
}

export { StartGame }
