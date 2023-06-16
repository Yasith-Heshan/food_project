import {NextResponse} from "next/server";
import connect from "@/utils/db";
import Order from "@/models/order";

export const GET = async (request)=>{
    try{
        await connect();

        const orders = await Order.find({
        });
        return await new NextResponse(JSON.stringify(orders), {status:200});
    }catch (error){
        return new NextResponse("Database Error",{status: 500})
    }
}

export const POST = async (request)=>{
    const {name, phoneNumber,university, orderItems,orderDate} = await request.json();
    await connect();
    const newOrder = new Order(
        {
            name, phoneNumber,university, orderItems,orderDate
        }
    );
    try{
        await  newOrder.save();
        return new NextResponse("Order has been created", {
            status: 201,
        })
    }catch (error){
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}
