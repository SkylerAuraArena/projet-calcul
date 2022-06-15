import { FC, useState, useLayoutEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Loader } from '../parts/loader/Loader'
import SigninWith from '../signAndLog/SigninWith'

const LoginPage: FC = () => {
    const { loading, setLoading } = useAuth()
    const [authing, setAuthing] = useState<boolean>(false)

    useLayoutEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    
      return () => {
        setAuthing(false)
        setLoading(true)
      };
    }, [])

    return (
        <div className='flexJIC flex-col'>
            <span className='text-4xl text-center'>Bienvenue, veuillez vous connecter.</span>
            <div className="w-full mt-12 flexJIC">
                { loading && <Loader/> }
                { !authing && !loading && <SigninWith withWhat='google' setAuthing={setAuthing} /> }
                { authing && <Loader/> }
            </div>
        </div>
    )
}

export default LoginPage