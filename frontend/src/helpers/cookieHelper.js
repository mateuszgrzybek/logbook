const handleCookie = {
    write: (cookieName, cookieValue) => {
        document.cookie = `${cookieName}=${cookieValue}`;
    },
    read: (cookie) => {
        return cookie
            .split(";")
            .map((value) => value.split("="))
            .reduce((cookiesObject, splitCookieValue) => {
                cookiesObject[decodeURIComponent(splitCookieValue[0].trim())] = decodeURIComponent(splitCookieValue[1].trim());
                return cookiesObject;
            }, {});
    },
    delete: (cookieName) => {
        document.cookie = `${cookieName}=`;
    },
};

export default handleCookie;
