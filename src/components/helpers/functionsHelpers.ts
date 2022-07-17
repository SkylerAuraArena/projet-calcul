import { Dispatch } from "react"
import { IMathsTrainingStateProps } from "./interfacesHelpers"

export function setNewMathsTrainingTarget (mathsTrainingState: IMathsTrainingStateProps, mathsTrainingDispatch: Dispatch<Partial<IMathsTrainingStateProps>>) {
    const targetLimit = mathsTrainingState.limit ? mathsTrainingState.limit : 0 
    let newParam1 = Math.floor(Math.random() * targetLimit + 1)
    let newParam2 = Math.floor(Math.random() *  targetLimit + 1)
    let newTarget
    let newBtn1Txt
    let newBtn2Txt
    let newBtn3Txt
    let newSecurityRenderCheck
    let newRandomSkill
    let btnOperand1 = Math.floor(Math.random() *  targetLimit + 1)
    let btnOperand2 = Math.floor(Math.random() *  targetLimit + 1)
    let btnOperand3 = Math.floor(Math.random() *  targetLimit + 1)
    let btnOperand4 = Math.floor(Math.random() *  targetLimit + 1)
    let btnOperand5 = Math.floor(Math.random() *  targetLimit + 1)
    let btnOperand6 = Math.floor(Math.random() *  targetLimit + 1)
    while (mathsTrainingState.securityRenderCheck === newSecurityRenderCheck) {
      newSecurityRenderCheck = Math.floor(Math.random() *  99999) 
    }
    const selectBtnToTarget = Math.floor(Math.random() * 3 + 1)
    if (mathsTrainingState.skill === 'aléatoire') {
      const RNG = Math.floor(Math.random() * 4 + 1)
      if (RNG === 1) {
        newRandomSkill = '+'
        while (btnOperand1 + btnOperand2 === btnOperand3 + btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === btnOperand5 + btnOperand6 || btnOperand3 + btnOperand4 === btnOperand5 + btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === btnOperand5 + btnOperand6 || btnOperand3 + btnOperand4 === btnOperand5 + btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === newParam1 + newParam2 || btnOperand3 + btnOperand4 === newParam1 + newParam2 || btnOperand5 + btnOperand6 === newParam1 + newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 + newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 + btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 + btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 + btnOperand6
      } else if(RNG === 2) {
        newRandomSkill = '-'
        while (btnOperand1 - btnOperand2 === btnOperand3 - btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === btnOperand5 - btnOperand6 || btnOperand3 - btnOperand4 === btnOperand5 - btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === btnOperand5 - btnOperand6 || btnOperand3 - btnOperand4 === btnOperand5 - btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === newParam1 - newParam2 || btnOperand3 - btnOperand4 === newParam1 - newParam2 || btnOperand5 - btnOperand6 === newParam1 - newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 - newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 - btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 - btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 - btnOperand6
      } else if(RNG === 3) {
        newRandomSkill = '*'
        while (btnOperand1 * btnOperand2 === btnOperand3 * btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === btnOperand5 * btnOperand6 || btnOperand3 * btnOperand4 === btnOperand5 * btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === btnOperand5 * btnOperand6 || btnOperand3 * btnOperand4 === btnOperand5 * btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === newParam1 * newParam2 || btnOperand3 * btnOperand4 === newParam1 * newParam2 || btnOperand5 * btnOperand6 === newParam1 * newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 * newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 * btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 * btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 * btnOperand6
      } else if(RNG === 4) {
        newRandomSkill = '/'
        while (btnOperand1 / btnOperand2 === btnOperand3 / btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === btnOperand5 / btnOperand6 || btnOperand3 / btnOperand4 === btnOperand5 / btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === btnOperand5 / btnOperand6 || btnOperand3 / btnOperand4 === btnOperand5 / btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === newParam1 / newParam2 || btnOperand3 / btnOperand4 === newParam1 / newParam2 || btnOperand5 / btnOperand6 === newParam1 / newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = parseFloat((newParam1 / newParam2).toFixed(2))
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget :  parseFloat((btnOperand1 / btnOperand2).toFixed(2))
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget :  parseFloat((btnOperand3 / btnOperand4).toFixed(2))
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget :  parseFloat((btnOperand5 / btnOperand6).toFixed(2))
      }
    } else if(targetLimit && mathsTrainingState.skill === 'additionner'){
        while (btnOperand1 + btnOperand2 === btnOperand3 + btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === btnOperand5 + btnOperand6 || btnOperand3 + btnOperand4 === btnOperand5 + btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === btnOperand5 + btnOperand6 || btnOperand3 + btnOperand4 === btnOperand5 + btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 + btnOperand2 === newParam1 + newParam2 || btnOperand3 + btnOperand4 === newParam1 + newParam2 || btnOperand5 + btnOperand6 === newParam1 + newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 + newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 + btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 + btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 + btnOperand6
    } else if(targetLimit && mathsTrainingState.skill === 'soustraire'){
        while (btnOperand1 - btnOperand2 === btnOperand3 - btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === btnOperand5 - btnOperand6 || btnOperand3 - btnOperand4 === btnOperand5 - btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === btnOperand5 - btnOperand6 || btnOperand3 - btnOperand4 === btnOperand5 - btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 - btnOperand2 === newParam1 - newParam2 || btnOperand3 - btnOperand4 === newParam1 - newParam2 || btnOperand5 - btnOperand6 === newParam1 - newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 - newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 - btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 - btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 - btnOperand6
    } else if(targetLimit && mathsTrainingState.skill === 'multiplier'){
        while (btnOperand1 * btnOperand2 === btnOperand3 * btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === btnOperand5 * btnOperand6 || btnOperand3 * btnOperand4 === btnOperand5 * btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === btnOperand5 * btnOperand6 || btnOperand3 * btnOperand4 === btnOperand5 * btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 * btnOperand2 === newParam1 * newParam2 || btnOperand3 * btnOperand4 === newParam1 * newParam2 || btnOperand5 * btnOperand6 === newParam1 * newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = newParam1 * newParam2
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget : btnOperand1 * btnOperand2
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget : btnOperand3 * btnOperand4
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget : btnOperand5 * btnOperand6
    } else if(targetLimit && mathsTrainingState.skill === 'diviser'){
        while (btnOperand1 / btnOperand2 === btnOperand3 / btnOperand4) {
          btnOperand3 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand4 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === btnOperand5 / btnOperand6 || btnOperand3 / btnOperand4 === btnOperand5 / btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === btnOperand5 / btnOperand6 || btnOperand3 / btnOperand4 === btnOperand5 / btnOperand6) {
          btnOperand5 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
          btnOperand6 = targetLimit && Math.floor(Math.random() *  targetLimit + 1)
        }
        while (btnOperand1 / btnOperand2 === newParam1 / newParam2 || btnOperand3 / btnOperand4 === newParam1 / newParam2 || btnOperand5 / btnOperand6 === newParam1 / newParam2) {
          newParam1 = Math.floor(Math.random() * targetLimit + 1)
          newParam2 = Math.floor(Math.random() *  targetLimit + 1)
        }
        newTarget = parseFloat((newParam1 / newParam2).toFixed(2))
        newBtn1Txt = selectBtnToTarget === 1 ? newTarget :  parseFloat((btnOperand1 / btnOperand2).toFixed(2))
        newBtn2Txt = selectBtnToTarget === 2 ? newTarget :  parseFloat((btnOperand3 / btnOperand4).toFixed(2))
        newBtn3Txt = selectBtnToTarget === 3 ? newTarget :  parseFloat((btnOperand5 / btnOperand6).toFixed(2))
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
        randomSkill: newRandomSkill,
    })
}  

export function setMathsSpanMsg(mathsTrainingState: IMathsTrainingStateProps, mathsTrainingDispatch: Dispatch<Partial<IMathsTrainingStateProps>>, status: number) {
    const spanCss = mathsTrainingState.defaultSpanCss
    let newSpanTxt = mathsTrainingState.spanMessage
    if(status === -1){
        if(newSpanTxt[0].includes("Bravo") || newSpanTxt[0].includes("Raté") || newSpanTxt[0] === "Go !" || (mathsTrainingState.timeLeft !== null && newSpanTxt[0].includes("Combien font "))){
            let operator
            if(mathsTrainingState.skill === 'additionner'){
                operator  = '+'
            } else if(mathsTrainingState.skill === 'soustraire'){
              operator  = '-'
            } else if(mathsTrainingState.skill === 'multiplier'){
              operator  = '*'
            } else if(mathsTrainingState.skill === 'diviser'){
              operator  = '/'
            } else if(mathsTrainingState.skill === 'aléatoire'){
              operator  = mathsTrainingState.randomSkill
            }
            newSpanTxt = [`Combien font ${mathsTrainingState.param1} ${operator} ${mathsTrainingState.param2} ?`, '']
            mathsTrainingDispatch({
                spanMessage: [`Combien font ${mathsTrainingState.param1} ${operator} ${mathsTrainingState.param2} ?`,''],
                spanCss: `${spanCss} bg-amber-400 border-amber-300`,
            })
        }
    } else if(status === 0){
      mathsTrainingDispatch({
            spanMessage: ["Raté, c'était ",`${mathsTrainingState.target}`],
            spanCss: `${spanCss} text-red-500 border-red-500`,
            questionsCounter: mathsTrainingState.questionsCounter + 1,
        })
    } else if(status === 1){
      mathsTrainingDispatch({
            spanMessage: ["Bravo, c'était ",`${mathsTrainingState.target}`],
            spanCss: `${spanCss} text-emerald-500 border-emerald-500`,
            questionsCounter: mathsTrainingState.questionsCounter + 1,
            goodAnswersCounter: mathsTrainingState.goodAnswersCounter + 1,
        })
    }
}