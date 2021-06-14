import react from 'react'
import {
    FacebookShareButton,FacebookIcon,
    TelegramShareButton,TelegramIcon,
    RedditShareButton,RedditIcon,
    TwitterShareButton,TwitterIcon,
    WhatsappShareButton,WhatsappIcon
   
  } from 'react-share'

  function ShareModal({url,Theme}){
    return <>
       <div className = 'd-flex justify-content-between px-4 py-2'
        style = {{filter: Theme ? 'invert(1)' : 'invert(0)'}}>
         <FacebookShareButton url = {url}>
           <FacebookIcon size={24} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url = {url}>
           <WhatsappIcon size={24} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton url = {url}>
           <TelegramIcon size={24} round={true} />
          </TelegramShareButton>
          <TwitterShareButton url = {url}>
           <TwitterIcon size={24} round={true} />
          </TwitterShareButton>
          <RedditShareButton>
           <RedditIcon size={24} round={true} />
          </RedditShareButton>
        
       </div>
    </>

  }

  export default ShareModal