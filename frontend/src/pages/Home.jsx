import React from 'react'
import Navbar from '../components/Home/Navbar'
import HeroSection from '../components/Home/HeroSection'
import BrowseByCategory from '../components/Home/BrowseByCategory'
import BestSellingProducts from '../components/Home/BestSellingProducts'
import ExploreOurProducts from '../components/Home/ExploreOurProducts'
import Features from '../components/Home/Features'
import Footer from '../components/Home/Footer'

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <BrowseByCategory/>
        <BestSellingProducts/>
        <ExploreOurProducts/>
        <Features/>
        <Footer/>
    </div>
  )
}
