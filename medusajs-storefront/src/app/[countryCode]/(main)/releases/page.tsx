import React from 'react';
import {client} from '../../../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { Release } from '../../../../../sanity/types/sanity.types';
import Link from 'next/link';

const RELEASES_QUERY = groq`*[_type == "release"]`

export default async function Releases() {
  const releases = await client.fetch<Release[]>(RELEASES_QUERY);
  return (
    <div className='mx-4 sm:mx-8'>
      <div className='border-b-2 border-black flex justify-between sm:grid sm:grid-cols-4 sm:px-8 align-super uppercase pt-8'>
          <div>Release</div>
          <div className='hidden sm:block'>Type</div>
          <div>Artist</div>
          <div className='hidden sm:block'>Date</div>
      </div>
      {releases.map((release) => (
        <Link href={'releases/' + release.slug?.current} key={release.slug?.current}>
          <div className='border-b-2 border-black flex justify-between sm:grid sm:grid-cols-4 sm:px-8 hover:bg-black hover:text-white py-2 text-xl duration-300'>
              <div>{release.name}</div>
              <div className='hidden sm:block'>{release.type}</div>
              <div>{release.artist}</div>
              <div className='hidden sm:block'>{release.releaseDate}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
