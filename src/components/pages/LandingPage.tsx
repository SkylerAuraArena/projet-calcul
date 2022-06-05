// import { FC, ReactElement } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import Button from '../parts/Button'

// const LandingPage: FC = () => {

//     const { signInWithGoogle } = useAuth()

//     const handleClick = () => {
//             signInWithGoogle().then(cred => {
//             }).catch((error) => console.log(error))
//         }
//     }


//     return (
//         <div className='w-2/3 flexJIC flex-col gap-6 sm:w-5/12 md:w-4/12 lg:w-3/12'>
//             <span>Bienvenue !</span>
//             <Button title="Connexion" color='bg-slate-400' func={handleClick} />
//         </div>
//     )
// }

// export default LandingPage

import { FC, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const LandingPage: FC = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [authing, setAuthing] = useState(false)

    const signInWithGoogle = async () => {
        setAuthing(true)

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                setAuthing(false)
            })
    }

    return (
        <div>
            <p>Login Page</p>
            <button onClick={() => signInWithGoogle()} disabled={authing}>
                Sign in with Google
            </button>
        </div>
    )
}

export default LandingPage