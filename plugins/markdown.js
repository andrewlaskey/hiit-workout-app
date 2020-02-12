const md = require('markdown-it')()

export default ({ app }, inject) => {
  inject('md', (markdown) => md.render(markdown))
}
