import React, { useEffect, useRef } from 'react';
import magnifiyingGlass from './magnifiyingGlass.png';


function Nav(props) {
  
  const {
      handleTextChange,
      handleDisplayBoxClick,
      displayBoxhandle,
      searchedName,
      keyPress,
      displayBox
  } = props;
  const inputElement = useRef();
  const nav = useRef();

  useEffect(()=> {
    
      inputElement.current.onblur = (e) => {

      displayBox.classList.remove('show-display-result')  
    }
    window.onscroll = (e) => {
        if(window.pageYOffset >= 100 )
          nav.current.style.opacity = "0.7";
          else
         nav.current.style.opacity = "1"; 
    }

  })
  
  return(
  <nav className="nav" ref={nav}>
      <div className="logo">
          <h1>Breaking Bad</h1>
      </div>
      <div className="Items">
          <input type="search" 
                 placeholder="search"
                 className="search"
                 onKeyPress={keyPress}
                 onChange={handleTextChange}
                 ref={inputElement}
                  />
                  
          <ul className="display-result"
              ref={displayBoxhandle}>
               {searchedName && searchedName.map((item, i)=> (
                   <li key={item +"_"+ i}
                       className="display-li"
    // onMouseDown used insted of onClick b/c https://github.com/facebook/react/issues/4210
                       onMouseDown={handleDisplayBoxClick}>
                           <img className="search-icon"
                           src={magnifiyingGlass} 
                           alt=""/>
                          {item}
                          </li>    
               ))} 
          </ul>        
      </div>
  </nav>
  );
}

export default Nav;