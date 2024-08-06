// ./src/sanity/lib/queries.ts

import {groq} from 'next-sanity'

export const RELEASES_QUERY = groq`*[_type == "release"][0...12]`

export const RELEASE_QUERY = groq`*[_type == "release" && slug.current == $slug][0]{
  title, body, mainImage
}`
