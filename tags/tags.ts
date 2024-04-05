import { fetchTags } from '../utils'

const tagsContainer = document.querySelector(
  '.mb-4.grid.grid-cols-4.gap-4'
) as Element

const { tags } = await fetchTags()

tags.forEach((tag) => {
  const tagElement = document.createElement('div')

  tagElement.className = 'rounded bg-white text-black/90 shadow-md'
  tagElement.innerHTML = `
    <div class="p-4">
      <div
        class="mb-1.5 inline-flex h-6 cursor-pointer items-center rounded-2xl bg-sky-500 text-xs text-white hover:bg-sky-700"
      >
        <span class="px-2">${tag.name}</span>
      </div>
      <p class="mb-1.5 line-clamp-4 text-sm">
        ${tag.description}
      </p>
      <p class="text-sm text-black/60">${tag.occurrenceCount} question${tag.occurrenceCount !== 1 ? 's' : ''}</p>
    </div>
  `

  tagsContainer.appendChild(tagElement)
})
