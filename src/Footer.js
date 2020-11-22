import React, { useEffect, useRef } from 'react';
import bouncer from './media/chevron-up.svg';
import githubIcon from './media/icons8-github.svg';

const BASE_URL = 'https://www.breakingbadapi.com/api/';
const charactersAPI = 'https://breakingbadapi.com/api/characters';
const quotesAPI = 'https://breakingbadapi.com/api/quotes';
function Footer() {
  const topLink = useRef();

  useEffect(()=> {
    window.addEventListener('scroll', (e) => {
      if(window.pageYOffset >= 1000) 
     topLink.current.classList.add('show-link')
      else 
       topLink.current.classList.remove('show-link')
    })
  },[])
  
  return (
    <footer className="footer">
      <div className="footer-flex-item">
          <div className="social-link">
       <a href="https://github.com/Betsegaw-hp/react-movie" title="github-repo"><img src={githubIcon} alt='github-icon'/></a> 
      </div>
      <div className="Source-referance">
         <a href={BASE_URL} _target="window"><i>Base_Api</i></a>
         <a href={charactersAPI}><i>Characters_Api</i></a>
         <a href={quotesAPI}><i>Qoute_Api</i></a>
      </div>
      </div>
    
      <div className="top-link"
           ref={topLink}
           title="bounce to top">
        <img src={bouncer}
             alt="up-bouncer"
             onClick={e => {
               window.scrollTo({
                 top: 0,
                 behavior: "smooth"
               })
             }}/>
      </div>
  </footer>
  );
}

export default Footer;
