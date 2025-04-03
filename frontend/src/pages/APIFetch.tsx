import axios from 'axios'
import { useEffect } from 'react'



const Data = () => {
    useEffect(() => {
        respo()
    }, [])
        const token = 'github_pat_11BEWZ6LA0WvUC8YVUvue1_n03oCGdN8dmO2z0uIIotzUoC401I8uQFQaI2rukybNdBVLZJELMCrtesTeD'
    const respo = async () => {
       const res = await axios.get('https://api.github.com/organizations',
            {
                headers:{Authorization :`Bearer ${token}`}
              }
        )
        console.log(res);
    }
    return (
        <div>
            hii
        </div>
    )
    
}

export default Data