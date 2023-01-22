const fa = require('./fa')
export default async (context, locale) => {
    const obj = {}

    Object.keys(fa.default).forEach(key => {
        obj[key] = key.replace( /_/g , ' ')
    });
    

    // return await Promise.resolve(obj)
    return obj
  }