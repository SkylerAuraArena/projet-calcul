import { FC, useState } from "react"
import Button from "../Button"

const MathsTraining: FC = ({}) => {

  const [mode, setMode] = useState<String>("Clavier")

  return (
    <div className="w-full flexJIC flex-col gap-6">
      <div className="flexJIC gap-12">
        <Button title="Clavier" color="bg-emerald-400" setter={() => setMode("Clavier")}/>
        <Button title="Boutons" color="bg-amber-400" setter={() => setMode("Boutons")}/>
      </div>
      <span>{mode}</span>
      <input type="text" name="" id="" />
    </div>
  )
}

export default MathsTraining