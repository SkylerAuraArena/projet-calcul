import { FC } from "react"
import { NavLink } from "react-router-dom"
import { IHomePageNavLinkProps } from "../../helpers/interfacesHelpers"

const HomePageNavLink: FC<IHomePageNavLinkProps> = ({ to= "/", title = "Un navlink de de la HomePage", css = "" }) => {

    const cssBtn = `btn ${css} transition`
    const direction = `/${to}`

    return(
        <NavLink to={direction} className={cssBtn} >
            { <span>{title}</span> }
        </NavLink>
    )
}
   
export default HomePageNavLink