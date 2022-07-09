import { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { mathsOptionsList } from '../helpers/dataHelpers'
import HomePageNavLink from '../parts/navLink/HomePageNavLink'
import backArrowImg from "../../assets/images/svg/double-left-arrow"
import MathsTraining from '../parts/maths/MathsTraining'


const MathsPage: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [mathsState, setMathsState] = useState<Array<string>>(["Choisissez l'entraînement",""])
    const navLinksList = mathsOptionsList.map(elt => <HomePageNavLink key={elt.title} to={`maths/${elt.title}`} title={elt.title.replace(/^./, elt.title[0].toUpperCase())} css={elt.color} />)

    const goToPreviousPath = () => {
        navigate(-1)
    }

    const backArrowDiv = <div className='w-24 h-24 transition sm:hidden' role="img" title="Section précédente" onClick={() => goToPreviousPath()}>
        {backArrowImg}
    </div>
    const backArrowDivSMXL = <div className="fixed w-24 h-24 transition top-[50vh] left-20 hidden sm:block md:left-20 xl:left-16 2xl:left-28" role="img" title="Section précédente" onClick={() => goToPreviousPath()}>
        {backArrowImg}
    </div>

    useEffect(() => {
        params.competence && setMathsState([`Entraînement : ${params.competence}`, params.competence])
        return () => {
            setMathsState(["Choisissez l'entraînement",""])
          }
    }, [location])

    return (
        // <div className='flexJIC -mt-40 xl:mt-0'>
        <div className='flexJIC'>
            {backArrowDivSMXL}
            <div className='flexJIC flex-col gap-2 sm:gap-6 xl:gap-12'>
                {/* <div className='w-full hidden xl:flex xl:justify-center xl:items-center'> */}
                <div className='w-full flexJIC'>
                    <span className='text-4xl leading-normal font-bold text-center'>{mathsState[0]}</span>
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