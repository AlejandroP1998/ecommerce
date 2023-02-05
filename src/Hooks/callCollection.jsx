import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";


const callCollection = (coleccion, dependencias = [], querys = null) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        /* Realizamos la llamada a firebase con el metodo collection(constante_database, nombre de la coleccion) */
        const collectionRef = collection(db,coleccion)
        /* Realizamos la peticion asincronica  donde indicamos lo que se desea buscar */
        const q = querys 
            ? query(collectionRef,...querys)
            : collectionRef
        getDocs(q)
            .then((resp)=>{
                setData(resp.docs.map((element)=>{
                    return({
                        ...element.data(),
                        id: element.id
                    })
                }))
            })
            .finally(()=>{
                setLoading(false)
            })

    },dependencias)
    return {
        data,
        loading
    }
}

export default callCollection;