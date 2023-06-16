import React from 'react';

const Liked = ({favDishes,dish,getFavourite}) => {
    return (
        <div>
            <div className={favDishes.some(favdish=> favdish.title === dish.title)?"absolute w-6 h-6  right-2 top-4 cursor-pointer liked-dark":"absolute w-6 h-6  right-2 top-4 cursor-pointer liked"}
                 onClick={() => {
                     getFavourite(dish.title)
                 }}>
            </div>
        </div>
    );
};

export default Liked;