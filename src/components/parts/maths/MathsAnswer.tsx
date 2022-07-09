import { FC, forwardRef, useEffect, useRef } from "react"
import { useForm, SubmitHandler, UseFormRegister, Path } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IMathsAnswerProps } from "../../helpers/interfacesHelpers"
import Button from "../Button"

const schema = yup.object({
    mathsAnswerInput: yup.number().required(),
}).required()

interface IFormValues {
    mathsAnswerInput: string,
}

const MathsAnswer: FC<IMathsAnswerProps> = (({ parentState, parentDispatch, setSpanMsg }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
        resolver: yupResolver(schema)
    })
    const mathsAnwserInputRef = useRef<HTMLInputElement | null>(null);
    const onSubmit: SubmitHandler<IFormValues> = data => handleClick(data.mathsAnswerInput)
    const { ref, ...rest } = register('mathsAnswerInput');

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
                parentState.mode === "clavier" && parentState.spanMessage !== "Prêt ?" && <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...rest} name="mathsAnswerInput" id="mathsAnswerInput" placeholder="Votre réponse ?" ref={(e) => {
                            ref(e) 
                            mathsAnwserInputRef.current = e 
                        }} />
                        <p>{errors.mathsAnswerInput?.message}</p>
                        <input type="submit" />
                    </form>
                </>
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