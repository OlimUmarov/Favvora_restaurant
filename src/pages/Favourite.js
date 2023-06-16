import React, {useEffect, useState} from 'react';
import {Link,useLocation } from "react-router-dom";

const Favourite = () => {
    const [favDish,setFavDish] = useState([])

    useEffect(()=>{
        const newFav = JSON.parse(localStorage.getItem('fav'))
        setFavDish(newFav)
    },[])


    function deleteFav(dishFav) {
      const newList = favDish.filter(dish=> dish.title !== dishFav)
        setFavDish(newList);
        localStorage.setItem("fav", JSON.stringify(newList));
    }

    return (

        <div className='flex justify-center items-center mx-auto gap-y-4 gap-x-10 pt-26 flex-wrap pt-32 overflow-y-scroll h-[90vh]'>
            <div>
                <Link to="/">
                    <button className="border rounded-md px-4 py-2 absolute top-4 left-4 back-icon mt-4 pl-10">MENU</button>
                </Link>
            </div>
                        {
                            favDish.map(dish=>(
                                    <div key={dish.id} className="flex p-2 border border-inherit rounded-md w-80 h-22 items-center relative">
                                        <img  src={dish.image} alt="image" className="rounded-full w-14 h-14 object-cover object-center "/>
                                        <div className=" text-base flex-col justify-center items-center pl-4 gap-2">
                                            <p className="truncate w-48">{dish.title}</p>
                                            <p>{dish.summa}</p>
                                            <p className="truncate w-48 text-xs">{dish.text}</p>
                                        </div>
                                        <div className=" absolute w-6 h-6 right-2 top-4 cursor-pointer remove-icon border border-inherit rounded-md p-4"
                                        onClick={()=> deleteFav(dish.title)}>
                                        </div>
                                    </div>
                            ))

                        }

            </div>


    );
};

export default Favourite;