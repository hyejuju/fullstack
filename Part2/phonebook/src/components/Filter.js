import React from "react";

const Filter = ({filterName, setFilterName}) => {
    return(
        <p>filter shown with <input value={filterName} onChange={e => setFilterName(e.target.value)}/></p>
    )
}

export default Filter