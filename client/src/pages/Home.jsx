import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingIems.jsx';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto text-lg'>

        <h1 className='text-colorPrimary font-bold text-3xl lg:text-6xl mb-2 mt-8
        '>
          Find your next <span className='text-slate-700'>dream</span>
          <br />
          space with <span className='text-slate-700'>YHOME</span>
        </h1>
        <div className='text-colorDarkGray'>
        <span className='font-bold text-colorPrimary'>Welcome to YHOME, </span>where finding your ideal living space is just a click away!
        Whether you're searching for a cozy room to rent, a modern apartment to lease, or your forever home to own, <span className='font-semibold text-colorPrimary'>YHOME </span>
         brings you a variety of options to match your lifestyle and budget.
         <br/>
         <br/>
          Our easy-to-use platform connects you directly with property owners, ensuring a transparent and hassle-free experience. Browse, compare, and contact – all in one place!
        </div>
        <Link
          to={'/search'}
          className='text-colorPrimary font-bold hover:underline'
        >
          Let's get Started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',

                }}
                className='h-[400px] w-[900px] mx-auto border shadow-2xl rounded-3xl'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-colorDarkGray'>Recent offers</h2>
              <Link className='text-sm text-colorPrimary hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-colorDarkGray'>Recent places for rent</h2>
              <Link className='text-sm text-colorPrimary hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-colorDarkGray'>Recent places for sale</h2>
              <Link className='text-sm text-colorPrimary hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property Owner Registration Section */}
<div className='bg-cyan-50 py-12'>
  <div className='max-w-6xl mx-auto text-center flex flex-col items-center gap-6 px-6'>
    <h2 className='text-4xl font-bold text-colorPrimary'>Are You a Property Owner?</h2>
    <p className='text-colorDarkGray text-lg'>
      List your property on <span className='font-semibold text-colorPrimary'>YHOME</span> and reach thousands of potential tenants and buyers effortlessly!  
      Our platform empowers you to showcase your property, manage inquiries, and connect directly with interested customers – all from the comfort of your home.  
    </p>
    <p className='text-colorDarkGray text-lg'>
      Whether you have a room for rent, an apartment to lease, or a home to sell, <span className='font-semibold text-colorPrimary'>YHOME</span> offers a simple, efficient, and transparent way to market your property.  
      Let us help you make your property stand out with high-quality listings and seamless customer connections.
    </p>
    <div className='flex flex-col items-center gap-4'>
      <Link
        to={'/create-listing'}
        className='bg-colorPrimary text-white px-6 py-3 rounded-md text-lg font-medium hover:opacity-85 transition'
      >
        Register Your Property Now
      </Link>
      <p className='text-colorPrimary text-sm'>
        It takes just a few minutes to create a listing. Start showcasing your property today!
      </p>
    </div>
  </div>
</div>

    </div>
  );
}