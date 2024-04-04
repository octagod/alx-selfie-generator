const setCookies = (name, value, expires) => {
    const d = new Date();
    d.setTime(d.getTime() + (expires*24*60*60*1000));
    let exDay = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + exDay + ";path=/";
}

const getCookies = (name) => {
    let _name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(_name) === 0) {
        return c.substring(_name.length, c.length);
      }
    }
    return "";
}

const deleteCookies = (name) => {
    if( getCookies(name) ) {
        document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
}

const cookies = {setCookies, getCookies, deleteCookies}

export default cookies