import fs, { readFile, readFileSync } from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import glob from 'glob'
import fetch from 'node-fetch'

const getOutputFilename = (filename, outPath, extesionToRemove) => {
	const newfilename = path.basename(filename).replace(extesionToRemove, '.html')
	const outFilename = path.join(outPath, newfilename)
	return outFilename
}

const saveFile = (filename, contents) => {
	const dir = path.dirname(filename)
	mkdirp.sync(dir)
	fs.writeFileSync(filename, contents)
}

const templatize = (template, infos) => {
	var fileTemplatized = template
		.replace('<!-- MAP -->', infos.svg)
		.replace('<!-- NAME -->', infos.name)
		.replace('<!-- CODE -->', infos.alpha2Code)
		.replace('<!-- CAPITAL -->', infos.capital)
		.replace('<!-- SUBREGION -->', infos.subregion);
	
	return fileTemplatized
}

const getMapInfos = (filename, infos) => {
	const mapCode = getMapCode(filename)

	var map = {}
	for (var i = 0; i < infos.length; i++){
		if (infos[i]['alpha2Code'] == mapCode) {
			map = infos[i];
		}
	}
	
	console.log('Map name = ' + map.name)
	map.svg = fs.readFileSync(filename, 'utf8')
	return map
}

const getMapCode = (filename) => {
	const file = fs.readFileSync(filename, 'utf8')
	const search = '<path id="'
	const index = file.indexOf(search) + search.length
	const code = file.slice(index, index + 2)

	console.log('Map code = ' + code)
	return code
}



const main = () => {
	const srcPath = path.resolve('src');
	const outPath = path.resolve('public/map')

	const template_map = fs.readFileSync(path.join(srcPath, 'template_map.html'), 'utf8')
	const template_menu = fs.readFileSync(path.join(srcPath, 'template_menu.html'), 'utf8')
	const infos = JSON.parse(fs.readFileSync(path.join(srcPath, 'infos.json'), 'utf8'))

	const filenames = glob.sync(srcPath + '/maps/**/*.svg')
	const extesionToRemove = 'Low.svg'

	filenames.forEach((filename) => {
		const mapInfos = getMapInfos(filename, infos)
		console.log('Done getting map info for ' + mapInfos.name)

		const fileTemplatized = templatize(template_map, mapInfos)
		const outFilename = getOutputFilename(filename, outPath, extesionToRemove)
		
		saveFile(outFilename, fileTemplatized)
		console.log(`📝 ${outFilename}\n`)
	})

	console.log('Done!')
}

main()