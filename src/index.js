import {initializeApp} from 'firebase/app'
import{
    getFirestore, collection, onSnapshot,
    addDoc, doc,
    query, where,
    orderBy, serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAQvEllDMH4x7UYuCTjjU6xI2nsDU9RIkU",
    authDomain: "public-mood-ca3f4.firebaseapp.com",
    projectId: "public-mood-ca3f4",
    storageBucket: "public-mood-ca3f4.appspot.com",
    messagingSenderId: "629222416987",
    appId: "1:629222416987:web:8429814701836bbae0557e"
  };

initializeApp(firebaseConfig)

//init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'moods')

// queries

// Query One Emotion Only
 //const q = query(colRef, where("emotion", "==", "sad" ), orderBy('createdAt'))

 // Query All Emotions
 const q = query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(q, (snapshot) => {
    let moods = []
    snapshot.docs.forEach((doc) => {
        moods.push({ ...doc.data(), id:doc.id })
    })
    console.log(moods)
})

// adding emotions
const addEmotionForm = document.querySelector('.add')
addEmotionForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        emotion: addEmotionForm.emotion.value,
        createdAt: serverTimestamp()
    })
    .then(() => { 
    addEmotionForm.reset()
})
})