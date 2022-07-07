import { FC, useEffect, useRef, useState } from 'react'
import { ICountdownBarProps } from '../../helpers/interfacesHelpers'
import countdownBar from "./countdownBar.module.css"
    
export const CountdownBar: FC<ICountdownBarProps> = ({timer, startTimer, dispatch}) => {

    const timerBarRef = useRef<HTMLDivElement | null>(null)
    const timerTextRef = useRef<HTMLDivElement | null>(null)
    const [time, setTime] = useState<number>(timer + 1)
    const barCss = 'flexJIC absolute left-[47.5%] top-[11.5%] text-2xl font-bold text-white'
    
    const countDown = () => {
        startTimer && time >= 0 && setTimeout(() => {
            if (time > 0) {
                decreaseTimeBar()
            } else {
                decreaseTimeBar()
                dispatch({
                    timeLeft: 0
                })
            }
        }, 1000)
    };
    
    const decreaseTimeBar = () => {
        const percent = 100 / timer
        const actual = percent * time - percent
        if(timerBarRef.current){
            if(timerTextRef.current){
                if(actual > 50){
                    timerTextRef.current.className = `${barCss} text-white`
                } else {
                    timerTextRef.current.className = `${barCss} text-black`
                }
            }
            timerBarRef.current.style.width = actual + '%'
            setTime(time => time - 1)
            if(time <= 5){
                timerBarRef.current.style.backgroundColor = '#ff4500'
            }
            if (time === 5) {
                timerBarRef.current.style.opacity = '0.25'
            } else if (time === 4) {
                timerBarRef.current.style.opacity = '1'
            } else if (time === 3) {
                timerBarRef.current.style.opacity = '0.25'
            } else if (time === 2) {
                timerBarRef.current.style.opacity = '1'
            } else if (time === 1) {
                timerBarRef.current.style.opacity = '0.25'
            }
        }
    }

    useEffect(() => {
        countDown()
    }, [time,startTimer])

    return (
        <div id={countdownBar.timebar} className="relative w-full h-12 p-2 border-2 rounded-2xl shadow-countdownBarShadowBox">
            <div ref={timerBarRef} id={countdownBar.timebarFill} className="w-full h-full rounded-xl">
            </div>
            <span ref={timerTextRef} className={barCss}>{time >= timer ? timer : time + 1}</span>
        </div>
    )
}