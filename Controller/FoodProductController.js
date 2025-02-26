const { Food ,Incrediant} = require('../Schema/FoodProductSchema');  

const createfood = async (req, res) => {  
    const {name,price,description,cuisine,category}=req.body
    try {  
        const foodItem = new Food({  
            name,  
            image: {  
                data: req.file.buffer,          
                contentType: req.file.mimetype 
            },  
            price ,
            description,
            cuisine,category
        });  
        
        await foodItem.save(); 
        res.status(201).json({ message: 'Food item created successfully', foodItem });  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
};  
const getfood =async(req,res)=>{
    try{
        const getdata = await Food.find()
        if(!getdata){
            return res.status(404).send("No Data Found")
        }
   return res.status(200).send(getdata)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const updatefood =async(req,res)=>{
    const {id} =req.params;
    const update =req.body
    try{
        const getdata = await Food.findByIdAndUpdate(id , update ,{
            new:'true',runValidators:"true"
        })
        if(!getdata){
            return res.status(404).send("No Data Found")
        }
   return res.status(200).send(getdata)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const deletefood =async(req,res)=>{
    const {id} =req.params;
    try{
        const getdata = await Food.findByIdAndDelete(id)
        if(!getdata){
            return res.status(404).send("No Data Found")
        }
   return res.status(200).send("Delete Successfully")
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const getfoodbyid =async(req,res)=>{
    const {id}=req.params
    try{
        const getdata = await Food.findById(id)
        if(!getdata){
            return res.status(404).send("No Data Found")
        }
   return res.status(200).send(getdata)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}

//Incrediants

const createfoodincrediant = async (req, res) => {  
    const { incrediantname, incrediantquantity } = req.body;  
    const {id}=req.params
    try {  
        const foodItems = await Food.findById(id);  

        if (!foodItems) {  
            return res.status(404).send("No Food Product Available");  
        }  

        const incre = new Incrediant({ incrediantname, incrediantquantity });  
        await incre.save();  
        foodItems.Incrediantdata.push(incre);  
        await foodItems.save();  

        res.status(201).send(foodItems);  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
};
const updatefoodincrediant =async(req,res)=>{
    const {id} =req.params;
    const update =req.body
    try{
        const getdata = await Food.findByIdAndUpdate(id , update ,{
            new:'true',runValidators:"true"
        })
        if(!getdata){
            return res.status(404).send("No Data Found")
        }
   return res.status(200).send(getdata)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
}
const deletefoodincrediant = async (req, res) => {
    const { id } = req.params;
    const {username}=req.body

   try{
    const productExists = await Incrediant.findById(id);
    if (!productExists) {
        return res.status(404).send("No product found with this ID");
    }
    const deletedProduct = await Incrediant.findByIdAndDelete(id);

    const fooddata = await Food.findOne({ name : username });
    if (fooddata && Array.isArray(fooddata.Incrediantdata)) {
           

        fooddata.Incrediantdata = fooddata.Incrediantdata.filter(
            (product) => !product._id.equals(id)
        );

        await fooddata.save();
        console.log("Updated Fooddata Incrediantdata:", fooddata.Incrediantdata);
    }

    res.status(200).send({ message: "Product deleted successfully" });

   }
    catch (err) {
        console.error("Error deleting ingredient:", err);
        res.status(500).send({ message: "Server error", error: err });
    }
};


module.exports = { createfood ,createfoodincrediant,getfood,
    deletefood,updatefood,updatefoodincrediant,
    getfoodbyid,deletefoodincrediant };