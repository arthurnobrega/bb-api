import BB from './bb'

// Run main if it was called by shell
if (require.main === module) {
  const bb = new BB()

  bb.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' })
    .then(() => bb.getBalance())
    .then(balance => console.log(balance))
    .then(() => bb.getTransactions({ year: '2017', month: '12' }))
    .then(transactions => console.log(transactions))
}

export default BB
