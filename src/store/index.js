let ACTIONS = {}
let MUTATIONS = {}

// 将 state 挂载到 getApp().state
function _setState (state) {
  this.state = Object.assign({}, state)
}

function _setAction (actions) {
  Object.assign(ACTIONS, actions)
}

function _setMutation (mutations) {
  Object.assign(MUTATIONS, mutations)
}

function createStore () {
  let stateModules = require('./state/index.js')
  let actionModules = require('./actions/index.js')
  let mutationModules = require('./mutations/index.js')

  // has module namespace in getApp().state
  if (stateModules) {
    _setState.call(this, stateModules)
  }

  // has module namespace in MUTATIONS
  if (mutationModules) {
    _setMutation(mutationModules)
  }

  // has module namespace in ACTIONS
  if (actionModules) {
    _setAction(actionModules)
  }
}

function dispatch (keyname, param) {
  let moduleName = Object.keys(ACTIONS).find(moduleName =>
    ACTIONS[moduleName].hasOwnProperty(keyname))

  if (moduleName) {
    return ACTIONS[moduleName][keyname]
      .call(this, getApp().state[moduleName], param)
  } else {
    console.warn(`could not dispatch ${keyname}. ${keyname} callback is undefined.`)
  }
}

function commit (keyname, param) {
  let moduleName = Object.keys(MUTATIONS).find(moduleName =>
    MUTATIONS[moduleName].hasOwnProperty(keyname))

  if (moduleName) {
    getApp().state[moduleName] = MUTATIONS[moduleName][keyname]
      .call(null, getApp().state[moduleName], param)
  } else {
    console.warn(`could not commit ${keyname}. ${keyname} callback is undefined.`)
  }
}

export default {
  createStore,
  dispatch,
  commit
}
