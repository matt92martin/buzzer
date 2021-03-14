import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ChangeName } from '../component/changeName'

const GameWindow = ({ children }) => {
    const { id } = useParams()
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    React.useEffect(() => {
        axios
            .get(`/api/game/${id}`)
            .then((res) => {
                setIsLoggedIn(res.data.success)
            })
            .catch(() => {
                history.push('/game/join')
            })
    }, [id])
    if (!isLoggedIn) return <div>Loading...</div>

    return <div>{children}</div>
}

const Game = () => {
    return (
        <GameWindow>
            <div>Game</div>
            <ChangeName />
        </GameWindow>
    )
}

export { Game }
