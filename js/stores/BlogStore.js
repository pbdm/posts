'use strict';

module.exports = {
  data: [],
  push: function(options){
    if(options && _.isObject(options)){
      this.data.push(options);
    }
  },
  getAll: function(){
    return this.data;
  },
};