import { IButtonProps } from "./interfacesHelpers";

export let skillList:Array<IButtonProps> = [{
    to:'maths',
    title:'Mathématiques',
    color:'bg-yellow-500',
    func: () => {}
}, {
    to:'francais',
    title:'Français',
    color:'bg-blue-500',
    func: () => {}
}, {
    to:'dactylo',
    title:'Dactylographie',
    color:'bg-slate-500',
    func: () => {}
}, {
    to:'langues',
    title:'Langues étrangères',
    color:'bg-green-500',
    func: () => {}
}]

export let mathsOptionsList:Array<IButtonProps> = [{
    to:'maths-aleatoires',
    title:'Aléatoire',
    color:'bg-slate-500',
    func: () => {}
}, {
    to:'additions',
    title:'Additions',
    color:'bg-green-500',
    func: () => {}
}, {
    to:'soustractions',
    title:'Soustractions',
    color:'bg-blue-500',
    func: () => {}
}, {
    to:'multiplications',
    title:'Multiplications',
    color:'bg-yellow-500',
    func: () => {}
}, {
    to:'divisions',
    title:'Divisions',
    color:'bg-red-500',
    func: () => {}
}]