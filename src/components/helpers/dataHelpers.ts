import { IButtonProps } from "./interfacesHelpers";

export let skillList:Array<IButtonProps> = [{
    to:'maths',
    title:'Mathématiques',
    color:'bg-amber-400 border-amber-300',
    func: () => {}
}, {
    to:'francais',
    title:'Français',
    color:'bg-blue-500 border-blue-300',
    func: () => {}
}, {
    to:'dactylo',
    title:'Dactylographie',
    color:'bg-slate-400 border-slate-300',
    func: () => {}
}, {
    to:'langues',
    title:'Langues étrangères',
    color:'bg-emerald-500 border-emerald-300',
    func: () => {}
}]

export let mathsOptionsList:Array<IButtonProps> = [{
    to:'maths-aleatoires',
    title:'Aléatoire',
    color:'bg-slate-400 border-slate-300',
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