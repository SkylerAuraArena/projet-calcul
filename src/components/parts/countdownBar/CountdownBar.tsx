import { FC, useEffect, useRef, useState } from 'react'
import { ICountdownBarProps } from '../../helpers/interfacesHelpers'
import countdownBar from "./countdownBar.module.css"
    
export const CountdownBar: FC<ICountdownBarProps> = ({timer, startTimer, dispatch}) => {

    const timerBarRef = useRef<HTMLDivElement | null>(null)
    const hoursTextRef = useRef<HTMLDivElement | null>(null)
    const minutesTextRef = useRef<HTMLDivElement | null>(null)
    const secondsTextRef = useRef<HTMLDivElement | null>(null)
    const [time, setTime] = useState<number>(timer + 1)
    const [maxTime, setMaxTime] = useState<Array<string>>(['','',''])
    const [timeLeft, setTimeLeft] = useState<Array<string>>(['0h','0m','0s'])

    function countdownTimeStart(){
            var timeLeft = time * 1000
            var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
            setTimeLeft([`${hours}h`,`${minutes}m`,`${seconds}s`])
            maxTime[2] === "" && setMaxTime([`${hours}h`,`${minutes}m`,`${seconds - 1}s`])
    }
    
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
    }
    
    const decreaseTimeBar = () => {
        const percent = 100 / timer
        const actual = percent * time - percent
        if(timerBarRef.current){
            if(hoursTextRef.current && minutesTextRef.current && secondsTextRef.current){
                if(actual > 44){
                    hoursTextRef.current.className = `text-white`
                } else {
                    hoursTextRef.current.className = `text-black`
                }
                if(actual > 54){
                    minutesTextRef.current.className = `text-white`
                } else {
                    minutesTextRef.current.className = `text-black`
                }
                if(actual > 64){
                    secondsTextRef.current.className = `text-white`
                } else {
                    secondsTextRef.current.className = `text-black`
                }
            }
            timerBarRef.current.style.width = actual + '%'


            setTime(time => time - 1)
            countdownTimeStart()

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
        <div id={countdownBar.timebar} className="relative w-full h-14 p-2 border-2 rounded-2xl shadow-countdownBarShadowBox">
            <div ref={timerBarRef} id={countdownBar.timebarFill} className="w-full h-full rounded-xl">
            </div>
            <span className="flexJIC absolute left-[37.5%] top-[20%] text-2xl font-bold gap-2">
                <span ref={hoursTextRef}>{time >= timer ? maxTime[0] : timeLeft[0]}</span>
                <span ref={minutesTextRef}>{time >= timer ? maxTime[1] : timeLeft[1]}</span>
                <span ref={secondsTextRef}>{time >= timer ? maxTime[2] : timeLeft[2]}</span>
            </span>
        </div>
    )
}