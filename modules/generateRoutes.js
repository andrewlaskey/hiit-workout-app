import generateRoutes from './../plugins/generateRoutes'
export default function generateRoutesModule() {
  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    const extendRoutes = await generateRoutes()

    extendRoutes.forEach(route => {
      routes.push(route)
    })
  })
}
