import { IButtonProps, ITrainingOptionsSettingsProps } from "./interfacesHelpers";

export const skillList: Array<IButtonProps> = [{
    to:'maths',
    title:'Mathématiques',
    color:'bg-amber-400 border-amber-300',
    func: () => {}
// }, {
//     to:'francais',
//     title:'Français',
//     color:'bg-blue-500 border-blue-300',
//     func: () => {}
// }, {
//     to:'dactylo',
//     title:'Dactylographie',
//     color:'bg-slate-500 border-slate-300',
//     func: () => {}
// }, {
//     to:'langues',
//     title:'Langues étrangères',
//     color:'bg-emerald-500 border-emerald-300',
//     func: () => {}
}]

export const mathsOptionsList: Array<IButtonProps> = [{
    to:'maths-aleatoires',
    title:'aléatoire',
    color:'bg-slate-500 border-slate-300',
    func: () => {}
}, {
    to:'additions',
    title:'additionner',
    color:'bg-emerald-500 border-emerald-300',
    func: () => {}
}, {
    to:'soustractions',
    title:'soustraire',
    color:'bg-blue-500 border-blue-300',
    func: () => {}
}, {
    to:'multiplications',
    title:'multiplier',
    color:'bg-amber-400 border-amber-300',
    func: () => {}
}, {
    to:'divisions',
    title:'diviser',
    color:'bg-red-500 border-red-300',
    func: () => {}
}]

export const trainingOptionsSettingsList: Array<ITrainingOptionsSettingsProps> = [{
    text:"Sélectionner l'opérande maximum des opérations",
    css:'border-blue-500',
}, {
    text:"Combien de temps l'exercice va-t'il durer ?",
    css:'border-blue-500',
}, {
    text:'À vos marques',
    css:'border-red-500 text-red-500',
}, {
    text:'Prêt ?',
    css:'border-amber-400 text-amber-500',
}, {
    text:'Go !',
    css:'border-emerald-500 text-emerald-500',
}, {
    text:'Termps écoulé',
    css:'border-red-300 bg-red-500 text-white',
}]

export const optionsList: number[][] = [
    [10,20,30,40,50,60,70,80,90,100,1000,10000],
    [0.5,1,2,3,5,10,15,20]
  ]