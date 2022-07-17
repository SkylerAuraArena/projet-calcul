import { FC, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMainContext } from '../../contexts/MainContext'
import { mathsOptionsList } from '../helpers/dataHelpers'
import HomePageNavLink from '../parts/navLink/HomePageNavLink'
import backArrowImg from "../../assets/images/svg/double-left-arrow"
import MathsTraining from '../parts/maths/MathsTraining'


const MathsPage: FC = () => {

    const { mainContextState, mainContextDispatch } = useMainContext()
    const mathsPageMainDivRef = useRef<HTMLDivElement | null>(null)
    const mathsPageSecondDivRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [mathsState, setMathsState] = useState<Array<string>>(["Choisissez l'entraînement",""])
    const navLinksList = mathsOptionsList.map(elt => <HomePageNavLink key={elt.title} to={`maths/${elt.title}`} title={elt.title.replace(/^./, elt.title[0].toUpperCase())} css={elt.color} />)

    const goToPreviousPath = () => {
        navigate(-1)
    }

    const backArrowDiv = <div className='w-24 h-24 mb-2 transition sm:hidden' role="img" title="Section précédente" onClick={() => goToPreviousPath()}>
        {backArrowImg}
    </div>
    const backArrowDivSMXL = <div className="fixed w-24 h-24 transition top-[43vh] left-20 hidden sm:block md:left-20 xl:left-16 2xl:left-28" role="img" title="Section précédente" onClick={() => goToPreviousPath()}>
        {backArrowImg}
    </div>

    useEffect(() => {
        mainContextDispatch({
            appTitleText: mathsState[0],
        })
    }, [mathsState])

    useEffect(() => {
        if(mathsPageMainDivRef.current && mathsPageSecondDivRef.current){
            console.log(mainContextState.trainingSpanText)
            if(mainContextState.trainingSpanText.includes("Voici votre score : ")){
                mathsPageMainDivRef.current.className = "flexJIC -mt-32 xl:mt-0"
                mathsPageSecondDivRef.current.className = "w-full flexJIC"
            } else if(mainContextState.displayTrainingTitle && !mainContextState.trainingSpanText.includes("Voici votre score : ")){
                mathsPageMainDivRef.current.className = "flexJIC"
                mathsPageSecondDivRef.current.className = "w-full flexJIC"
            } else {
                mathsPageMainDivRef.current.className = "flexJIC -mt-32 xl:mt-0"
                mathsPageSecondDivRef.current.className = "hidden"
            }
        }

        return () => {
            if(mainContextState.displayTrainingTitle && mathsPageMainDivRef.current && mathsPageSecondDivRef.current){
                mathsPageMainDivRef.current.className = "flexJIC"
                mathsPageSecondDivRef.current.className = "w-full flexJIC"
            }
          }
    }, [mainContextState.displayTrainingTitle, mainContextState.trainingSpanText])


    useEffect(() => {
        params.competence && setMathsState([`Entraînement : ${params.competence}`, params.competence])
        return () => {
            setMathsState(["Choisissez l'entraînement",""])
          }
    }, [location])

    return (
        <div ref={mathsPageMainDivRef} className='flexJIC'>
            {backArrowDivSMXL}
            <div className='w-full flexJIC flex-col gap-2 sm:gap-6 xl:gap-10'>
                <div ref={mathsPageSecondDivRef} className='w-full flexJIC'>
                    <span className='mt-5 text-3xl leading-normal font-bold text-center xl:text-4xl'>{mainContextState.appTitleText}</span>
                </div>
                {
                    mathsState[1] === "" && <div className='flex justify-between items-center flex-col gap-4 sm:flex-row sm:gap-16 lg:gap-6'>
                        {backArrowDiv}
                        <div className='flexJIC flex-col gap-6 xl:flex-row'>
                            { navLinksList }
                        </div>
                    </div>
                }
                {
                    mathsState[1] !== "" && <div className='w-full flex justify-between items-center flex-col gap-4 sm:flex-row sm:gap-16 lg:gap-6'>
                        {backArrowDiv}
                        <MathsTraining />
                    </div>
                }
            </div>
        </div>
    )
}

export default MathsPage