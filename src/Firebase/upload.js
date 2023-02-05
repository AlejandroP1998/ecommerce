import { db } from "./config.js";
import stock from '../Data/data.json' assert{type:"json"}
import { collection, addDoc } from "firebase/firestore";

stock.forEach(item => delete item.id)

const stockRef = collection(db,'localStore')

stock.forEach(item => {
    addDoc(stockRef,item)
})