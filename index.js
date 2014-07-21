module.exports = Batch

function Batch(ready, all) {
  if(!(this instanceof Batch)) {
    return new Batch(ready, all)
  }

  this.jobs = []
  this.all = all
  this.ready = ready
  this.queud = false
  this.run = this.run.bind(this)
}

Batch.prototype.queue = queue
Batch.prototype.add = add
Batch.prototype.run = run

function add(fn) {
  var queued = false
    , batch = this
    , self
    , args

  return queue

  function queue() {
    args = [].slice.call(arguments)
    self = this

    if(queued) {
      return batch.all && batch.ready()
    }

    queued = true
    batch.queue(run)
  }

  function run() {
    queued = false
    fn.apply(self, args)
  }
}

function queue(fn) {
  this.jobs.push(fn)

  if(this.all || !this.queued) {
    this.queued = true
    this.ready(this)
  }
}

function run() {
  var jobs = this.jobs

  this.jobs = []
  this.queued = false

  for(var i = 0, l = jobs.length; i < l; ++i) {
    jobs[i]()
  }

  return !!this.jobs.length
}
