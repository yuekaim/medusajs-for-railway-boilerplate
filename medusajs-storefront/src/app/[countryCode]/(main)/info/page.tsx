import {client} from '../../../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { Page as PageType } from '../../../../../sanity/types/sanity.types';
import { PortableText } from 'next-sanity';

const INFO_QUERY = groq`*[_type == "page" && name == 'Info'][0]`

export default async function Info() {
    const info = await client.fetch<PageType>(INFO_QUERY);

    return(
        <div className="content-container mt-8 text-xl">
            <PortableText
                value={info.content || []}
            />
        </div>
    )
}
