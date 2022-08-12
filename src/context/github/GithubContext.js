import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"
import { redi } from "react-router-dom"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'  
        })
    }

    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
        const { items } = await response.json()
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    const clearUsers = () => {
        dispatch({ type: 'CLEAR_USERS' })
    }

    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`);
        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }    
    }

    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
        const data = await response.json()
        dispatch({
            type: 'GET_REPOS',
            payload: data,
        })
    }

    return <GithubContext.Provider
        value={{ 
            users: state.users, 
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
            setLoading,
        }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext