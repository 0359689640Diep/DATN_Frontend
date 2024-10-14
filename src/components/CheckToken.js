const checkToken = () => {
    const token = localStorage.getItem("accessToken");
    return token === null || token === "undefined" ? false : token;
}

export default checkToken;