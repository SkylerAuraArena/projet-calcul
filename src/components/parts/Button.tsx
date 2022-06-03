import { FC } from 'react'
import { IButtonProps } from '../helpers/interfacesHelpers'

const Button: FC<IButtonProps> = ({ title, color}) => {
    
    const css = `w-full px-4 py-4 ${color} rounded text-white text-center text-2xl`

    return (
        <button className={css}>{title}</button>
    )
}

export default Button