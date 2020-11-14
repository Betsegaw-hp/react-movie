import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Footer from './Footer';
import MoviesCharacter from './MoviesCharacter';
import Nav from './Nav';
import Quotes from './Quotes';


// eslint-disable-next-line no-unused-vars
const BASE_URL = 'https://www.breakingbadapi.com/api/';
const charactersAPI = 'https://breakingbadapi.com/api/characters';
const quotesAPI = 'https://breakingbadapi.com/api/quote/random';

function App() {
  const [movies, setMovies] = useState([]);
  const [RandomQuote , setQuotes ] = useState();
  const [searchedName , setSearchedName] = useState();
  const [displayBox , setdisplayBox] = useState(null);

  const containerElement = useRef();

  useEffect(() => {
    function fetcher(apiURL, setter) {
        fetch(apiURL).then(res => res.json())
    .then(data => {
        console.log(data);
        if(apiURL === quotesAPI ) {
            return  setter(data[0]);
        }
        setter(data);
    }).catch(err => {
        if(err.status >= 400) {
            document.writeln('unable to connect to the server')
        }
        return console.log(err)
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
      console.log(searchedName)
  }

  function handleDisplayBox(el) {
      if(el){
       return  setdisplayBox(el);     
      }
  }

  function handleDisplayBoxClick(e) {
     e.preventDefault();
      displayBox &&  displayBox.classList.remove('show-display-result');
      const selectedName = e.target.textContent;   
      
      for( let i = 0; i < movies.length; i++) {
          if((movies[i].name).includes(selectedName) ) {
              const selectedElementPosition = 
              containerElement.current.children[i].offsetTop;
            
            
              return window.scrollTo({
          top:selectedElementPosition,
          behavior: 'smooth'
      })
          }
      }
      
  }
  function handleSearchkeypress(e) {
      if(e.charCode === 13) {
          e.target.value = '';
      }
  }

 
  return(
      <div>
          <Nav handleTextChange ={handleInputTextChange}
               displayBoxhandle ={handleDisplayBox} 
               searchedName={searchedName}
               handleDisplayBoxClick ={handleDisplayBoxClick}
               keyPress={handleSearchkeypress}/>

      <div className="quotes-container"> 
          {   RandomQuote !== null &&
              <Quotes key={RandomQuote} {...RandomQuote}/>}
      </div>

        <div className="continer"
             ref={containerElement}>
           {(movies.length > 0) && movies.map((item)=> 
         <MoviesCharacter  key={item.char_id} {...item}/>
            )}
        </div>
        <Footer />
      </div>
  )
}

export default App;
