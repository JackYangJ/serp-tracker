const Types = {

  isPrototype( data: any ) {
    return Object.prototype.toString.call(data).toLowerCase()
  },

  isArray( data: any ) {
    return this.isPrototype( data ) === '[object array]'
  },

  isJSON( data: any ) {
    return this.isPrototype( data ) === '[object object]'
  },

  isFunction( data: any ) {
    return this.isPrototype( data ) === '[object function]'
  },

  isString( data: any ) {
    return this.isPrototype( data ) === '[object string]'
  },

  isNumber( data: any ) {
    return this.isPrototype( data ) === '[object number]'
  },

  isUndefined( data: any ) {
    return this.isPrototype( data ) === '[object undefined]'
  },

  isNull( data: any ) {
    return this.isPrototype( data ) === '[object null]'
  }

}

export default Types