const express= require("express")
const {Stock,History} = require('../Schema/StockSchema')


const createstock = async (req, res) => {  
    try {  
        console.log("Received Data:", req.body); 

        const { productName, category, quantity, vendor } = req.body;  

        if (!productName || !category || !quantity || !vendor) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const timestamp = Date.now();  
        const date = new Date(timestamp).toLocaleDateString(); 
        const time = new Date(timestamp).toLocaleTimeString();

        let product = await Stock.findOne({ productName });  
      
        if (product) { 
            product.quantity += quantity;  
            await product.save();  
            return res.status(200).send(product); 
        } else {  
            const postdata = new Stock({   
                productName,   
                category,   
                quantity,   
                vendor,
                date,
                time
            });

            await postdata.save();  
            return res.status(201).send(postdata);  
        }  
    } catch (err) {  
        console.error("Error Details:", err); // Log actual error
        res.status(500).json({ error: err.message || "An error occurred while processing the request." });  
    }  
};


const getstock = async(req,res)=>{
try{
    const getdata = await Stock.find()
    if(!getdata)
    {
        return res.status(404).send("No Data Found")
    }
    return res.status(200).send(getdata)


}
catch(err){
    res.status(500).send(err)
}

}

const getstockbyid = async(req,res)=>{
    const {id} =req.params
    try{
        const getdata = await Stock.findById(id)
        if(!getdata)
        {
            return res.status(404).send("No Data Found")
        }
        return res.status(200).send(getdata)
    
    
    }
    catch(err){
        res.status(500).send(err)
    }
    
    }

const updatestock=async(req,res)=>{
    const update = req.body
    const {id}=req.params

    try{
 const updatedata = await Stock.findByIdAndUpdate(id , update ,{
        new:"true" ,runValidators:"true"
    })
 if(!updatedata)
 {
    return res.status(404).send("no data founded")
 }
 res.status(201).send(updatedata)
    }
    catch(err){
        return res.status(500).send(err)
    }
}

const deletestock =async(req,res)=>{
    const {id}=req.params
try{
    const deletedata = await Stock.findByIdAndDelete(id)

    if(!deletedata){
        return res.status(404).send("no data founded")
    }
    res.status(201).send(deletedata)
   
}
catch(err){
    return res.status(500).send(err)

}

}

const createstockhistory = async (req, res) => {  
    const { productName, category, quantity, vendor  } = req.body;  
    try {  
        const timestamp = Date.now();  
        const date = new Date(timestamp).toLocaleDateString(); 
        const time = new Date(timestamp).toLocaleTimeString();
        const postdata = {   
            productName,   
            category,   
            quantity,   
            vendor,
            date: date,
        time:time       };   

        let historyDoc = await History.findOne(); 

        if (!historyDoc) {  
            historyDoc = new History();  
        }  

        historyDoc.stockHistory.push(postdata);  
        await historyDoc.save();  

        return res.status(200).send(historyDoc);  
   
    } catch (err) {  
        console.error(err);   
        res.status(500).send({ error: "An error occurred while processing the request." });  
    }  
};

const getstockhistory = async(req,res)=>{
    try{
        const getdata = await History.find()
        if(!getdata)
        {
            return res.status(404).send("No Data Found")
        }
        return res.status(200).send(getdata)
    
    
    }
    catch(err){
        res.status(500).send(err)
    }

}
 const deletestockhistory = async(req,res)=>{
    const {id}=req.params
    try{
        const deletedata = await History.findByIdAndDelete(id)
    
        if(!deletedata){
            return res.status(404).send("no data founded")
        }
        res.status(201).send(deletedata)
       
    }
    catch(err){
        return res.status(500).send(err)
    
    }
 }



module.exports={createstock,getstock,getstockbyid,updatestock,deletestock,createstockhistory,getstockhistory,deletestockhistory}