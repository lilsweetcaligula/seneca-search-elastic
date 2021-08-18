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


  const out = await seneca.post('sys:search,cmd:search', {
    query: 'bob'
  })

  console.dir(out, { depth: 32 }) // dbg


  return
}


run()

