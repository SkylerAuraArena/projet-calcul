import { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { mathsOptionsList } from '../helpers/dataHelpers'
// import Button from '../parts/Button'
import HomePageNavLink from '../parts/navLink/HomePageNavLink'
import backArrowImg from "../../assets/images/svg/double-left-arrow"


const MathsPage: FC = () => {

    let navigate = useNavigate()
    let location = useLocation()
    let params = useParams()
    const [mathsState, setMathsState] = useState<Array<string>>(["Choisissez l'entraînement",""])
    let navLinksList = mathsOptionsList.map(elt => <HomePageNavLink key={elt.title} to={`maths/${elt.title}`} title={elt.title} css={elt.color} />)

    const goToPreviousPath = () => {
        navigate(-1)
    }

    const backArrowDiv = <div className='w-24 h-24 transition' role="img" title="Section précédente" onClick={() => goToPreviousPath()}>
        {backArrowImg}
    </div>

    useEffect(() => {
        params.competence && setMathsState([`Entraînement : ${params.competence}`, params.competence])
        return () => {
            setMathsState(["Choisissez l'entraînement",""])
          }
    }, [location])


    return (
        <div className='flexJIC flex-col gap-2 sm:gap-6'>
            <div className='w-full flexJIC'>
                <span className='text-4xl leading-normal font-bold text-center'>{mathsState[0]}</span>
            </div>
            {
                mathsState[1] === "" && <div className='flex justify-between items-center flex-col gap-4 sm:flex-row sm:gap-16 lg:gap-6'>
                    {backArrowDiv}
                    <div className='flexJIC flex-col gap-6 lg:flex-row'>
                        { navLinksList }
                    </div>
                </div>
            }
            {
                mathsState[1] !== "" && <div className='flex justify-between items-center flex-col gap-4 sm:flex-row sm:gap-16 lg:gap-6'>
                    {backArrowDiv}
                    <span>{mathsState[1]}</span>
                </div>
            }
        </div>
    )
}

export default MathsPage