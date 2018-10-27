import {
    chooseImage,
    showModal
} from "./util";


async function f() {
    let options = {}
    await chooseImage(options)

    await showModal({
        title1:'123'
    })
}