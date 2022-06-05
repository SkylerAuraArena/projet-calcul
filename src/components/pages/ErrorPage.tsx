import { FC } from 'react'
import { Link } from 'react-router-dom'

const LandingPage: FC = () => {

    return (
        <div className='w-2/3 flexJIC flex-col gap-6 sm:w-5/12 md:w-4/12 lg:w-3/12'>
            <span className='text-red-600 font-bold text-4xl'>Erreur !</span>
            <Link to="/accueil" className='btn bg-slate-400'>Retour à l'accueil</Link>
        </div>
    )
}

export default LandingPage