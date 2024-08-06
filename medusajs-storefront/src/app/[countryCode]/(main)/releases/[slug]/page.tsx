import type { Release as ReleaseType } from '../../../../../../sanity/types/sanity.types';
import { groq } from 'next-sanity';
import {client} from '../../../../../../sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '../../../../../../sanity/lib/image';

const RELEASE_QUERY = groq`*[_type == "release" && slug.current == $slug][0]`

export default async function Release() {
    const release = await client.fetch<ReleaseType>(RELEASE_QUERY);
    return(
        <div>
            <div>
                hello
                {/* <Image
                    src={urlFor(release.covorImage?.asset).url()}
                    alt={release.covorImage?.caption}
                /> */}
            </div>
            <div></div>
        </div>
    )
}
