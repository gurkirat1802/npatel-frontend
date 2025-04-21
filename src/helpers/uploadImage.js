export const uploadImage = async({file, url}) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "image/jpeg");

    const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: file,
    redirect: "follow"
    };

    await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}