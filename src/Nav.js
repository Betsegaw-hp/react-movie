import React from 'react';
import './magnifiying-glass.png';
function Nav(props) {

  const {
      handleTextChange,
      displayBoxhandle,
      searchedName,
      handleDisplayBoxClick,
      keyPress
  } = props;

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
                  />
                  
          <ul className="display-result"
              ref={displayBoxhandle}>
               {searchedName && searchedName.map((item, i)=> (
                   <li key={item +"_"+ i}
                       className="display-li"
                       onClick={handleDisplayBoxClick}>
                           <img className="search-icon"
                           src="src/magnifiying-glass.png" 
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