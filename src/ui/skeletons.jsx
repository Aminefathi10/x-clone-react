import { PersonOutline, Photo } from '@mui/icons-material';
import style from './skeletons.module.css';




export function PostSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.avatar}>
        <PersonOutline />
      </div>
      <div className={style.user}>
        <div />
        <div />
      </div>
      <div className={style.description}>
        <div />
        <div />
        <div className={style.lastline} />
      </div>
      <div className={style.pic}>
        <Photo />
      </div>
    </div>
  )
}
