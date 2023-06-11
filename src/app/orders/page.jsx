"use client"
import OrderCard from "@/components/OrderCard/OrderCard";
import useSWR from "swr";
import axios from "axios";

// const getData = async ()=>{
//     await connect();
//     const today = new Date();
//     // today.setUTCHours(0, 0, 0, 0);
//     today.setHours(0);
//     today.setMinutes(0);
//     today.setSeconds(0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     console.log(today, tomorrow);
//     const orders = await Order.find({
//         createdAt: { $gte: today, $lt: tomorrow }
//     });
//     return orders;
// }

const AcceptedOrders = () => {
    // const orders = await getData();
    const fetcher = async (...args) => {
        const response = await axios.get('api/order')
        return response.data;
    }

    const {data, error, isLoading} = useSWR('/api/order', fetcher);
    console.log(data,error,isLoading);




    return (
        <>
            {
                isLoading && <div>Loading...</div>
            }
            {
                error && <div>Error</div>
            }
            {
               data && data.map(
                    (order,index)=>{
                        const orderJson = JSON.parse(JSON.stringify(order));
                        return <OrderCard key={index} id={index} order={orderJson}/>
                    }
                )
            }
        </>
    );
}

export default AcceptedOrders;