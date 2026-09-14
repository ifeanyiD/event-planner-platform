import Event from "../models/event.js";


export const getEvents = async (req, res)=>{
    try {
      const events = await Event.find()
        .select("images") // only needed fields
        .sort({ createdAt: -1 })
        .limit(4);
      const imgUrl = events.map(urls => urls.images[0].url)
      res.status(201).json(imgUrl);
    } catch (error) {
        res.status.json({message : "error laoding images"})
    }
}