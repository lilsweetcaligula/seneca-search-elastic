const Elasticsearch = require('elasticsearch')


const SENECA_INDEX = 'seneca'
const SENECA_DOCTYPE = 'senecadoctype'


async function search_elastic(options) {
  const seneca = this


  if (null == options.elastic) {
    return seneca.fail('The "elastic" option is required')
  }


  const { elastic: elastic_config } = options
  const elastic_client = new Elasticsearch.Client(elastic_config)


  const has_index = await elastic_client.indices.exists({
    index: SENECA_INDEX
  })

  if (!has_index) {
    await elastic_client.indices.create({
      index: SENECA_INDEX
    })
  }

  seneca.add('sys:search,cmd:add', async function (msg, reply) {
    if (null == msg.doc) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['doc'],
          why_exactly: 'required'
        }
      }
    }

    const { doc } = msg


    if (null == typeof doc.id) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['doc', 'id'],
          why_exactly: 'required'
        }
      }
    }

    const { id: doc_id } = doc


    const body = { ...doc }; delete body.id

    const created = await elastic_client.create({
      index: SENECA_INDEX,
      type: SENECA_DOCTYPE,
      id: doc_id,
      body
    })

    if ('created' !== created.result) {
      console.error(created.result)
      return reply(null, { ok: false })
    }


    return reply(null, { ok: true })
  })

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


    // NOTE: For more information, please see documentation at:
    //
    // https://www.npmjs.com/package/elasticsearch
    //
    //
    const out = await elastic_client.search({
      q: query
    })


    const hits = out.hits.hits.map(hit => ({
      id: hit._id,
      doc: hit._source
    }))

    return reply(null, { ok: true, data: { hits } })
  })


  return
}


module.exports = search_elastic
