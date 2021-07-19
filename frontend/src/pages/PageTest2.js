import { useState, useEffect } from 'react'


const PageTest = () => {

    /*   const [active, setActive] = useState(false);
      const [publication, setPublication] = useState({ postTitle: "", message: "" });
  
  
      useEffect(() => {
          if (publication.postTitle !== "" && publication.message !== "") {
              setActive(true);
          }
      }, [publication]);
  
      const onTitleChange = e => {
          setPublication({ postTitle: e.target.value });
          console.log("titre : " + publication.postTitle);
          if (publication.postTitle !== "") {
          }
      }
      const onMessageChange = e => {
          setPublication({ message: e.target.value });
          console.log("message : " + publication.message);
      } */

      


    return (
        <>
            <h1>Page Test 2</h1>
            <div className="container">

                {/* <form className="post-new-publication" >
                    <input type="text" id="titre" placeholder="Titre de la publication" onChange={onTitleChange} />
                    <input type="text" id="message" placeholder="Votre message" onChange={onMessageChange} />
                    {active ? (
                        <input type="submit" name="envoyer-message" value="Envoyer la publication" className="bt" />
                    ) : (
                        <input disabled name="envoyer-message" value="Envoyer la publication" className="bt-inactive" />
                    )}
                </form> */}
            </div>
        </>
    );
};

export default PageTest;