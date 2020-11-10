
function MoviesCharacter(props) {
  const {
     img ,
     name,
     birthday,
     nickname,
     status,
  } = props;

  return(
   <div className="card-container">
          <figure className="figure">
          <div className="img-container">
          <img loading="lazy" src={img} className="card-img" alt={name}/>
          </div>
              <figcaption> 
              <h4 role="link">Name: {name}</h4>
              <h4 className="price">BirthDay: {birthday}</h4>
              <p className="item-text">
              Nickname: {nickname}
            </p>
              <p className="item-text">
              Status: {status}
            </p>
              </figcaption>
          </figure>
      </div>
  )
}

export default MoviesCharacter;