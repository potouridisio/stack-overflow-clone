import { fetchTags } from '../utils'

const mainContainer = document.querySelector('.grow.p-6') as Element
const tagsContainer = document.querySelector(
  '.mb-4.grid.grid-cols-4.gap-4'
) as Element

const { tags, currentPage, totalPages } = await fetchTags()

tags.forEach((tag) => {
  const tagElement = document.createElement('div')

  tagElement.className = 'rounded bg-white text-black/90 shadow-md'
  tagElement.innerHTML = `
    <div class="p-4">
      <div
        class="mb-1.5 inline-flex h-6 cursor-pointer items-center rounded bg-sky-500/10 text-xs text-sky-500 hover:bg-sky-500/15"
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

function createPaginationElement(currentPage: number, totalPages: number) {
  const paginationElement = document.createElement('nav')

  paginationElement.className = 'float-right'
  paginationElement.innerHTML = `
    <ul class="flex flex-wrap items-center">
      <li>
        <button
          class="pointer-events-none mx-0.5 inline-flex h-8 min-w-8 cursor-default items-center justify-center rounded border border-black/20 px-1.5 text-sm text-black/90 opacity-40 hover:bg-black/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="-mx-2 h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
      <li>
        <button
          class="mx-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded border border-black/20 px-1.5 text-sm text-black/90 hover:bg-black/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="-mx-2 h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  `

  const pagesContainer = paginationElement.querySelector(
    '.flex.flex-wrap.items-center'
  ) as Element
  const nextButtonElement = pagesContainer.lastElementChild as Element

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  pages.forEach((page) => {
    const pageElement = document.createElement('li')
    const isCurrentPage = page === currentPage

    pageElement.innerHTML = `
      <button
        class="mx-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded border ${isCurrentPage ? 'border-rose-600/50' : 'border-black/20'}${isCurrentPage ? ' bg-rose-600/10' : ''} px-1.5 text-sm ${isCurrentPage ? 'text-rose-600 hover:bg-rose-600/25' : 'text-black/90 hover:bg-black/5'}"
      >
        ${page}
      </button>
    `

    nextButtonElement.insertAdjacentElement('beforebegin', pageElement)
  })

  return paginationElement
}

const paginationElement = createPaginationElement(currentPage, totalPages)

mainContainer.appendChild(paginationElement)
