import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { nameList } from '../helpers/dataHelpers'
import Button from '../parts/Button'

const HomePage: FC = () => {

    const { logout } = useAuth()
    const navigate = useNavigate()
    let buttonList = nameList.map(elt => <Button key={elt.title} title={elt.title} color={elt.color} func={()=> undefined} />)

    const handleClick = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='flexJIC flex-col gap-6 font-bold'>
            <span className='text-4xl mb-12'>Bienvenue</span>
            <Button title="Déconnexion" color='bg-slate-400' func={logout} />
            { buttonList }
        </div>
    )
}

export default HomePage