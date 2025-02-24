import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p className='text-colorDarkGray'>
            Contact <span className='font-semibold text-colorDarkGray'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold text-colorDarkGray'>{listing.name.toLowerCase()}</span>
          </p>
          <p className='text-colorDarkGray font-semibold'>Contact Number: <span className='text-colorPrimary'>{landlord.phoneNumber}</span></p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            onFocus={(e) => (e.target.style.outline = 'none')}
            className='bg-cyan-50 w-full border p-3 rounded-lg shadow-md'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-colorPrimary text-white text-center p-3 uppercase rounded-lg hover:opacity-85 transition-all'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}