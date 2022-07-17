import { FC, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useMainContext } from '../../contexts/MainContext'
import { skillList } from '../helpers/dataHelpers'
import Button from '../parts/Button'
import HomePageNavLink from '../parts/navLink/HomePageNavLink'

const HomePage: FC = () => {

    const { logout } = useAuth()
    const { mainContextState, mainContextDispatch } = useMainContext()

    let navLinksList = skillList.map(elt => <HomePageNavLink key={elt.title} to={elt.to} title={elt.title} css={elt.css} />)

    useEffect(() => {
        mainContextDispatch({
            appTitleText: "Choisissez la matière",
        })
    }, [])

    return (
        <div className='h-full flexJIC flex-col gap-6 font-bold sm:gap-8'>
            <span className='text-4xl mb-6 text-center sm:mb-4'>{mainContextState.appTitleText}</span>
            { navLinksList }
            <Button title="Déconnexion" color='bg-slate-400' func={logout} />
        </div>
    )
}

export default HomePage