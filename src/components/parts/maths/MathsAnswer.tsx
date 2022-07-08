import { FC, forwardRef } from "react"
import { IMathsAnswerProps } from "../../helpers/interfacesHelpers"
import Button from "../Button"

const MathsAnswer: FC<IMathsAnswerProps> = forwardRef<HTMLInputElement, IMathsAnswerProps>(({ parentState, setSpanMsg }, ref) => {

    const handleClick = (btnTxt: string) => {
        if(parentState.target !== null){
            if (btnTxt === parentState.target.toString()) {
                setSpanMsg(1)
            } else {
                setSpanMsg(0)
            }  
        }
    }

    return (
        <>
            {
                parentState.mode === "clavier" && parentState.spanMessage !== "Prêt ?" && <input ref={ref} type="text" name="" id="" />
            }
            {
                parentState.mode === "boutons" && parentState.spanMessage !== "Prêt ?" && <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
                    <Button title={parentState.btn1Txt.toString()} color="bg-slate-400 border-slate-300" func={handleClick} />
                    <Button title={parentState.btn2Txt.toString()} color="bg-slate-400 border-slate-300" func={handleClick} />
                    <Button title={parentState.btn3Txt.toString()} color="bg-slate-400 border-slate-300 mb-3 xl:mb-0" func={handleClick} />
                </div>
            }
        </>
    )
})

export default MathsAnswer