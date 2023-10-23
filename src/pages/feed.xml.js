import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { projectConfigs } from '../projectConfigs.const'

export async function get(context) {
  const posts = await getCollection('posts')
  return rss({
    title: projectConfigs.about.meta.title,
    description: projectConfigs.about.meta.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
    })),
  })
}
