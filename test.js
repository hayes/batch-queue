var Batch = require('./index')
  , test = require('tape')

test(function(t) {
  var batch = Batch(update)
    , thing = {}

  t.plan(2)

  function update() {
    setTimeout(function() {
      t.deepEqual(thing, {})
      batch.run()
      t.deepEqual(thing, {a: 1, c: 3})
    }, 10)
  }

  batch.queue(function() {
    thing.a = 1
  })

  var foo = batch.add(function(key) {
    this[key] = 3 // context is preserved
  })

  foo.call(thing, 'b') // wont be run because foo is called again
  foo.call(thing, 'c')
})

test(function(t) {
  var batch = Batch(update, true)
    , actions = 3
    , thing = {}

  t.plan(2)

  function update() {
    if(--actions) {
      return
    }

    t.deepEqual(thing, {})
    batch.run()
    t.deepEqual(thing, {a: 1, c: 3})
  }

  batch.queue(function() {
    thing.a = 1
  })

  var foo = batch.add(function(key) {
    this[key] = 3 // context is preserved
  })

  foo.call(thing, 'b') // wont be run because foo is called again
  foo.call(thing, 'c')
})
