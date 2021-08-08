import { getUserCertificates, createHash, createDetachedSignature } from 'crypto-pro'

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('cryptopro', { getUserCertificates, createHash, createDetachedSignature })
}
