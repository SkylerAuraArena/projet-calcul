import { FC, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { IMathsStateProps } from '../../helpers/interfacesHelpers'
import Button from "../Button"
import { CountdownBar } from "../countdownBar/CountdownBar"

const reducer = (state: IMathsStateProps, action: Partial<IMathsStateProps>) => ({...state, ...action})

const MathsTraining: FC = () => {

  const params = useParams()
  const optionsList = [
    [10,20,30,40,50,60,70,80,90,100,1000,10000],
    [0.5,1,2,3,5,6,7,8,9,10,15,20]
  ]
  const messagesList = [
    `Jusqu'à combien voulez-vous ${params.competence} ?`,
    `Combien de temps l'exercice va-t'il durer ?`,
    'À vos marques'
  ]
  const [mathsState, mathsDispatch] = useReducer(reducer, {
      mode : "clavier",
      target: null,
      time: null,
      spanMessage: messagesList[0],
      displayTimer: false,
      startTimer: false,
  })    

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsDispatch({target: elt, spanMessage: messagesList[1]})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map(elt => <Button key={elt} title={elt.toLocaleString() + " min"} setter={() => mathsDispatch({time: elt, spanMessage: messagesList[2], displayTimer: true})} color="bg-slate-400 border-slate-300"/>)

  useEffect(() => {
    mathsState.time && mathsState.spanMessage === "À vos marques" && setTimeout(() => {
      mathsDispatch({
        spanMessage: "Prêt ?",
      })
    }, 1500)
    mathsState.time && mathsState.spanMessage === "Prêt ?" && !mathsState.startTimer && mathsDispatch({
      startTimer: true,
    })
    mathsState.time && mathsState.spanMessage === "Prêt ?" && mathsState.startTimer && setTimeout(() => {
      mathsDispatch({
        spanMessage: "Go !",
      })
    }, 2000)
  }, [mathsState])
  

  return (
    <div className="w-full flexJIC flex-col gap-12 mb-12 xl:mb-0">
      <div className="flexJIC gap-12 mt-2 sm:mt-0">
        <Button title="Clavier" color="bg-emerald-500 border-emerald-300" setter={() => mathsDispatch({mode: "clavier"})}/>
        <Button title="Boutons" color="bg-amber-400 border-amber-300" setter={() => mathsDispatch({mode: "boutons"})}/>
      </div>
      <span className="p-4 text-center font-bold text-2xl border-4 rounded-3xl border-blue-400 shadow-md sm:p-6">{mathsState.spanMessage}</span>
      <div className="flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
        { 
          !mathsState.target && !mathsState.time && navLinksTargetsList
        }
        { 
          mathsState.target && !mathsState.time && navLinksTimeList
        }
        { 
          mathsState.target && mathsState.time && mathsState.mode === "clavier" && <input type="text" name="" id="" />
        }
        { 
          mathsState.target && mathsState.time && mathsState.mode === "boutons" && <Button title="Bouton" color="bg-emerald-500 border-emerald-300" />
        }
      </div>
      {
        mathsState.target && mathsState.time && mathsState.displayTimer && <CountdownBar timer={mathsState.time} startTimer={mathsState.startTimer} />
      }
    </div>
  )
}

export default MathsTraining