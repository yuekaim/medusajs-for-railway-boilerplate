import React from 'react';
import {client} from '../../../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { Release } from '../../../../../sanity/types/sanity.types';
import Link from 'next/link';

const RELEASES_QUERY = groq`*[_type == "release"]`

export default async function Releases() {
  const releases = await client.fetch<Release[]>(RELEASES_QUERY);
  return (
    <div>
      <div className='border-b-2 border-black grid grid-cols-4 text-xl px-8 align-super uppercase pt-2'>
          <div>Release</div>
          <div>Type</div>
          <div>Artist</div>
          <div>Release Date</div>
      </div>
      {releases.map((release) => (
        <Link href={'releases/' + release.slug?.current} key={release.slug?.current}>
          <div className='border-b-2 border-black grid grid-cols-4 text-xl px-8 hover:bg-grey-20 py-4'>
              <div>{release.name}</div>
              <div>{release.type}</div>
              <div>{release.artist}</div>
              <div>{release.releaseDate}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
