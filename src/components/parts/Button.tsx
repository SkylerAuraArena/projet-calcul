import { FC, ReactElement } from 'react';

type ButtonProps = {
    title: string,
    color: string,
}

const Button: FC<ButtonProps> = ({title, color}): ReactElement => {

    const css = `w-full px-4 py-4 ${color} rounded text-white text-center text-2xl`

    return(
        <button className={css}>{title}</button>
    )
}

export default Button