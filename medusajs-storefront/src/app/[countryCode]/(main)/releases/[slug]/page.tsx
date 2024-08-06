import type { Release as ReleaseType } from '../../../../../../sanity/types/sanity.types';
import { groq } from 'next-sanity';
import {client} from '../../../../../../sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '../../../../../../sanity/lib/image';
import { PortableText } from 'next-sanity';

const RELEASE_QUERY = groq`*[_type == "release" && slug.current == $slug][0]`

interface PageProps {
    params: {
        slug: string;
    };
}

async function fetchRelease(slug: string): Promise<ReleaseType | null> {
    return await client.fetch<ReleaseType>(RELEASE_QUERY, { slug });
}

export default async function ReleasePage({ params }: PageProps) {
    const { slug } = params;
    const release = await fetchRelease(slug);
    return(
        <div className='m-4 grid grid-cols-2'>
            <div>
                <img
                    src={urlFor(release?.covorImage?.asset?._ref || '').url()}
                    alt={release?.covorImage?.caption || ''}
                    width={600}
                    height={600}
                    className='shadow-elevation-card-rest'
                />
            </div>
            <div className='text-xl'>
                <div>{release?.name}</div>
                <div>{release?.artist}</div>
                <div>{release?.releaseDate}</div>
                <PortableText
                    value={release?.info || []}
                />
            </div>
        </div>
    )
}
