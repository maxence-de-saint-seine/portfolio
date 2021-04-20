async function test() {

    let link = `https://restcountries.eu/rest/v2/all?fields=name;subregion`
    let result = await fetch(link)
    let json = await result.json()
    console.log(json)

    let list = [];
    let list2 = []

    json.forEach(country => {
        if (list.indexOf(country.subregion) == -1) {
            list.push(country.subregion)
        }
        if (country.subregion == '') {
            list2.push(country.name)
        }
    });
    console.log(list)
    console.log(list2)

}
test()