import React from 'react';
import Liked from "./Liked";

const Model = ({ selectedDish, showModal,dish, updateMode,favDishes,getFavourite }) => {
    if (!selectedDish) {
        return null;
    }
    return (
        <div>
        {showModal ? (
        <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-4xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg relative flex bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="">
                                <img src={selectedDish.image} alt="image"/>
                            </div>
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                                <div className="flex  rounded-md pt-10 relative w-[350px] flex-col">
                                    <div className="absolute top-7 right-1">
                                        <Liked getFavourite={getFavourite} dish={dish} favDishes={favDishes}/>
                                    </div>
                                        <p className="text-lg truncate w-48">{selectedDish.title}</p>
                                    <div className="pt-4 flex justify-center items-center w-full">
                                        <p className="bg-[#FFEDD5] rounded-2xl px-3 py text-[#A1401F]">
                                            {`${selectedDish.summa} som`}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs">Tarkibi:</p>
                                        <p className="truncate w-48 text-base">{selectedDish.text}</p>
                                    </div>
                                </div>
                                <button
                                    className="p-1 ml-auto border border-inherit text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => {
                                        updateMode(false);
                                    }}
                                >
                                    <span
                                        className="text-black h-6 w-6 text-base block outline-none focus:outline-none">X</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-20 fixed inset-0 z-40 bg-black/[0.2]"/>
        </>
            ) :null}
        </div>
    );
};


export default Model;