import { useState,createContext } from "react"

export const LabelContext = createContext();

export const LabelProvider = props => {

    const [labels,setLabels] = useState()
    
    return(
        <LabelContext.Provider value={[labels,setLabels]}>
             {props.children}
        </LabelContext.Provider>
    )
}