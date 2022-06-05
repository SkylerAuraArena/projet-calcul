import { FC } from 'react'
import SigninWith from '../signAndLog/SigninWith'

const LoginPage: FC = () => {
    return (
        <div className='flexJIC flex-col'>
            <span className='text-4xl text-center'>Bienvenue, veuillez vous connecter.</span>
            <div className="w-full mt-12 flex justify-around items-center">
                <SigninWith withWhat='google' />
            </div>
        </div>
    )
}

export default LoginPage