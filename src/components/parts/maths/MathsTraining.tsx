import { FC, useEffect, useReducer, useRef } from "react"
import { useParams } from "react-router-dom"
import { IMathsTrainingStateProps } from '../../helpers/interfacesHelpers'
import { trainingOptionsSettingsList, optionsList } from '../../helpers/dataHelpers'
import { setMathsSpanMsg, setNewMathsTrainingTarget } from "../../helpers/functionsHelpers"
import Button from "../Button"
import { CountdownBar } from "../countdownBar/CountdownBar"
import MathsAnswer from "./MathsAnswer"
import { useMainContext } from "../../../contexts/MainContext"

const reducer = (state: IMathsTrainingStateProps, action: Partial<IMathsTrainingStateProps>) => ({...state, ...action})

const MathsTraining: FC = () => {

  const { mainContextDispatch } = useMainContext()
  const params = useParams()
  const spanCss = `w-full min-h-[7rem] flexJIC flex-col gap-2 p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-xl sm:p-6 sm:min-h-[8rem]`
  const btnButtonCss = 'transition bg-amber-400 border-amber-300'
  const btnKeyboardCss = 'transition bg-emerald-500 border-emerald-300'
  const [mathsTrainingState, mathsTrainingDispatch] = useReducer(reducer, {
      mode : "boutons",
      limit: null,
      timer: null,
      timeLeft: null,
      spanMessage: [trainingOptionsSettingsList[0].text,''],
      defaultSpanCss: spanCss,
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
  const buttonListDivRef = useRef<HTMLDivElement | null>(null)
  const keyboardBtnRef = useRef<HTMLButtonElement | null>(null)
  const buttonsBtnRef = useRef<HTMLButtonElement | null>(null)

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsTrainingDispatch({limit: elt, spanMessage: [trainingOptionsSettingsList[1].text,'']})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map((elt, index) => <Button key={elt} title={index === 0 ?"30 sec" : elt.toLocaleString() + " min"} setter={() => mathsTrainingDispatch({timer: elt * 60, timeLeft: elt * 60, spanMessage: [trainingOptionsSettingsList[2].text,''], spanCss: `${spanCss} ${trainingOptionsSettingsList[2].css}`, displayTimer: true})} color="bg-slate-400 border-slate-300"/>)

  useEffect(() => {
    if(mathsTrainingState.timer && mathsTrainingState.spanMessage[0] === "?? vos marques"){
      if(buttonListDivRef.current){
        buttonListDivRef.current.className = "w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap"
      }
      mainContextDispatch({
        displayTrainingTitle: false,
      })
      setTimeout(() => {
        mathsTrainingDispatch({
          spanMessage: [trainingOptionsSettingsList[3].text,''],
          spanCss: `${spanCss} ${trainingOptionsSettingsList[3].css}`,
        })
      }, 1500)
    }
    mathsTrainingState.timer && mathsTrainingState.spanMessage[0] === "Pr??t ?" && !mathsTrainingState.startTimer && mathsTrainingDispatch({
      startTimer: true,
    })
    mathsTrainingState.timer && mathsTrainingState.spanMessage[0] === "Pr??t ?" && setTimeout(() => {
      mathsTrainingDispatch({
        spanMessage: [trainingOptionsSettingsList[4].text,''],
        spanCss: `${spanCss} ${trainingOptionsSettingsList[4].css}`,
      })
    }, 1000)
    mathsTrainingState.timer && mathsTrainingState.spanMessage[0] === "Go !" && setTimeout(() => {
      setNewMathsTrainingTarget(mathsTrainingState, mathsTrainingDispatch)
    }, 1000)
    mathsTrainingState.timer && (mathsTrainingState.spanMessage[0].includes("Bravo") || mathsTrainingState.spanMessage[0].includes("Rat??")) && setTimeout(() => {
      setNewMathsTrainingTarget(mathsTrainingState, mathsTrainingDispatch)
    }, 1000)
    if(mathsTrainingState.timer && !mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.timeLeft === 0){
      if(buttonListDivRef.current){
        buttonListDivRef.current.className = "hidden"
      }
      mainContextDispatch({
        displayTrainingTitle: true,
        trainingSpanText: `Voici votre score : ${mathsTrainingState.goodAnswersCounter} bonnes r??ponses sur ${mathsTrainingState.questionsCounter} questions`,
      })
      mathsTrainingDispatch({
        spanMessage: [trainingOptionsSettingsList[5].text,''], 
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
    }
  }, [mathsTrainingState.timer, mathsTrainingState.displayTimer, mathsTrainingState.startTimer, mathsTrainingState.spanMessage, mathsTrainingState.questionsCounter])

  useEffect(() => {
    setMathsSpanMsg(mathsTrainingState, mathsTrainingDispatch,-1)
  }, [mathsTrainingState.target, mathsTrainingState.lastTarget, mathsTrainingState.securityRenderCheck])

  useEffect(() => {
    if(keyboardBtnRef.current && buttonsBtnRef.current){
      if(mathsTrainingState.mode === "clavier"){
        keyboardBtnRef.current.className = `btnClicked ${btnKeyboardCss}`
        buttonsBtnRef.current.className = `btn ${btnButtonCss}`
      } else {
        keyboardBtnRef.current.className = `btn ${btnKeyboardCss}`
        buttonsBtnRef.current.className = `btnClicked ${btnButtonCss}`
      }
    }
  }, [mathsTrainingState.mode, mathsTrainingState.spanMessage])  

  useEffect(() => {
    return () => {
      mainContextDispatch({
        displayTrainingTitle: true,
        trainingSpanText: '',
      })
    }
  }, [])
  

  return (
    <div className="w-full flexJIC flex-col gap-8 mb-12 xl:mb-0 xl:gap-[4.5rem]">
      {
        mathsTrainingState.displayTimer && <div className="hidden xl:flex xl:justify-center xl:items-center gap-12 mt-2 sm:mt-0">
            <button ref={buttonsBtnRef} className={`btn ${btnButtonCss}`} title="Boutons" onClick={() => mathsTrainingDispatch({mode: "boutons"})}>Boutons</button>
            <button ref={keyboardBtnRef} className={`btn ${btnKeyboardCss}`} title="Clavier" onClick={() => mathsTrainingDispatch({mode: "clavier"})}>Clavier</button>
          </div>
      }
      <div className={mathsTrainingState.spanCss}>
        <span>{mathsTrainingState.spanMessage[0]}</span>
        {
          mathsTrainingState.spanMessage[1] !== '' && <span className="ml-1.5 text-black">{mathsTrainingState.spanMessage[1]}</span>
        }
      </div>
      {
        <div ref={buttonListDivRef} className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
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
      }
      {
        mathsTrainingState.timer && <div className="w-full h-[68px] flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
          {
            mathsTrainingState.limit && mathsTrainingState.timer && mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.spanMessage[0].includes("Combien font ") && <MathsAnswer parentState={mathsTrainingState} parentDispatch={mathsTrainingDispatch} setSpanMsg={setMathsSpanMsg} />
          }
          {
            mathsTrainingState.timeLeft === 0 && <span className={`${spanCss} ${trainingOptionsSettingsList[0].css}`}>{`Voici votre score : ${mathsTrainingState.goodAnswersCounter} bonnes r??ponses sur ${mathsTrainingState.questionsCounter} questions (${
              isNaN(Math.round((mathsTrainingState.goodAnswersCounter * 100 / mathsTrainingState.questionsCounter + Number.EPSILON) * 100) / 100) ? 0 : Math.round((mathsTrainingState.goodAnswersCounter * 100 / mathsTrainingState.questionsCounter + Number.EPSILON) * 100) / 100
            }%)`}</span>
          }
        </div>
      }
    </div>
  )
}

export default MathsTraining