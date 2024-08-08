import type { Release as ReleaseType } from '../../../../../../sanity/types/sanity.types';
import { groq } from 'next-sanity';
import {client} from '../../../../../../sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '../../../../../../sanity/lib/image';
import { PortableText } from 'next-sanity';
import { Container } from '@medusajs/ui';

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
        <div className='release-container px-4 sm:px-0 sm:m-4 sm:flex sm:mt-8'>
            <div className='sm:mr-8 mb-8 sm:mb-0 sm:sticky sm:top-0'>
                <img
                    src={urlFor(release?.covorImage?.asset?._ref || '').url()}
                    alt={release?.covorImage?.caption || ''}
                    width={600}
                    height={600}
                    className='shadow-elevation-card-rest'
                />
            </div>
            <div className='text-xl'>
                <div className='pb-4'>
                    <div className='pb-4'>{release?.name}</div>
                    <div>{release?.type}</div>
                    <div>{release?.artist}</div>
                    <div>{release?.releaseDate}</div>
                </div>
                <PortableText
                    value={release?.info || []}
                />
            </div>
        </div>
    )
}
