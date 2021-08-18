const Elasticsearch = require('elasticsearch')


function search_elastic(options) {
  const seneca = this


  if (null == options.elastic) {
    return seneca.fail('The "elastic" option is required')
  }


  const { elastic: elastic_config } = options
  const elastic_client = new Elasticsearch.Client(elastic_config)


  seneca.add('sys:search,cmd:search', async function (msg, reply) {
    if (null == msg.query) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['query'],
          why_exactly: 'required'
        }
      }
    }

    const { query } = msg


    /* NOTE: For more information, please see documentation at:
     *
     * https://www.npmjs.com/package/elasticsearch
     *
     */
    const out = await elastic_client.search({
      q: query
    })

    console.dir(out, { depth: 32 }) // dbg
    console.dir(out.hits.hits, { depth: 32 }) // dbg


    const hits = out.hits.hits.map(hit => ({
      id: hit._id,
      doc: hit._source
    }))

    return reply(null, { ok: true, data: { hits } })
  })


  return
}


module.exports = search_elastic
