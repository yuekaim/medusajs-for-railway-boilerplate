import {client} from './client';
import imageUrlBuilder from '@sanity/image-url'
import { Image } from 'sanity';

const builder = imageUrlBuilder(client)

export function urlFor(source:string) {
  return builder.image(source)
}
