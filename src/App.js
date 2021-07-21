import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Footer from './Footer';
import MoviesCharacter from './MoviesCharacter';
import Nav from './Nav';
import Preloader from './Preloader';
import Quotes from './Quotes';

// eslint-disable-next-line no-unused-vars
const BASE_URL = 'https://www.breakingbadapi.com/api/';
const charactersAPI = 'https://breakingbadapi.com/api/characters';
// const charactersAPI = 'https://breakingbadapi.com/api/characters?limit=10&offset=10';
const quotesAPI = 'https://breakingbadapi.com/api/quote/random';

function App() {
  const [movies, setMovies] = useState([]);
  const [RandomQuote , setQuotes ] = useState();
  const [searchedName , setSearchedName] = useState();
  const [displayBox , setdisplayBox] = useState(null);
  const [fetched , setFetched] = useState(false);
  const [searchElement , setSearchElement]  = useState(null);

  
  const containerElement = useRef();

  useEffect(() => {
    function fetcher(apiURL, setter) {
        fetch(apiURL).then(res => res.json())
    .then(data => {
        
        if(apiURL === quotesAPI ) {
            return  setter(data[0]);
        }
        setter(data);
        setFetched(true);
    }).catch(err => {
        if(err.status >= 400) {
            document.writeln('unable to connect to the server.\n Please, reload the Page.')
        }
        return console.error(err)
    });
    }
    fetcher(charactersAPI, setMovies);
    fetcher(quotesAPI, setQuotes);
  },[])

  

let names = [];
 
  if(movies) { 
      movies.map(movie => 
           names.push(movie.name)
      )
      names.sort();
  }
 

  function handleInputTextChange(e) {  
      displayBox && displayBox.classList.add('show-display-result'); 

   let value = e.target.value;
   value =value.toLowerCase();
   // cloning names for immutability case
   let cloneNames = names;

  if(value !== ''){
       cloneNames = names.filter(name => {
        name =  name.toLowerCase();
         if(name.includes(value)) {
          return name;
         }
         return false;
      })
  } else {
      displayBox.classList.remove('show-display-result');
     return setSearchedName([]);
  }
      setSearchedName(cloneNames); 
  }

  function handleDisplayBoxClick(e) {
     e.preventDefault();
      displayBox &&  displayBox.classList.remove('show-display-result');
      const selectedName = e.target.textContent;
    //   diplay the full name when clicked
       searchElement.value = selectedName ;

    return  itemFinder(selectedName)
  }

  function handleSearchkeypress(e) {
      if(e.charCode === 13) {
          itemFinder(e.target.value);
          e.target.value = '';
      }
      setSearchElement(e.target);
  }

  function itemFinder(itemName) {
    for( let i = 0; i < movies.length; i++) {
        // To efficient search expriance /.toLowerCase()/
          if((movies[i].name).toLowerCase() === itemName.toLowerCase()) {
              const selectedElement = 
              containerElement.current.children[i];
            selectedElement.style.background = '#b6242f80';
            setTimeout(() => { selectedElement.style.background = 'none' }, 500)
             return window.scrollTo({
                        top:selectedElement.offsetTop,
                        behavior: 'smooth'
                     })
          }
      }
  }
  
  return (
      <div>
          <Nav handleTextChange ={handleInputTextChange}
               handleDisplayBoxClick ={handleDisplayBoxClick}
               displayBoxhandle ={e=> e && setdisplayBox(e)}
               keyPress={handleSearchkeypress}
               displayBox = {displayBox} 
               searchedName={searchedName}
               />

      <div className="quotes-container"> 
             {fetched ?   RandomQuote !== null &&
              <Quotes key={RandomQuote} {...RandomQuote}/>
               : <Preloader/>}
      </div>
       <div className="main-intro-text">
           <h1>Who do you wish to meet?</h1>
           <h6> search or scroll to explore more actors</h6>
           </div>
            {fetched ?
            <div className="continer"
             ref={containerElement}>
            {(movies.length > 0) && movies.map(item=> 
         <MoviesCharacter  key={item.char_id}
                           {...item} />)}
            </div>
             : <Preloader/> }
           
        
        <Footer />
      </div>
  )
}

export default App;
