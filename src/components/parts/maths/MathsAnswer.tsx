import { FC, useEffect, useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMathsAnswerProps } from "../../helpers/interfacesHelpers"
import Button from "../Button"

const schema = yup.object({
    mathsAnswerInput: yup.number().required("Il faut soumettre une réponse"),
}).required()

interface IFormValues {
    mathsAnswerInput: string,
}

const MathsAnswer: FC<IMathsAnswerProps> = (({ parentState, parentDispatch, setSpanMsg }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
        resolver: yupResolver(schema)
    })
    const mathsAnwserInputRef = useRef<HTMLInputElement | null>(null)
    const onSubmit: SubmitHandler<IFormValues> = data => handleClick(data.mathsAnswerInput)
    const { ref, ...rest } = register('mathsAnswerInput')

    const handleClick = (btnTxt: string) => {
        if(parentState.target !== null){
            if (btnTxt.toString() === parentState.target.toString()) {
                setSpanMsg(parentState, parentDispatch, 1)
            } else {
                setSpanMsg(parentState, parentDispatch, 0)
            }  
        }
    }

    useEffect(() => {
        if(mathsAnwserInputRef.current && parentState.mode === "clavier" && parentState.displayTimer){
            mathsAnwserInputRef.current.focus()
        }
    }, [parentState])
    
    return (
        <>
            {
                parentState.mode === "clavier" && parentState.spanMessage[0] !== "Prêt ?" && <>
                    <form className="w-full flexJIC flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <input role="presentation" autoComplete="off" {...rest} name="mathsAnswerInput" id="mathsAnswerInput" placeholder="Votre réponse ?" className="w-full p-4 text-2xl rounded-3xl outline-none shadow-xl font-semibold text-neutral-400" ref={(e) => {
                            ref(e) 
                            mathsAnwserInputRef.current = e 
                        }} />
                        <span className="w-full flex justify-start items-center">
                            <p className="w-full ml-4 text-2xl text-red-500">{errors.mathsAnswerInput && "Votre réponse doit être un nombre."}</p>
                        </span>
                    </form>
                </>
            }
            {
                parentState.mode === "boutons" && parentState.spanMessage[0] !== "Prêt ?" && <div className="w-full flexJIC flex-row gap-6 flex-wrap xl:flex-nowrap">
                    <Button title={parentState.btn1Txt.toString()} color="bg-slate-400 border-slate-300" func={handleClick} />
                    <Button title={parentState.btn2Txt.toString()} color="bg-slate-400 border-slate-300" func={handleClick} />
                    <Button title={parentState.btn3Txt.toString()} color="bg-slate-400 border-slate-300 mb-3 xl:mb-0" func={handleClick} />
                </div>
            }
        </>
    )
})

export default MathsAnswer