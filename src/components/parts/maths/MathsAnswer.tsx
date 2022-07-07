import { FC, forwardRef, SetStateAction, useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import { IMathsAnswerProps, IMathsAnswerStateProps } from "../../helpers/interfacesHelpers"
import Button from "../Button"

const reducer = (state: IMathsAnswerStateProps, action: Partial<IMathsAnswerStateProps>) => ({...state, ...action})

const MathsAnswer: FC<IMathsAnswerProps> = forwardRef<HTMLInputElement, IMathsAnswerProps>(({ mode, limit }, ref) => {

    const params = useParams()
    const [mathsAnswerState, mathsAnswerDispatch] = useReducer(reducer, {
        skill: params.competence ? params.competence : 'additionner',
        target : limit,
        lastTarget : null,
        answer: null,
        btn1Txt: 0,
        btn2Txt: 0,
        btn3Txt: 0,
    })

    const setNewTarget = () => {
        let param1
        let param2
        let newTarget
        let newBtn1Txt
        let newBtn2Txt
        let newBtn3Txt
        if(mathsAnswerState.skill === 'additionner'){
            param1 = Math.floor(Math.random() * limit + 1)
            param2 = Math.floor(Math.random() * limit + 1)
            newTarget = param1 + param2
            const selectBtnToTarget = Math.floor(Math.random() * 3 + 1)
            newBtn1Txt = selectBtnToTarget === 1 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
            newBtn2Txt = selectBtnToTarget === 2 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
            newBtn3Txt = selectBtnToTarget === 3 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
        }
        mathsAnswerDispatch({
            target: newTarget,
            lastTarget: mathsAnswerState.target,
            btn1Txt: newBtn1Txt,
            btn2Txt: newBtn2Txt,
            btn3Txt: newBtn3Txt,
        })
    }

    useEffect(() => {
        if (mode === "boutons") {
            setNewTarget()
        }
    }, [mode])  

    return (
        <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
            {
                mode === "clavier" && <input ref={ref} type="text" name="" id="" />
            }
            {
                mode === "boutons" && <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
                    <Button title={mathsAnswerState.btn1Txt.toString()} color="bg-slate-400 border-slate-300" />
                    <Button title={mathsAnswerState.btn2Txt.toString()} color="bg-slate-400 border-slate-300" />
                    <Button title={mathsAnswerState.btn3Txt.toString()} color="bg-slate-400 border-slate-300" />
                </div>
            }
        </div>
    )
})

export default MathsAnswer