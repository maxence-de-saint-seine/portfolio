const grid = document.getElementById('grid')
const selectCategoriesContainer = document.getElementById('selectCategoriesContainer')

if(selectCategoriesContainer) loadCategories()
loadArticles(grid.getAttribute('category'))

async function loadCategories() {
    let result = await fetch('ressources/logos.json')
    let json = await result.json()
    let listCategories = []

    for(let category in json) {
        listCategories.push(category)
    }

    let x = await createCategoriesLinks(listCategories)
    selectCategoriesContainer.appendChild(x)
}

async function loadArticles(category) {
    let result = await fetch('ressources/articles.json')
    let json = await result.json()

    json.forEach(article => {
        if (article.categories.indexOf(category) != -1 || category == 'all') {
            displayArticle(article)
        }
    });
}

async function displayArticle(article) {
    let item = document.createElement('a')
    item.setAttribute('class', 'item')
    item.setAttribute('href', article.link)
    item.setAttribute('target', '_blank')

    let img = document.createElement('img')
    img.setAttribute('src', article.imgSrc)
    item.appendChild(img)

    let title = document.createElement('div')
    title.setAttribute('class', 'article-title')
    title.innerText = article.title
    item.appendChild(title)

    let description = document.createElement('div')
    description.setAttribute('class', 'article-description')
    description.innerText = article.description
    item.appendChild(description)

    let categoriesDiv = document.createElement('div')
    categoriesDiv.setAttribute('class', 'article-categories')

    categoriesLinks = await createCategoriesLinks(article.categories)
    categoriesDiv.appendChild(categoriesLinks)
    item.appendChild(categoriesDiv)

    grid.appendChild(item)

}

async function createCategoriesLinks(categories) {
    let categoriesLinks = document.createElement('div')

    for (let i = 0; i < categories.length; i++) {
        let categoryLink = document.createElement('a')
        categoryLink.setAttribute('class', 'article-category')
        categoryLink.setAttribute('href', 'projects/?category=' + categories[i])
        categoryLink.setAttribute('title', categories[i])


        let logoImg = await getLogo(categories[i])
        if (logoImg) {
            let categoryLogo = document.createElement('img')
            categoryLogo.setAttribute('src', logoImg)
            categoryLogo.setAttribute('class', 'article-category-logo')
            categoryLink.appendChild(categoryLogo)
        }
        else {
            categoryLink.innerText = categories[i]
        }

        categoriesLinks.appendChild(categoryLink)
    }
    return categoriesLinks
}

async function getLogo(name) {
    let result = await fetch('ressources/logos.json')
    let json = await result.json()
    if (json[name]) return json[name]
    return null
}

/*
{
    "title": "",
    "imgSrc": "/projects/images/.png",
    "categories": ["mise en avant" ],
    "link": "/project/",
    "description": ""
},
*/