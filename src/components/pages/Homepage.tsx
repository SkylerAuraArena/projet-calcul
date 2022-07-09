import { FC } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { skillList } from '../helpers/dataHelpers'
import Button from '../parts/Button'
import HomePageNavLink from '../parts/navLink/HomePageNavLink'

const HomePage: FC = () => {

    const { logout } = useAuth()
    let navLinksList = skillList.map(elt => <HomePageNavLink key={elt.title} to={elt.to} title={elt.title} css={elt.color} />)

    return (
        <div className='flexJIC flex-col gap-6 font-bold'>
            <span className='text-4xl mb-6 sm:mb-12 text-center'>Bienvenue, choisissez la matière</span>
            { navLinksList }
            <Button title="Déconnexion" color='bg-slate-400' func={logout} />
        </div>
    )
}

export default HomePage