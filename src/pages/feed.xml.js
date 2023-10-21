import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { projectToNavigation } from '../layouts/Navigation/projectToNavigation.const'

export async function get(context) {
  const posts = await getCollection('posts')
  return rss({
    title: projectToNavigation.about.meta.title,
    description: projectToNavigation.about.meta.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
    })),
  })
}
