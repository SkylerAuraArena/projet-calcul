import { FC, forwardRef, SetStateAction, useEffect, useReducer, useState } from "react"
import { useParams } from "react-router-dom"
import { IMathsAnswerProps, IMathsAnswerStateProps } from "../../helpers/interfacesHelpers"
import Button from "../Button"

const reducer = (state: IMathsAnswerStateProps, action: Partial<IMathsAnswerStateProps>) => ({...state, ...action})

const MathsAnswer: FC<IMathsAnswerProps> = forwardRef<HTMLInputElement, IMathsAnswerProps>(({ mode, limit, spanMessage, dispatch }, ref) => {

    const params = useParams()
    const [mathsAnswerState, mathsAnswerDispatch] = useReducer(reducer, {
        skill: params.competence ? params.competence : 'additionner',
        target : limit,
        lastTarget : null,
        param1: 0,
        param2: 0,
        btn1Txt: 0,
        btn2Txt: 0,
        btn3Txt: 0,
    })

    const setNewTarget = () => {
        let newParam1
        let newParam2
        let newTarget
        let newBtn1Txt
        let newBtn2Txt
        let newBtn3Txt
        if(mathsAnswerState.skill === 'additionner'){
            newParam1 = Math.floor(Math.random() * limit + 1)
            newParam2 = Math.floor(Math.random() * limit + 1)
            newTarget = newParam1 + newParam2
            const selectBtnToTarget = Math.floor(Math.random() * 3 + 1)
            newBtn1Txt = selectBtnToTarget === 1 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
            newBtn2Txt = selectBtnToTarget === 2 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
            newBtn3Txt = selectBtnToTarget === 3 ? newTarget : Math.floor(Math.random() * limit + 1) + Math.floor(Math.random() * limit + 1)
        }
        mathsAnswerDispatch({
            target: newTarget,
            lastTarget: mathsAnswerState.target,
            param1: newParam1,
            param2: newParam2,
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

    useEffect(() => {
        if(spanMessage === "Go !"){
            setTimeout(() => {
                let operator
                if(mathsAnswerState.skill === 'additionner'){
                    operator  = '+'
                }
                dispatch({
                    spanMessage: `Combien font ${mathsAnswerState.param1} ${operator} ${mathsAnswerState.param2} ?`,
                    spanCss: `p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-md sm:p-6 bg-amber-400 border-amber-300`,
                })
            }, 1000);
        }
    }, [mathsAnswerState, spanMessage])
    

    return (
        <>
        {/* <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap"> */}
            {
                mode === "clavier" && spanMessage !== "Prêt ?" && spanMessage !== "Go !" && <input ref={ref} type="text" name="" id="" />
            }
            {
                mode === "boutons" && spanMessage !== "Prêt ?" && spanMessage !== "Go !" && <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
                    <Button title={mathsAnswerState.btn1Txt.toString()} color="bg-slate-400 border-slate-300" />
                    <Button title={mathsAnswerState.btn2Txt.toString()} color="bg-slate-400 border-slate-300" />
                    <Button title={mathsAnswerState.btn3Txt.toString()} color="bg-slate-400 border-slate-300 mb-3 xl:mb-0" />
                </div>
            }
        {/* </div> */}
        </>
    )
})

export default MathsAnswer