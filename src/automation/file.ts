export const urlToFile = async (url: string) => {

    if (!url) {
        console.log("input url")
        return
    }
    const res = await fetch(url);
    const blob = await res.blob();
    const filename = url.split("/").pop()
    const type = url.split("/").pop()?.split(".")[1]
    if (!filename) {
        console.log("no file name")
        return
    }
    return new File([blob], filename, { type: "image/" + type });
}