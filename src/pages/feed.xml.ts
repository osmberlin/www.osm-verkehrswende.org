import rss from '@astrojs/rss'
import { getProjects } from '@layouts/utils/getProjects'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const projects = await getProjects()
  const rootProject = projects?.find((p) => p.name.slug === 'root')!

  const posts = await getCollection('posts')

  return rss({
    title: rootProject.meta.title,
    description: rootProject.meta.description ?? '',
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      link: `${post.data.project}/posts/${post.id}/`,
      customData: `<language>${post.data.language || 'de'}</language>`,
    })),
  })
}
