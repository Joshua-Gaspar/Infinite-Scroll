const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyToLoad = false;
let imagesLoaded = 0;
let totalImgLoaded = 0;
let photosArray = [];
let isInitialLoad = true


let initialCount = 5;
const apiKey='L4Qp5FS6iiEvAElP_iQIv2y0cGTvYqSJg62h3S7nsWM';
 const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`


 function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }


 function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded ===totalImgLoaded){
        readyToLoad = true;
        loader.hidden =true;
    }


}

//Helper Function to set Attribute on Dom Element
function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);

    }
}


function displayPhoto(){
    imagesLoaded = 0; 
    totalImgLoaded = photosArray.length;
    
    photosArray.forEach((photo)=>{

        //created <a> to link unsplash
        const item = document.createElement('a');
       
        setAttribute(item , {
            href:photo.links.html,
            target: '_blank'
        });

        //created <img> to link unsplash
        const img = document.createElement('img');
        setAttribute(img ,{
            src: photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description

        })


        img.addEventListener('load', imageLoaded);

        //put <img> inside <a>
        item.appendChild(img);
        imageContainer.appendChild(item);

        
    });
}


// Get photos from Unsplash API
async function getPhotos(){
    
    try{

        const response = await fetch(apiUrl)
        photosArray = await response.json();


         displayPhoto();

         if (isInitialLoad)
          { 
            updateAPIURLWithNewCount(30) 
            isInitialLoad = false 
          }

    }catch(error){


    }

}





//Check to see if scrolling near bottom of page
window.addEventListener('scroll', ()=>{

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        readyToLoad = false;
        getPhotos();
      }
});







getPhotos();