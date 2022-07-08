import { FC } from 'react'
import { IButtonProps } from '../helpers/interfacesHelpers'

const Button: FC<IButtonProps> = ({ title, color, func, setter}) => {
    
    const css = `btn transition ${color}`
    const handleClick = () => {
        func && func(title)
        setter && setter([`Entraînement : ${title}`, title])
    }

    return (
        <button className={css} title={title} onClick={() => handleClick()}>{title}</button>
    )
}

export default Button