import { FC, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { IMathsStateProps } from '../../helpers/interfacesHelpers'
import { trainingOptionsSettingsList } from '../../helpers/dataHelpers'
import Button from "../Button"
import { CountdownBar } from "../countdownBar/CountdownBar"

const reducer = (state: IMathsStateProps, action: Partial<IMathsStateProps>) => ({...state, ...action})

const MathsTraining: FC = () => {

  const params = useParams()
  const optionsList = [
    [10,20,30,40,50,60,70,80,90,100,1000,10000],
    [0.5,1,2,3,5,6,7,8,9,10,15,20]
  ]
  const spanCss = `p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-md sm:p-6 `
  const [mathsState, mathsDispatch] = useReducer(reducer, {
      mode : "clavier",
      target: null,
      time: null,
      spanMessage: trainingOptionsSettingsList[0].text,
      spanCss: `${spanCss} ${trainingOptionsSettingsList[0].css}`,
      displayTimer: false,
      startTimer: false,
  })    

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsDispatch({target: elt, spanMessage: trainingOptionsSettingsList[1].text})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map(elt => <Button key={elt} title={elt.toLocaleString() + " min"} setter={() => mathsDispatch({time: elt, spanMessage: trainingOptionsSettingsList[2].text, spanCss: `${spanCss} ${trainingOptionsSettingsList[2].css}`, displayTimer: true})} color="bg-slate-400 border-slate-300"/>)

  useEffect(() => {
    mathsState.time && mathsState.spanMessage === "À vos marques" && setTimeout(() => {
      mathsDispatch({
        spanMessage: trainingOptionsSettingsList[3].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[3].css}`,
      })
    }, 1500)
    mathsState.time && mathsState.spanMessage === "Prêt ?" && !mathsState.startTimer && mathsDispatch({
      startTimer: true,
    })
    mathsState.time && mathsState.spanMessage === "Prêt ?" && mathsState.startTimer && setTimeout(() => {
      mathsDispatch({
        spanMessage: trainingOptionsSettingsList[4].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[4].css}`,
      })
    }, 2000)
  }, [mathsState])
  

  return (
    <div className="w-full flexJIC flex-col gap-12 mb-12 xl:mb-0">
      <div className="flexJIC gap-12 mt-2 sm:mt-0">
        <Button title="Clavier" color="bg-emerald-500 border-emerald-300" setter={() => mathsDispatch({mode: "clavier"})}/>
        <Button title="Boutons" color="bg-amber-400 border-amber-300" setter={() => mathsDispatch({mode: "boutons"})}/>
      </div>
      <span className={mathsState.spanCss}>{mathsState.spanMessage}</span>
      <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
        { 
          !mathsState.target && !mathsState.time && navLinksTargetsList
        }
        { 
          mathsState.target && !mathsState.time && navLinksTimeList
        }
        {
          mathsState.target && mathsState.time && mathsState.displayTimer && <CountdownBar timer={mathsState.time} startTimer={mathsState.startTimer} />
        }
      </div>
      <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
        { 
          mathsState.target && mathsState.time && mathsState.mode === "clavier" && <input type="text" name="" id="" />
        }
        { 
          mathsState.target && mathsState.time && mathsState.mode === "boutons" && <Button title="Bouton" color="bg-emerald-500 border-emerald-300" />
        }
      </div>
    </div>
  )
}

export default MathsTraining