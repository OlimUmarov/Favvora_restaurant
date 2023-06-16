import React, {useEffect, useState} from 'react'
import axios from "axios";
import Header from "../components/Header";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import Model from "../components/Model";
import Liked from "../components/Liked";

function Home() {
    const baseUrl = 'https://api.favvora-urgench.uz/site/menu/'
    const [menu,setMenu] = useState([])
    const [filteredDishes,setFilteredDishes] = useState([])
    const [favDishes,setFavDishes] = useState([])

    const [showModal, setShowModal] = useState(false);
    const[loading,setLoading]= useState(false)
    const [dishNotFound,setDishNotFound] = useState(false)

    const [searchInput,setSearchInput] = useState('')
    const [searchDishes,setSearchDishes] = useState([])

    const [parentCategories,setParentCategories] = useState([])
    const [childCategories,setChildCategories] = useState([])
    const [subCategories,setSubCategories] = useState([])
    const [selectedDish, setSelectedDish] = useState(null);


    const [catId,setCatId] = useState(0)
    const [subCatId,setSubCatId] = useState(0)


    // FUNCTION TO GET ALL DISHES

    async function getMenu() {
        setLoading(true)
        await axios.get(`${baseUrl}`)
            .then(res=> {
                setMenu(res.data)
            })
        setLoading(false)
    }

    // FUNCTION TO GET ALL CATEGORIES AND TO FILTER IT

    async function getCategories(){
        setLoading(true)
        await axios.get(`${baseUrl}category/`)
            .then(res=>{
                let parentList = []
                let childList = []
                res.data.map(category=>{
                    if(category.parent == null && category.title !== "Yangi"){
                        parentList.push(category)
                    }
                    else{
                        childList.push(category)
                    }
                })
                setParentCategories(parentList)
                setChildCategories(childList)
            })
        setLoading(true)
    }

    // FUNCTION TO HANDLE WITH SUBCATEGORIES

    function handleSubCategory(parentID){
        const saved = childCategories.filter(subCat=> subCat.parent === parentID)
        if(saved[0].title!== "Barchasi"){
            setSubCategories(saved)
        }
        else{
            setSubCategories([])
        }
    }

    // FUNCTION TO SET FILTERED DISHES WHEN PARENT CATEGORY IS CLICKED

    function filteredMenu(){
        const filtered = menu.filter((dish) => dish.parent_category.id === catId);
        setFilteredDishes(filtered);
        setSearchDishes(filtered)
    }

    function filteredSubMenu() {
        const filteredSub = menu.filter((dish)=> dish.category.id === subCatId)
        setFilteredDishes(filteredSub)
        setSearchDishes(filteredSub)
    }

    // FUNCTION TO SET FAVOURITE DISHES

    function getFavourite(dishTitle) {
     let newFavDish = menu.filter(dish=> dish.title === dishTitle)

        if(favDishes.some(dish=> dish.title === dishTitle)){
            setFavDishes(prevDishes=> prevDishes.filter(dish=> dish.title !== dishTitle))
            localStorage.setItem('fav',JSON.stringify(favDishes.filter(dish=> dish.title !== dishTitle)))
        } else {
            setFavDishes(prevDishes=> [...prevDishes,...newFavDish])
            localStorage.setItem('fav',JSON.stringify([...favDishes,...newFavDish]))
        }
    }

    // FUNCTION TO GET INPUT

    function handleSearch(event) {
        let input = event.target.value.trim().toLowerCase()

        setSearchInput(input)
        if (input) {
            const filtered = searchDishes.filter(item =>
                item.title.toLowerCase().includes(input)
            )
            if(filtered.length) {
                setDishNotFound(false)
                setFilteredDishes(filtered)
            } else {
                setDishNotFound(true)
            }
        } else {
            setFilteredDishes(searchDishes)
        }
    }

    function updateMode(modal){
         setShowModal(modal)
        console.log("worked" + modal,showModal)
    }


    // useEFFECTS

    useEffect(()=>{
        getCategories()
        getMenu()
        const favFromLocalStorage = JSON.parse(localStorage.getItem("fav"));
        if (favFromLocalStorage) setFavDishes(favFromLocalStorage);

    },[])

    useEffect(()=>{
        filteredMenu()
    },[catId])

    useEffect(()=>{
        filteredSubMenu()
    },[subCatId])

    useEffect(()=>{
        filteredMenu()
        // filteredSubMenu()
    },[menu])

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem('catId'))
        setCatId(saved)

        const savedSub = JSON.parse(localStorage.getItem('subCatID'))
        setSubCatId(savedSub)

    },[filteredDishes])



    return (
        <div className='app relative '>

            {/*HEADER SECTION*/}

            <div className="flex ">
                <Header onSearch={handleSearch} loading={loading}/>
                <button className="w-16 h-16 flex items-center justify-center relative">
                    <Link to={{pathname: "/favourite",}} className="w-10 h-10 cursor-pointer border rounded-md border-inherit flex items-center justify-center ">
                        <img src='../img/favorite-icon.png'  alt="" className="w-6 h-6 "/>
                    </Link>
                    <Outlet />
                    <div className="absolute right-0 top-0 bg-red-500 rounded-full w-6 h-6 text-white text-xs flex items-center justify-center " >
                        {favDishes.length}</div>
                </button>
            </div>

            {/* {/*PARENT CATEGORIES*/}

            <div className="flex flex-col gap-2 min-h-[80px] " role="group">
            <div className=" md:flex flex flex-wrap gap-2 justify-center items-center">
                <button className="border border-inherit px-6 py-1 text-sm cursor-pointer h-7.5 focus:bg-blue-500 focus:text-white"  onClick={()=> {
                    setFilteredDishes(menu)
                } }>Hammasi</button>
                {
                    parentCategories.map(category=>(
                        <div className="flex flex-wrap flex-col gap-2">
                            <div className=" flex flex-wrap gap-2">
                                    <div key={category.title} className={`${catId === category.id ? "bg-blue-500 text-white" : ""}`}   onClick={()=> {
                                            handleSubCategory(category.id)
                                            filteredMenu()
                                        localStorage.setItem('catId',JSON.stringify(category.id))
                                        }}>
                                        <button type='button' disabled={loading}  className="border border-inherit px-6 py-1 cursor-pointer text-sm ">{category.title}</button>
                                        </div>
                            </div>
                        </div>
                    ))}
            </div>

                {/*CHILD CATEGORIES*/}

                            <div className="flex flex-wrap justify-center items-center">
                                {subCategories? (
                                    <div className="flex flex-wrap gap-2 ">
                                        {
                                            subCategories.map(category => (
                                                <div key={category.title}  onClick={()=> {
                                                    filteredSubMenu()
                                                    localStorage.setItem('subCatID',JSON.stringify(category.id))
                                                }}>
                                                    <button type="button" className=" border border-inherit px-6 py-1 cursor-pointer text-sm  focus:bg-blue-500 focus:text-white">{category.title}</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ): null
                                }
                            </div>
            </div>

            {/*MENU SECTION*/}

            {loading? (
                <div role={loading} className="text-center absolute top-[70%] left-[50%]">
                    <svg aria-hidden="true"
                         className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ): null}

            <div className="overflow-y-scroll h-[55vh]">
                <div className="flex justify-center  mx-auto max-w-[90%]  gap-y-4 pt-2 gap-x-10 flex-wrap">
                    {dishNotFound?(
                            <div>
                                <h1>Dish not found</h1>
                            </div>
                        ):
                        filteredDishes.map(dish => (
                            <>
                                <div className="flex p-2 border border-inherit rounded-md w-80 h-18 items-center relative ">
                                    <div className="max-w-12 max-h-12 object-cover cursor-pointer">
                                        <img src={dish.image} alt="image" onClick={() => {
                                            setSelectedDish(dish);
                                            setShowModal(true);
                                        }} className="rounded-full w-12 h-12 "/>
                                    </div>
                                    <div className=" text-sm flex-col justify-center items-center pl-4 gap-2 ">
                                        <p className="truncate w-48">{dish.title}</p>
                                        <p>{dish.summa}</p>
                                        <p className="truncate w-48 text-xs">{dish.text}</p>
                                    </div>
                                    <Liked getFavourite={getFavourite} dish={dish} favDishes={favDishes}/>
                                </div>
                                <Model selectedDish={selectedDish} showModal={showModal} updateMode={updateMode} getFavourite={getFavourite} dish={dish} favDishes={favDishes}/>
                            </>

                        ))

                    }
                </div>

            </div>

        </div>


    );
}

export default Home;

// <Menu menu={menu} update={update} getFavourite={getFavourite}/>
// <Categories categories={categories} updateMenu={updateMenu} />
