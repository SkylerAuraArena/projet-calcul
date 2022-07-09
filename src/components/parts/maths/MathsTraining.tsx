import { FC, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { IMathsTrainingStateProps } from '../../helpers/interfacesHelpers'
import { trainingOptionsSettingsList } from '../../helpers/dataHelpers'
import { setMathsSpanMsg, setNewMathsTrainingTarget } from "../../helpers/functionsHelpers"
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
  const spanCss = `p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-md sm:p-6`
  const [mathsTrainingState, mathsTrainingDispatch] = useReducer(reducer, {
      mode : "boutons",
      limit: null,
      timer: null,
      timeLeft: null,
      spanMessage: trainingOptionsSettingsList[0].text,
      spanCss: `${spanCss} ${trainingOptionsSettingsList[0].css}`,
      displayTimer: false,
      startTimer: false,
      skill: params.competence ? params.competence : 'additionner',
      randomSkill: 'additionner',
      target : null,
      lastTarget : null,
      securityRenderCheck: null,
      param1: null,
      param2: null,
      btn1Txt: 0,
      btn2Txt: 0,
      btn3Txt: 0,
      questionsCounter: 0,
      goodAnswersCounter: 0,
  })

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
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && setTimeout(() => {
      mathsTrainingDispatch({
        spanMessage: trainingOptionsSettingsList[4].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[4].css}`,
      })
    }, 1000)
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Go !" && setTimeout(() => {
      setNewMathsTrainingTarget(mathsTrainingState, mathsTrainingDispatch)
    }, 1000)
    mathsTrainingState.timer && (mathsTrainingState.spanMessage === "Bravo" || mathsTrainingState.spanMessage.includes("Raté")) && setTimeout(() => {
      setNewMathsTrainingTarget(mathsTrainingState, mathsTrainingDispatch)
    }, 1000)
    mathsTrainingState.timer && !mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.timeLeft === 0 && mathsTrainingDispatch({
      spanMessage: trainingOptionsSettingsList[5].text, 
      spanCss: `${spanCss} ${trainingOptionsSettingsList[5].css}`,
      displayTimer: false,
      startTimer: false,
      target : null,
      lastTarget : null,
      param1: null,
      param2: null,
      btn1Txt: 0,
      btn2Txt: 0,
      btn3Txt: 0,
    })
  }, [mathsTrainingState.timer, mathsTrainingState.displayTimer, mathsTrainingState.startTimer, mathsTrainingState.spanMessage, mathsTrainingState.questionsCounter])

  useEffect(() => {
    setMathsSpanMsg(mathsTrainingState, mathsTrainingDispatch,-1)
  }, [mathsTrainingState.target, mathsTrainingState.lastTarget, mathsTrainingState.securityRenderCheck])

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
      <div className="w-full h-[68px] flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
        {
          mathsTrainingState.limit && mathsTrainingState.timer && mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.spanMessage.includes("Combien font ") && <MathsAnswer parentState={mathsTrainingState} parentDispatch={mathsTrainingDispatch} setSpanMsg={setMathsSpanMsg} />
        }
        {
          mathsTrainingState.timeLeft === 0 && <span className={`${spanCss} ${trainingOptionsSettingsList[0].css}`}>{`Voici votre score : ${mathsTrainingState.goodAnswersCounter} bonnes réponses sur ${mathsTrainingState.questionsCounter} questions`}</span>
        }
      </div>
    </div>
  )
}

export default MathsTraining