async function addCountries(region) {
    let link = `https://restcountries.eu/rest/v2/region/${region}`
    let result = await fetch(link)
    let json = await result.json()
    console.log(json)

    const list = document.getElementById('list')
    json.forEach(country => {
        let btn = document.createElement('button')
        btn.setAttribute('onclick', `redirect('${country.alpha2Code}')`)
        btn.innerText = country.name
        list.appendChild(btn)
    })
}

addCountries('')