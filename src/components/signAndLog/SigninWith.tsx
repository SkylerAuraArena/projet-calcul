import { FC, useRef, useLayoutEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { UserCredential } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ILoginProps } from '../helpers/interfacesHelpers'
import logoGoogle from "../../assets/images/logo-google.png"
import logoFacebook from "../../assets/images/logo-facebook.png"


const SigninWith: FC<ILoginProps> = ({withWhat, setAuthing}) => {
    const { signInWithGoogle, ifNewCreateUserInFirestoreDatabase } = useAuth()
    const navigate = useNavigate()
    const btnRef = useRef<HTMLButtonElement>(null)

    const cssBtn = 'flex justify-center w-[8.8rem] rounded px-9 py-4 border-2 border-ivory transition-all'
    const cssBtnFadeOut = 'opacity-0'
    const cssBtnFadeIn = 'opacity-100'
    const cssBtnHover = 'hover:scale-110 cursor-pointer'
    const cssBtnClicked = `bg-slate-400 cursor-not-allowed`
    let btnCss = `${cssBtn} ${cssBtnHover} ${cssBtnFadeOut}`

    const imgLogo = {
        img: withWhat === "google" ? logoGoogle : logoFacebook,
        alt: `Logo de ${withWhat === "google" ? "logoGoogle" : logoFacebook}`,
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            if(null !== btnRef.current){
                btnRef.current.className = `${cssBtn} ${cssBtnHover} ${cssBtnFadeIn}`
            }
        }, 25);
    }, [])

    const handleClick = () => {
        setAuthing(true)
        if(null !== btnRef.current){
            btnRef.current.className = `${cssBtn} ${cssBtnClicked}`
        }
        switch (withWhat) {
            case "google":
                signInWithGoogle().then((cred: UserCredential) => {
                    ifNewCreateUserInFirestoreDatabase(cred)
                    navigate('/')
                }).catch((error) => {
                    console.log(error)
                    setAuthing(false)
                })
                break
            default:
                break
        }
    }

    return (
        <button ref={btnRef} className={btnCss} onClick={() => handleClick()} >
            <img className="h-full w-full min-h-[64.826px]" src={imgLogo.img} alt={imgLogo.alt} />
        </button>
    )
}

export default SigninWith