import React from "react"

export const LabelContext = React.createContext();
export const LabelProvider = props => {
    const [labels,setLabels] = React.useState()
    return(
        <LabelContext.Provider value={[labels,setLabels]}>
             {props.children}
        </LabelContext.Provider>
    )
}