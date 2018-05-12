import Centralizer from './centralizer'

// Run main if it was called by shell
if (require.main === module) {
  const centralizer = new Centralizer()

  centralizer.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' })
    .then(() => centralizer.getBalance())
}
