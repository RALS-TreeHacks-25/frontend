import firebase from '../secrets/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const profilePictures = getStorage(firebase)

export async function uploadImage(image, uid) {

    const response = await fetch(image)
    let blob = await response.blob()

    console.log('check')

    const storageRef = ref(profilePictures, '/images/' + uid)
    await uploadBytesResumable(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    return await getDownloadURL(storageRef)
}