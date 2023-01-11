import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='bg-light text-center text-black '>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:&nbsp;
        <a className='text-black' href='https://oit-gules.vercel.app/'>
        App Developed by OSMB
        </a>
      </div>
    </MDBFooter>
  );
}