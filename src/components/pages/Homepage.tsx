import { FC } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { nameList } from '../helpers/dataHelpers'
import Button from '../parts/Button'

const HomePage: FC = () => {

    const { logout } = useAuth()
    let buttonList = nameList.map(elt => <Button key={elt.title} title={elt.title} color={elt.color} func={()=> undefined} />)

    return (
        <div className='w-2/3 flexJIC flex-col gap-6 sm:w-5/12 md:w-4/12 lg:w-3/12'>
            <span className='text-4xl mb-12'>Bienvenue</span>
            <Button title="Déconnexion" color='bg-slate-400' func={logout} />
            { buttonList }
        </div>
    )
}

export default HomePage