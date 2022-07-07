import { FC, useEffect, useReducer, useRef } from "react"
import { useParams } from "react-router-dom"
import { IMathsTrainingStateProps } from '../../helpers/interfacesHelpers'
import { trainingOptionsSettingsList } from '../../helpers/dataHelpers'
import Button from "../Button"
import { CountdownBar } from "../countdownBar/CountdownBar"
import MathsAnswer from "./MathsAnswer"

const reducer = (state: IMathsTrainingStateProps, action: Partial<IMathsTrainingStateProps>) => ({...state, ...action})

const MathsTraining: FC = () => {

  const params = useParams()
  const optionsList = [
    [10,20,30,40,50,60,70,80,90,100,1000,10000],
    [0.5,1,2,3,5,10,15,20]
  ]
  const spanCss = `p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-md sm:p-6 `
  const [mathsTrainingState, mathsTrainingDispatch] = useReducer(reducer, {
      mode : "boutons",
      limit: null,
      timer: null,
      timeLeft: null,
      spanMessage: trainingOptionsSettingsList[0].text,
      spanCss: `${spanCss} ${trainingOptionsSettingsList[0].css}`,
      displayTimer: false,
      startTimer: false,
  })    
  const mathsAnswerRef = useRef<HTMLInputElement | null>(null)

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsTrainingDispatch({limit: elt, spanMessage: trainingOptionsSettingsList[1].text})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map((elt, index) => <Button key={elt} title={index === 0 ?"30 sec" : elt.toLocaleString() + " min"} setter={() => mathsTrainingDispatch({timer: elt * 60, timeLeft: elt * 60, spanMessage: trainingOptionsSettingsList[2].text, spanCss: `${spanCss} ${trainingOptionsSettingsList[2].css}`, displayTimer: true})} color="bg-slate-400 border-slate-300"/>)

  useEffect(() => {
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "À vos marques" && setTimeout(() => {
      mathsTrainingDispatch({
        spanMessage: trainingOptionsSettingsList[3].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[3].css}`,
      })
    }, 1500)
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && !mathsTrainingState.startTimer && mathsTrainingDispatch({
      startTimer: true,
    })
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && mathsTrainingState.startTimer && setTimeout(() => {
      mathsTrainingDispatch({
        spanMessage: trainingOptionsSettingsList[4].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[4].css}`,
      })
    }, 2000)
    mathsTrainingState.timer && (mathsTrainingState.spanMessage === trainingOptionsSettingsList[0].text || (mathsTrainingState.spanMessage !== trainingOptionsSettingsList[1].text && mathsTrainingState.spanMessage !== trainingOptionsSettingsList[2].text && mathsTrainingState.spanMessage !== trainingOptionsSettingsList[3].text && mathsTrainingState.spanMessage !== trainingOptionsSettingsList[5].text)) && mathsTrainingState.startTimer && mathsTrainingState.timeLeft != null && mathsTrainingState.timeLeft === 0 && mathsTrainingDispatch({
      spanMessage: trainingOptionsSettingsList[5].text, 
      spanCss: `${spanCss} ${trainingOptionsSettingsList[5].css}`,
      displayTimer: false,
      startTimer: false,
    })
    if(mathsAnswerRef.current && mathsTrainingState.mode === "clavier" && mathsTrainingState.displayTimer){
      mathsAnswerRef.current.focus()
    }
  }, [mathsTrainingState])
  

  return (
    <div className="w-full flexJIC flex-col gap-12 mb-12 xl:mb-0">
      {
        mathsTrainingState.displayTimer && <div className="flexJIC gap-12 mt-2 sm:mt-0">
            <Button title="Clavier" color="bg-emerald-500 border-emerald-300" setter={() => mathsTrainingDispatch({mode: "clavier"})}/>
            <Button title="Boutons" color="bg-amber-400 border-amber-300" setter={() => mathsTrainingDispatch({mode: "boutons"})}/>
          </div>
      }
      <span className={mathsTrainingState.spanCss}>{mathsTrainingState.spanMessage}</span>
      <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
        { 
          !mathsTrainingState.limit && !mathsTrainingState.timer && navLinksTargetsList
        }
        { 
          mathsTrainingState.limit && !mathsTrainingState.timer && navLinksTimeList
        }
        {
          mathsTrainingState.limit && mathsTrainingState.timer && mathsTrainingState.displayTimer && <CountdownBar timer={mathsTrainingState.timer} startTimer={mathsTrainingState.startTimer} dispatch={mathsTrainingDispatch} />
        }
      </div>
      {
        mathsTrainingState.limit && mathsTrainingState.timer && mathsTrainingState.displayTimer && mathsTrainingState.spanMessage === "Go !" && <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
          <MathsAnswer ref={mathsAnswerRef}  mode={mathsTrainingState.mode} limit={mathsTrainingState.limit} />
        </div>
      }
    </div>
  )
}

export default MathsTraining