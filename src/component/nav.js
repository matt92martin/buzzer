import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/reducers/game'

const Nav = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const clickLogout = async () => {
        dispatch(logout()).then(() => {
            history.push('/')
        })
    }

    return (
        <div>
            <div>
                <Link to="/">Create Game</Link>
            </div>
            <div>
                <Link to="/game/join">Join Game</Link>
            </div>
            <div>
                <a href="#" onClick={clickLogout}>
                    Leave game
                </a>
            </div>
        </div>
    )
}

export { Nav }
