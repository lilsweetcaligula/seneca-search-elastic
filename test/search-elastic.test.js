const Seneca = require('seneca')
const Shared = require('seneca-search-test')
const SearchElastic = require('../search-elastic')


describe('Compliance tests', () => {
  const seneca = make_seneca()

  beforeAll(done => {
    seneca.ready(done)
  })

  Shared.supports_add({
    seneca
  })

  Shared.supports_search({
    seneca
  })

  Shared.supports_remove({
    seneca
  })
})


function make_seneca() {
  const si = Seneca({ log: 'test' })

  si.use(SearchElastic, {
    elastic: {
      host: 'http://localhost:9200',
      apiVersion: '7.1'
    }
  })

  return si
}

