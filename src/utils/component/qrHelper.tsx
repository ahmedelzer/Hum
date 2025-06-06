export function loadLibrary(src, type, id, data) {
  return new Promise(function (resolve, reject) {
    let scriptEle = document.createElement('script');
    scriptEle.setAttribute('type', type);
    scriptEle.setAttribute('src', src);
    if (id) {
      scriptEle.id = id;
    }
    if (data) {
      for (let key in data) {
        scriptEle.setAttribute(key, data[key]);
      }
    }
    document.body.appendChild(scriptEle);
    scriptEle.addEventListener('load', () => {

      resolve(true);
    });
    scriptEle.addEventListener('error', ev => {
      console.log('Error on loading ' + src, ev);
      reject(ev);
    });
  });
}
