import React from 'react'
import { Link } from 'react-router-dom'
// import img from '../assets/images/founderImg.png'

export default function About() {
  return (
    <div className='py-20 px-4 pl-20 pr-20 mx-auto flex flex-col gap-4 text-colorDarkGray text-lg'>
      <h1 className='font-bold text-2xl lg:text-4xl mt-10'>About <span className='text-colorPrimary'>YHOME</span></h1>
      <p className='mb-4'>Welcome to YHOME, a modern real estate platform designed to connect property
        owners and seekers seamlessly. Whether you’re a homeowner looking to list your property or a customer searching for
        the perfect room or house, YHOME makes the process effortless and efficient.</p>

      <div className='flex flex-col gap-2 mb-4'>
        <h2 className=' font-bold text-colorPrimary'>What makes YHOME unique?</h2>
        <p>At YHOME, we believe in simplicity and convenience. Our platform allows:</p>
        <ul className='flex flex-col gap-1'>
          <li>
            <span className='font-semibold text-colorPrimary'>• Property Owners </span>
            to easily upload property details, including images, descriptions, and contact information, making it accessible to a wide audience.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>• Customers </span>
            to explore a diverse range of properties, view detailed information, and directly connect with property owners without intermediaries.
          </li>
        </ul>
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <h2 className='font-bold text-colorPrimary'>Why Choose YHOME?</h2>
        <ul className='flex flex-col gap-2'>
          <li>
            <span className='font-semibold text-colorPrimary'>Wide Selection of Properties:</span>
            From budget-friendly rooms to spacious homes, our listings cater to various needs and preferences.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>Direct Connections:</span>
            Skip the middleman! Customers can contact property owners directly through the platform for inquiries or visits.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>User-Friendly Interface:</span>
            A simple, intuitive platform that ensures a hassle-free experience for both owners and customers.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>Transparency:</span>
            Clear property details, pricing, and contact information make decision-making easier.
          </li>
        </ul>
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <h2 className='font-bold text-colorPrimary'>Our Mission</h2>
        <p>
          Our mission is to bridge the gap between property owners and seekers by creating a transparent, user-friendly
          platform where everyone can find their ideal living space.
        </p>
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <h2 className='font-bold text-colorPrimary'>How YHOME works</h2>
        <ul className='flex flex-col gap-2'>
          <li>
            <span className='font-semibold text-colorPrimary'>For Owners:</span>
            Create an account, upload your property details, and reach potential tenants or buyers effortlessly.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>For Customers:</span>
            Browse through our listings, compare properties, and contact owners directly to schedule visits or ask questions.
          </li>
          <li>
            <span className='font-semibold text-colorPrimary'>Fast and Secure:</span>
            All interactions happen directly between users, ensuring quick and reliable communication.
          </li>
        </ul>
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <h2 className='font-bold text-colorPrimary'>
          Your Journey Starts Here
        </h2>
        <p>
          Whether you’re a property owner or a seeker, YHOME is here to make your real estate experience as smooth and straightforward as possible.
        </p>
      </div>
    </div>
  )
}