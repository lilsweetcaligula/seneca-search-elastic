const Seneca = require('seneca')
const Shared = require('seneca-search-test')
const SearchElastic = require('../search-elastic')

// NOTE: This is required for the tests not to timeout, when waiting on
// the search plugin to initialize.
//
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10e3


describe('Compliance tests', () => {
  const seneca = make_seneca()

  beforeAll(done => {
    wait_for_search_plugin_to_initialize(seneca, done)
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


function wait_for_search_plugin_to_initialize(seneca, done) {
  seneca.once('plugin_ready:search-elastic', done)
}

