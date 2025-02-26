const express= require("express")
const {Vendor ,VendorProduct} = require('../Schema/VendorSchema')

const createvendor = async(req,res)=>{
  const {vendorName,email,mobileNumber,location} = req.body;
try{
    const vendordata =await Vendor.findOne({vendorName})
    if(vendordata){
        return res.status(404).send("Already vendor name exist try other name")
    }
   const postdata =  new Vendor({vendorName,email,mobileNumber,location})
   await postdata.save()
   return res.status(201).send(postdata)

}
catch(err){
    res.status(500).send(err.message)
}

}

const getvendor = async(req,res)=>{
try{
    const getdata = await Vendor.find()
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

const individualvendor=async(req,res)=>{
    const {id}=req.params
 try{
    const getdata = await Vendor.findById(id)
    if(!getdata)
    {
        return res.status(404).send("No Data Found")
    }
    return res.status(200).send(getdata)
 }
 catch(err)
 {
    return res.status(500).send(err.message)
 }
}

const updatevendor=async(req,res)=>{
    const update = req.body
    const {id}=req.params

    try{
 const updatedata = await Vendor.findByIdAndUpdate(id , update ,{
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

const deletevendor =async(req,res)=>{
    const {id}=req.params
try{
    const deletedata = await Vendor.findByIdAndDelete(id)

    if(!deletedata){
        return res.status(404).send("no data founded")
    }
    res.status(201).send(deletedata)
   
}
catch(err){
    return res.status(500).send(err)

}

}

// vendor product

const createvendorproduct = async(req,res)=>{
    const {vendorName,vendorProduct,price} = req.body;
    try{

        const vendordata = await Vendor.findOne({vendorName}) 
       const postdata =  new VendorProduct({vendorProduct,price})
       await postdata.save()

       vendordata.Products.push(postdata)
       await vendordata.save()


       res.status(201).send(postdata)
    
    }
    catch(err){
        res.status(500).send(err)
    }

}

const getproducts =async(req,res)=>{
    const {id}=req.params

    const vendordata = await VendorProduct.findById(id)
    res.status(200).send(vendordata)
}

const updatevendorproduct = async (req, res) => {
    const { username, vendorProduct, price } = req.body;
    const { id } = req.params;

    try {
        const updatedProduct = await VendorProduct.findByIdAndUpdate(id, { vendorProduct, price }, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).send("No product found");
        }

        const vendor = await Vendor.findOne({ vendorName: username });

        if (vendor) {
            vendor.Products = vendor.Products.map((product) =>
                product._id.toString() === id
                    ? { ...product, vendorProduct, price } 
                    : product
            );

            await vendor.save();
        }

        res.status(200).send({ message: "Product updated successfully", updatedProduct });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
const deleteVendorProduct = async (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    try {
       

        const productExists = await VendorProduct.findById(id);
        if (!productExists) {
            return res.status(404).send("No product found with this ID");
        }

        const deletedProduct = await VendorProduct.findByIdAndDelete(id);

        const vendor = await Vendor.findOne({ vendorName: username });

        if (vendor && Array.isArray(vendor.Products)) {
           

            vendor.Products = vendor.Products.filter(
                (product) => !product._id.equals(id)
            );

            await vendor.save();
            console.log("Updated Vendor Products:", vendor.Products);
        }

        res.status(200).send({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).send(err.message);
    }
};


module.exports={createvendor,getvendor,updatevendor,
    deletevendor,createvendorproduct,updatevendorproduct,getproducts,individualvendor, deleteVendorProduct }