const Assert = require('assert')
const Seneca = require('seneca')
const SenecaSearchElastic = require('./search-elastic')


async function run() {
  const seneca = Seneca()


  seneca.use(SenecaSearchElastic, {
    elastic: {
      host: 'http://localhost:9200',
      apiVersion: '7.1'
    }
  })


  seneca.use('promisify')

  const docs = [
    { id: 1001, name: 'bob' },
    { id: 1002, name: 'foo', extra: 'bob' }
  ]

  for (const doc of docs) {
    await seneca.post('sys:search,cmd:add', { doc })
      .then(added => Assert(added.ok))
  }


  const out = await seneca.post('sys:search,cmd:search', {
    query: 'bob'
  })

  console.dir(out, { depth: 32 }) // dbg


  return
}


run()

