import { FC, useEffect, useReducer, useRef } from 'react'
import { ICountdownBarProps, ICountdownBarStateProps } from '../../helpers/interfacesHelpers'
import countdownBar from "./countdownBar.module.css"

const reducer = (state: ICountdownBarStateProps, action: Partial<ICountdownBarStateProps>) => ({...state, ...action})
    
export const CountdownBar: FC<ICountdownBarProps> = ({timer, startTimer}) => {

    const timerBarRef = useRef<HTMLDivElement | null>(null)
    const timerTextRef = useRef<HTMLDivElement | null>(null)
    const [countdownBarState, countdownBarDispatch] = useReducer(reducer, {
        time : timer + 1,
    }) 
    const barCss = 'flexJIC absolute left-[47.5%] top-[11.5%] text-2xl font-bold text-white'
    
    const countDown = () => {
        startTimer && countdownBarState.time >= 0 && setTimeout(() => {
            if (countdownBarState.time >= 0) {
                decreaseTimeBar()
            }
        }, 1000)
    };
    
    const decreaseTimeBar = () => {
        const percent = 100 / timer
        const actual = percent * countdownBarState.time - percent
        if(timerBarRef.current){
            if(timerTextRef.current){
                if(actual > 40){
                    timerTextRef.current.className = `${barCss} text-white`
                } else {
                    timerTextRef.current.className = `${barCss} text-black`
                }
            }
            timerBarRef.current.style.width = actual + '%'
            countdownBarDispatch({time: countdownBarState.time - 1})
            if(countdownBarState.time <= 5){
                timerBarRef.current.style.backgroundColor = '#ff4500'
            }
            if (countdownBarState.time === 5) {
                timerBarRef.current.style.opacity = '0.25'
            } else if (countdownBarState.time === 4) {
                timerBarRef.current.style.opacity = '1'
            } else if (countdownBarState.time === 3) {
                timerBarRef.current.style.opacity = '0.25'
            } else if (countdownBarState.time === 2) {
                timerBarRef.current.style.opacity = '1'
            } else if (countdownBarState.time === 1) {
                timerBarRef.current.style.opacity = '0.25'
            }
        }
    }

    useEffect(() => {
        countDown()
    }, [countdownBarState.time,startTimer])

    return (
        <div id={countdownBar.timebar} className="relative w-full h-12 p-2 border-2 rounded-2xl shadow-countdownBarShadowBox">
            <div ref={timerBarRef} id={countdownBar.timebarFill} className="w-full h-full rounded-xl">
            </div>
            <span ref={timerTextRef} className={barCss}>{countdownBarState.time >= timer ? timer : countdownBarState.time + 1}</span>
        </div>
    )
}