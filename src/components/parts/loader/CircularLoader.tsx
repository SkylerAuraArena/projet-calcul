import { FC } from 'react'
import loader from "./circularLoader.module.css"
    
export const Loader: FC = () => {
    return (
        <div className={loader.loader}>
            <svg className={loader.circular} viewBox="25 25 50 50">
            <circle className={loader.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
        </div>
    )
}
