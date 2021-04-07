import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { ChangeName } from '../component/changeName'
import { GameWindow } from '../component/game/gameWindow'

const gameSelector = createSelector(
    (state) => state.game,
    (game) => game
)

const GameContainer = ({ children }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()
    const game = useSelector(gameSelector)
    const [isAllowed, setIsAllowed] = useState(null)

    React.useEffect(() => {
        console.log(game)
        if (game.gameId === Number(id)) {
            setIsAllowed(true)
        } else {
            setIsAllowed(false)
        }
    }, [id, setIsAllowed])

    React.useEffect(() => {
        if (isAllowed) {
            const info = {
                username: game.username,
                color: game.color,
                gameId: Number(id),
            }
            console.log(info)
            dispatch({ type: 'server/change_room', payload: { ...info } })
        }
    }, [dispatch, isAllowed])

    if (isAllowed === false) {
        return (
            <div>
                <p>You may not have had the correct password for this game. Please try again</p>
                <div>
                    <button onClick={() => history.push('/game/join')}>Go to Game Join page</button>
                </div>
            </div>
        )
    }

    return <div>{children}</div>
}

const Game = () => {
    return (
        <GameContainer>
            <div>Game</div>
            <ChangeName />
            <GameWindow />
        </GameContainer>
    )
}

export { Game }
