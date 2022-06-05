import { FC } from 'react'
import { IButtonProps } from '../helpers/interfacesHelpers'

const Button: FC<IButtonProps> = ({ title, color, func}) => {
    
    const css = `btn ${color}`

    return (
        <button className={css} onClick={()=>func()}>{title}</button>
    )
}

export default Button