import { useState } from "react";


function useFilter(convertedCompanies){

    const[table, setTable]=useState("")
    const[branch, setBranch]=useState("")
    const[service, setService]=useState("")
    const[employ, setEmploy]=useState("")
    const[om, setOm]=useState("")
    const[from, setFrom]=useState("")
    const[to, setTo]=useState("")
    const[status, setStatus]=useState("")
    const[version, setVersion]=useState("")

    //filtro  

   const filteredCompanies = convertedCompanies.filter((company) => {
    return(

    company.table.toLowerCase().includes(table.toLowerCase()) &&
    company.branch.toLowerCase().includes(branch.toLowerCase())&&
    company.service.toLowerCase().includes(service.toLowerCase())&&
    company.company.toLowerCase().includes(employ.toLowerCase())&&
    company.om.toString().includes(om)&&
    company.from.toString().includes(from)&&
    (to === "" || (company.to && company.to.includes(to)))&&
    company.status.toLowerCase().includes(status.toLowerCase())&&
    company.version.toString().includes(version)

    )
    
   });
    
    return {
    filteredCompanies,
    filters:{
    table,
    setTable,
    branch,
    setBranch, 
    service, 
    setService,
    employ,
    setEmploy,
    om,
    setOm,
    from,
    setFrom,
    to,
    setTo,
    status,
    setStatus,
    version,
    setVersion
    }
   }

    

}export default useFilter