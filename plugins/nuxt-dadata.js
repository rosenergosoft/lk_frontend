import dadata from './src/dadata'
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('dadata', dadata)
}
