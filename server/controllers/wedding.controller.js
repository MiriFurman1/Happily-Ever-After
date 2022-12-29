import {Wedding} from "../models/wedding.model.js"
import sharp from 'sharp'
export const createNewWedding= async (req,res)=>{
    const wedding = new Wedding({...req.body,
        owner: req.user._id})
    try {
        await wedding.save()
        res.status(201).send(wedding)

    } catch (e) {
        res.status(400).send(e)
    }
}

export const getWedding= async (req,res)=>{
    try {
        const wedding = await Wedding.find({ owner: req.user._id })

        if (wedding.length===0) {
            return res.status(404).send()
        }

        res.send(wedding)
    } catch (e) {
        res.status(500).send({ error: 'Wedding not found' })
    }
}


export const updateWedding= async (req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates);
    console.log(req.user.id );
    try {
        const wedding = await Wedding.findOne({ owner: req.user.id })
        if (!wedding ) {
            return res.status(404).send({ error: 'Wedding not found' })
        }
        updates.forEach((update) => wedding [update] = req.body[update])
        await wedding.save()
        res.send(wedding )
    } catch (e) {
        res.status(400).send(e)
    }
}
export const deleteWedding= async (req,res)=>{
try{
    console.log(req.user._id);
    const wedding = await Wedding.findOneAndDelete({owner:req.user._id})

    if (!wedding) {
        res.status(404).send({ error: 'Wedding not found' })
    }
    res.send(wedding)

} catch (e) {
    res.status(500).send()
}
}


export const uploadImage =async (req, res) => {
    const eventId=req.params.eventId

    const weddingOld = await Wedding.findOne({ id: eventId });
  var images = weddingOld.images;
    // console.log(wedding);
    // console.log();
    // console.log(req.files);

    if (!req.files ) {
  return res.status(400).send({ error: 'No file was provided' });
}
console.log("milky");

// const buffer = await sharp(req.files.buffer).resize({ width: 1500, height: 1000 }).jpeg().toBuffer();
for(var i=0 ; i<req.files.length;i++){

    const buffer = await sharp(req.files[i].buffer)
      .resize({ width: 1500, height: 1000 })
      .jpeg()
      .toBuffer();
    //   console.log(buffer);
    // Add the processed image to the existing array
     images.push(buffer);
   
}
     const wedding = await Wedding.findOneAndUpdate({ id: eventId },{images:images})
  console.log(images.length);
    // wedding.images = buffer
    // console.log(wedding);
       
    res.send(wedding)
}




