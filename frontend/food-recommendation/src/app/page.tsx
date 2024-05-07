import { useState, useEffect } from 'react';
import Image from 'next/image'
import cocktailPic from "../../public/main_cocktail_pic.jpg"
import foodPic from "../../public/main_food_pic.jpg"

function Home() {

  return (
    <div className='h-fit mt-5'>

    <div className="hero bg-base-200">
    <div className="hero-content w-fit ml-auto mr-auto text-center flex">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
    </div>


    <div id='pictures' className='w-fit ml-auto mr-auto mt-0 md:flex md:flex-row'>

        <div className="card w-60 bg-base-100 shadow-xl m-4">
          <figure> <Image src={cocktailPic} height={400} width={700} alt="Picture of Cocktail"/> </figure>
          <div className="card-body">
            <h2 className="card-title">
              Cocktails!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div> 
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>

        <div className="card w-60 bg-base-100 shadow-xl m-4">
          <figure> <Image src={foodPic} height={400} width={700} alt="Picture of Cocktail"/> </figure>
          <div className="card-body">
            <h2 className="card-title">
              Food!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div> 
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>

        </div>

    </div>
  )
}

export default Home;