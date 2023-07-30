const addslashes = (str) => {
    str = str.replace(/\n/g, '\\\n')
    str = str.replace(/\n/g, '\\\n')
    str = str.replace(/\t/g, '\\\t')
    str = str.replace(/\f/g, '\\\f')
    str = str.replace(/\r/g, '\\\r')
    str = str.replace(/'/g, '\\\'')
    str = str.replace(/"/g, '\\\"')
    return str
  };
  
  module.exports = { addslashes };