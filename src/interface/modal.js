var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var mustache = require('mustache')
var templates = require('./templates')

inherits(Modal, EventEmitter)

function Modal (name, data) {
    var self = this
    if (!(self instanceof Modal)) return new Modal()

    self._html = mustache.render(templates[name], data)
    self.el = document.getElementById('modal')
    self.overlay = document.getElementById('overlay')
}

Modal.prototype.open = function () {
    var self = this
    
    self.el.style.display = ''
    self.overlay.style.display = ''
    self.el.innerHTML = self._html
    
    function done() {
        self.emit('done', self.el.querySelectorAll('input'))
    }
    
    function cancel() {
      self.emit('cancel')
    }
    
    var go = self.el.querySelector('.go-button')
    if (go) {
      if (go.tagName === 'BUTTON') {
          go.addEventListener('click', done)
      } else {
          go.addEventListener('change', done)
      }
    }
    
    var no = self.el.querySelector('.no-button')
    if (no) {
      if (no.tagName === 'BUTTON') {
          no.addEventListener('click', cancel)
      } else {
          no.addEventListener('change', cancel)
      }
    }
}

Modal.prototype.close = function () {
    var self = this
    
    self.el.style.display = 'none'
    self.overlay.style.display = 'none'
    self.el.innerHTML = ''
}

    
module.exports = Modal