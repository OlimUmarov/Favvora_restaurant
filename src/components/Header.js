import React, {useState} from 'react';
import '../App.css'


const Header = ({onSearch,loading}) => {


    return (
        <div className="md:container md:mx-auto p-4 ">

            <div className="sd flex justify-between items-center ">
                <img src={'./img/main.png'} alt="logo" className="w-36 h-34 cursor-pointer"/>
            </div>

            <form>
                <input type="text"  disabled={loading} onChange={onSearch} placeholder='Qidirish ...'
                       className="border  border-inherit w-80 h-2 mt-4 p-4 pl-10 font-normal text-sm outline-blue-500 icon" />
            </form>

        </div>
    );
};

export default Header;