import { useState, createContext, useContext, useMemo, FC, useReducer } from "react"
import { IChildrenProps, IMainContextProps, IMainContextStateProps } from '../components/helpers/interfacesHelpers'

const MainContext = createContext<IMainContextProps | null>(null)

const reducer = (state: IMainContextStateProps, action: Partial<IMainContextStateProps>) => ({...state, ...action})

const MainContextProvider: FC<IChildrenProps> = ({ children }) => {
  const [mainContextState, mainContextDispatch] = useReducer(reducer, {
    appTitleText: 'Bienvenue, choisissez la matière',
    displayTrainingTitle : true,
    trainingSpanText: '',
})

  const contextValues: IMainContextProps = useMemo(
    () => ({
      mainContextState,
      mainContextDispatch
    }),
    [
      mainContextState,
    ]
  )

  return <MainContext.Provider value={contextValues}>{children}</MainContext.Provider>
}

export default MainContextProvider


export const useMainContext = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error(
      "useMainContext doit être utilisé dans le context adéquat"
    )
  }

  return context
}