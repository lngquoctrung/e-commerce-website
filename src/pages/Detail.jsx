import React from 'react'
import ProductDetail from '../components/Product/ProductDetail'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'
import RelatedItems from '../components/Product/RelatedItems'

export const Detail = () => {
  return (
    <div>
        <Navbar/>
        <ProductDetail/>
        <RelatedItems/>
        <Footer/>
    </div>
  )
}
