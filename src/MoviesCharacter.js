
function MoviesCharacter(props) {
  const {
     img ,
     name,
     birthday,
     nickname,
     status,
  } = props;

  return(
   <div className="card-container" id={name}>
          <figure className="figure">
          <div className="img-container">
          <img loading="lazy" src={img} className="card-img" alt={name}/>
          </div>
              <figcaption> 
              <h4 role="link" className="item-text">
                Name: <strong>{name}</strong>
                </h4>
              <h4 className="item-text">
                BirthDay: <strong>{birthday}</strong>
                </h4>
              <p className="item-text">
              Nickname: <strong>{nickname}</strong>
            </p>
              <p className="item-text">
              Status: <strong>{status}</strong>
            </p>
              </figcaption>
          </figure>
      </div>
  )
}

export default MoviesCharacter;