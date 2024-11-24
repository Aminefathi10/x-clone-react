import style from './addComment.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { db } from '../firebase'
import {  addDoc, collection, doc, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useState } from 'react';


export default function Comment({post: {name, username, photoURL, description}, user, hideForm, id, uid}) {

    const [disabled, setDisabled] = useState(false);

    function handleReply(event) {
        event.preventDefault();
        setDisabled(true)
        addDoc(collection(doc(db, 'Posts', id), 'replies'), {
            uid: uid,
            description: event.target.reply.value,
            postImg: null,
            likes: 0,
            postedAt: serverTimestamp()
        }).then(res => {
            updateDoc(doc(db, 'Posts', id), {
                comments: increment(1)
            })
            hideForm();
        }).catch(err => {
            hideForm();
        })
    }

    const receivers = ['@amine', '@adil', '@khalid']
  return (
    <>
        <main className={style.container}>
            <div className={style.top}>
                <button onClick={hideForm} title='close'>
                    <CloseIcon />
                </button>
            </div>
            <div className={style.postOwner}>
                <div className={style.ownerAvatar}>
                    <img width={35} src={photoURL ? photoURL : "/avatar.png"} alt="" />
                </div>
                <div className={style.postData}>
                   <div className={style.ownerData}>
                        <h1>{name}</h1>
                        <h2>{username}</h2>
                        <p>1d</p>
                    </div> 
                    <p className={style.desc}>
                        {description}
                    </p>
                </div>
            </div>
            <p className={style.replyTo}>
                {receivers.map((r, i) => `${r} ${receivers[i+1] ? 'and ' : ''}`)}
            </p>
            <div className={style.body}>
                <div className={style.avatar}>
                    <img width={35} src={user ? user : "/avatar.png"} alt="" />
                </div>
                <form onSubmit={handleReply}>
                    <textarea required type="text" name="reply" id="reply" placeholder='Reply' />
                    <div className={style.btns}>
                        <div className={style.options}>
                            <label htmlFor='image'>
                                <input style={{display: 'none'}} type="file" name='image' id='image' />
                                <ImageRoundedIcon />
                            </label>
                            <label htmlFor="">
                                <PollRoundedIcon />
                            </label>
                            <label htmlFor="">
                                <EmojiEmotionsRoundedIcon />
                            </label>
                            <label htmlFor="">
                                <CalendarMonthRoundedIcon />
                            </label>
                        </div>
                        <button disabled={disabled} type='submit'>Post</button>
                    </div>
                </form>
            </div>
        </main>
        <div onClick={hideForm} style={{position: 'absolute', width: '100vw', height: '100vh', zIndex: 10, top: 0, left: 0, background: '#fff1'}} />
    </>
    
  )
}
