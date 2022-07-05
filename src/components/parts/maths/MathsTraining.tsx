import { FC, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { IMathsStateProps } from '../../helpers/interfacesHelpers'
import Button from "../Button"

const reducer = (state: IMathsStateProps, action: Partial<IMathsStateProps>) => ({...state, ...action})

const MathsTraining: FC = ({}) => {

  const params = useParams()
  const optionsList = [
    [10,20,30,40,50,60,70,80,90,100,1000,10000],
    [0.5,1,2,3,5,6,7,8,9,10,15,20]
  ]
  const messagesList = [
    `Jusqu'à combien voulez-vous ${params.competence} ?`,
    `Combien de temps l'exercice va-t'il durer ?`,
    'À vous de jouer !'
  ]
  const [mathsState, mathsDispatch] = useReducer(reducer, {
    mode : "Clavier",
    target: null,
    time: null,
    spanMessage: messagesList[0],
})    

  const navLinksTargetsList = optionsList[0].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsDispatch({target: elt, spanMessage: messagesList[1]})} color="bg-slate-400 border-slate-300"/>)
  const navLinksTimeList = optionsList[1].map(elt => <Button key={elt} title={elt.toLocaleString()} setter={() => mathsDispatch({time: elt, spanMessage: messagesList[2]})} color="bg-slate-400 border-slate-300"/>)

  return (
    <div className="w-full flexJIC flex-col gap-12">
      <div className="flexJIC gap-12">
        <Button title="Clavier" color="bg-emerald-500 border-emerald-300" setter={() => mathsDispatch({mode: "Clavier"})}/>
        <Button title="Boutons" color="bg-amber-400 border-amber-300" setter={() => mathsDispatch({mode: "Boutons"})}/>
      </div>
      <span className="p-6 font-bold text-2xl border-4 rounded-3xl border-blue-400 shadow-md">{mathsState.spanMessage}</span>
      <div className="flexJIC gap-6">
        { 
          !mathsState.target && !mathsState.time && navLinksTargetsList
        }
        { 
          mathsState.target && !mathsState.time && navLinksTimeList
        }
        { 
          mathsState.target && mathsState.time && <input type="text" name="" id="" />
        }
      </div>
    </div>
  )
}

export default MathsTraining