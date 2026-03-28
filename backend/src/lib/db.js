import mongoose from "mongoose";
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
export const connectDB=async ()=>{
  try{
    const conn=await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGODB CONNECTED:",conn.connection.host);


  }catch(error){
    console.error("Error connection to MONGODB:",error)
    process.exit(1);

  }
}