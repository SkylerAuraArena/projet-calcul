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
  const mathsAnswerRef = useRef<HTMLInputElement | null>(null)

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsTrainingDispatch({limit: elt, spanMessage: trainingOptionsSettingsList[1].text})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map((elt, index) => <Button key={elt} title={index === 0 ?"30 sec" : elt.toLocaleString() + " min"} setter={() => mathsTrainingDispatch({timer: elt * 60, timeLeft: elt * 60, spanMessage: trainingOptionsSettingsList[2].text, spanCss: `${spanCss} ${trainingOptionsSettingsList[2].css}`, displayTimer: true})} color="bg-slate-400 border-slate-300"/>)

  const setNewTarget = () => {
    console.log('SetNewTarget')
    let newParam1
    let newParam2
    let newTarget
    let newBtn1Txt
    let newBtn2Txt
    let newBtn3Txt
    let newSecurityRenderCheck
    if(mathsTrainingState.limit && mathsTrainingState.skill === 'additionner'){
        newParam1 = Math.floor(Math.random() * mathsTrainingState.limit + 1)
        newParam2 = Math.floor(Math.random() *  mathsTrainingState.limit + 1)
        while (mathsTrainingState.securityRenderCheck === newSecurityRenderCheck) {
          newSecurityRenderCheck = Math.floor(Math.random() *  99999) 
        }
        newTarget = newParam1 + newParam2
        const selectBtnToTarget = Math.floor(Math.random() * 3 + 1)
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : Math.floor(Math.random() *  mathsTrainingState.limit + 1) + Math.floor(Math.random() *  mathsTrainingState.limit + 1)
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : Math.floor(Math.random() *  mathsTrainingState.limit + 1) + Math.floor(Math.random() *  mathsTrainingState.limit + 1)
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : Math.floor(Math.random() *  mathsTrainingState.limit + 1) + Math.floor(Math.random() *  mathsTrainingState.limit + 1)
    }
    mathsTrainingDispatch({
        target: newTarget,
        lastTarget: mathsTrainingState.target,
        securityRenderCheck: newSecurityRenderCheck,
        param1: newParam1,
        param2: newParam2,
        btn1Txt: newBtn1Txt,
        btn2Txt: newBtn2Txt,
        btn3Txt: newBtn3Txt,
    })
  }  

  const setSpanMsg = (point: number) => {
      const spanCss = 'p-4 text-center font-bold text-2xl border-4 rounded-3xl shadow-md sm:p-6'
      let newSpanTxt = mathsTrainingState.spanMessage
      if(point === -1){
          if(newSpanTxt === "Bravo" || newSpanTxt === "Raté" || newSpanTxt === "Go !" || (mathsTrainingState.timeLeft !== null && newSpanTxt.includes("Combien font "))){
              let operator
              if(mathsTrainingState.skill === 'additionner'){
                  operator  = '+'
              }
              newSpanTxt = [`Combien font ${mathsTrainingState.param1} ${operator} ${mathsTrainingState.param2} ?`, `${spanCss} bg-amber-400 border-amber-300`]
              mathsTrainingDispatch({
                  spanMessage: `Combien font ${mathsTrainingState.param1} ${operator} ${mathsTrainingState.param2} ?`,
                  spanCss: `${spanCss} bg-amber-400 border-amber-300`,
              })
          }
      } else if(point === 0){
        mathsTrainingDispatch({
              spanMessage: `Raté`,
              spanCss: `${spanCss} text-red-500 border-red-500`,
              questionsCounter: mathsTrainingState.questionsCounter + 1,
          })
      } else if(point === 1){
        mathsTrainingDispatch({
              spanMessage: `Bravo`,
              spanCss: `${spanCss} text-emerald-500 border-emerald-500`,
              questionsCounter: mathsTrainingState.questionsCounter + 1,
              goodAnswersCounter: mathsTrainingState.goodAnswersCounter + 1,
          })
      }
  }

  useEffect(() => {
    console.log("A")
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "À vos marques" && setTimeout(() => {
      console.log("B")
      mathsTrainingDispatch({
        spanMessage: trainingOptionsSettingsList[3].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[3].css}`,
      })
    }, 1500)
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && !mathsTrainingState.startTimer && mathsTrainingDispatch({
      startTimer: true,
    })
    if(mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && !mathsTrainingState.startTimer){
      console.log('C')
    }
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Prêt ?" && setTimeout(() => {
      console.log("D")
      mathsTrainingDispatch({
        spanMessage: trainingOptionsSettingsList[4].text,
        spanCss: `${spanCss} ${trainingOptionsSettingsList[4].css}`,
      })
    }, 1000)
    mathsTrainingState.timer && mathsTrainingState.spanMessage === "Go !" && setTimeout(() => {
      console.log("E")
      setNewTarget()
    }, 1000)
    mathsTrainingState.timer && (mathsTrainingState.spanMessage === "Bravo" || mathsTrainingState.spanMessage === "Raté") && setTimeout(() => {
      console.log("F")
      setNewTarget()
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
    if(mathsTrainingState.timer && !mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.timeLeft === 0){
      console.log('G')
    }
    if(mathsAnswerRef.current && mathsTrainingState.mode === "clavier" && mathsTrainingState.displayTimer){
      mathsAnswerRef.current.focus()
    }
  }, [mathsTrainingState.timer, mathsTrainingState.displayTimer, mathsTrainingState.startTimer, mathsTrainingState.spanMessage, mathsTrainingState.questionsCounter])

  useEffect(() => {
    console.log("UE-SpanTxt")
    setSpanMsg(-1)
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
          mathsTrainingState.limit && mathsTrainingState.timer && mathsTrainingState.displayTimer && mathsTrainingState.startTimer && mathsTrainingState.spanMessage.includes("Combien font ") && <MathsAnswer ref={mathsAnswerRef}  parentState={mathsTrainingState} dispatch={mathsTrainingDispatch} setNewTarget={setNewTarget} setSpanMsg={setSpanMsg} />
        }
      </div>
    </div>
  )
}

export default MathsTraining