batch-queue
===========

queue actions to be run in batches


```
var batch = require('batch-queue')(raf)
  , thing = {}

function raf() {
  requestAnimationFrame(function() {
    console.log(thing) // {}
    batch.run()
    console.log(thing) // {a: 1, c: 3}
  })
}

batch.queue(function() {
  thing.a = 1
})

var foo = batch.add(function(key) {
  this[key] = 3 // context is preserved
})

foo.call(thing, 'b') // wont be run because foo is called again
foo.call(thing, 'c')
```

# API

### batch(ready, all) -> batch instance
ready will be called the first time something is queued after the queue has been drained. ideally it should be used in combination with a timeout or requestAnimationFrame. 
if all is set to true, ready will be called even if the queue was not empty. useful if you want to batch by number of actions rather than time.

### batch.queue(fn)
queue a function to be called next time the batch is run. the function is called without a context, use fn.bind if you need a specific context to be set

### batch.add(fn) -> fn
works like a debaunce. batch.add will return a new function, when this function is called it will queue the original function to be called with the passed arguments and context.  calling this function multiple times will result in the function only running once when the batch executes with the last set of arguments passed. 
