import { ReactNode } from "react";

export interface IButtonProps {
    title: string,
    color: string,
}

export interface IChildrenProps {
    children?: ReactNode,
}

export interface IEmptyProps {}