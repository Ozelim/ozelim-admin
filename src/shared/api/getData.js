import { pb } from "./pocketbase"

async function getData (page, withSlider) {

  let slider = [] 

  if (withSlider) {
    slider = await pb.collection('slider').getFullList({filter: `page = '${page}'`})
  }

  const images = await pb.collection('images').getFullList({filter: `page = '${page}'`})
  const text = await pb.collection('text').getFullList({filter: `page = '${page}'`})

  return {
    slider: slider[0], 
    images: images[0], 
    text: text[0]
  }
}

export { getData }

