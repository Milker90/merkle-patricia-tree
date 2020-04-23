import * as tape from 'tape'
import { CheckpointTrie } from '../src'

tape('offical tests', function (t) {
  const jsonTests = require('./fixtures/trietest.json').tests
  const testNames = Object.keys(jsonTests)
  let trie = new CheckpointTrie()

  for (const testName of testNames) {
    let inputs = jsonTests[testName].in
    let expect = jsonTests[testName].root
    for (const input of inputs) {
      for (let i = 0; i < 2; i++) {
        if (input[i] && input[i].slice(0, 2) === '0x') {
          input[i] = Buffer.from(input[i].slice(2), 'hex')
        } else if (input[i] && typeof input[i] === 'string') {
          input[i] = Buffer.from(input[i])
        }
        trie.put(Buffer.from(input[0]), input[1])
      }
    }
    t.equal('0x' + trie.root.toString('hex'), expect)
    trie = new CheckpointTrie()
  }
  t.end()
})

tape('offical tests any order', function (t) {
  const jsonTests = require('./fixtures/trieanyorder.json').tests
  const testNames = Object.keys(jsonTests)
  let trie = new CheckpointTrie()
  for (const testName of testNames) {
    const test = jsonTests[testName]
    const keys = Object.keys(test.in)
    let key: any
    for (key of keys) {
      let val = test.in[key]

      if (key.slice(0, 2) === '0x') {
        key = Buffer.from(key.slice(2), 'hex')
      }

      if (val && val.slice(0, 2) === '0x') {
        val = Buffer.from(val.slice(2), 'hex')
      }

      trie.put(Buffer.from(key), Buffer.from(val))
    }
    t.equal('0x' + trie.root.toString('hex'), test.root)
    trie = new CheckpointTrie()
  }
  t.end()
})
