import type { Release as ReleaseType } from '../../../../../../sanity/types/sanity.types';
import { groq } from 'next-sanity';
import {client} from '../../../../../../sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '../../../../../../sanity/lib/image';
import { GetStaticProps } from 'next';

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
        <div>
            <div>
                hello
                {/* <Image
                    src={urlFor(release.covorImage?.asset).url()}
                    alt={release.covorImage?.caption}
                    width={500}
                    height={500}
                /> */}
            </div>
            <div></div>
        </div>
    )
}
