import {Wedding} from "../models/wedding.model.js"
import formidable from 'formidable'

export const addImage=(req,res)=>{
const form=new formidable();

form.parse(req,(error,fields,files)=>{
    console.log(files)
})
}