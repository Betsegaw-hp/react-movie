import React, { useEffect, useRef } from 'react';

const magnifiyingGlassImg  = require('./magnifiying-glass.png');


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

  useEffect(()=> {
    
      inputElement.current.onblur = (e) => {

      displayBox.classList.remove('show-display-result')  
    }

  })
  
  return(
  <nav className="nav">
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
                           src={magnifiyingGlassImg} 
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