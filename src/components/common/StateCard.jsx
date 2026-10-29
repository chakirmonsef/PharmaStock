
function Card({titre, valeur, description, icone, variant}) {
    return(
        <div className="card">

            <div className="card-header">
                <h3>{titre}</h3>
                <div className={`card-icon card-icon--${variant}`}>
                    {icone}
                </div>
                
            </div>

            <div className="card-footer">
                <p className="card-value">{valeur}</p>
                <p className="card-description">{description}</p>
            </div>
            
        </div>
    );
}

export default Card;