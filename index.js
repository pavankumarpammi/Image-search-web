// alert("hello");
const searchForm =document.querySelector('form');
const imagesContainer =document.querySelector('.images-container');
const accessKey ="XUkuOTeFtTKMQdAcSkLANB3RDSB0K-m8oq4B3RHSQJY";
const searchInput =document.querySelector('.search-input');
const LoadMoreBtn = document.querySelector('.LoadMoreBtn');

let page=1;

const fetchImages=async(query,pageNo)=>{
    if(pageNo===1)
    {
        imagesContainer.innerHTML=``;
        
    }
    //console.log(query);
    const url =`https://api.unsplash.com/search/photos?query=${query}&per_page=30&page=${pageNo}&client_id=${accessKey}`; 
    const response =await fetch(url);
    const data =await response.json();
    //console.log(data);
    data.results.forEach(photo => {
        //creating image div
        const imageElement =document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML= `<img src="${photo.urls.regular}"/>`;

        //creating overlay
        const overlayElement =document.createElement('div');
        overlayElement.classList.add('overlay');
        
        //creating overlay text
        const overlayText =document.createElement('h3');
        overlayText.innerText=`${photo.alt_description}`;

        imagesContainer.appendChild(imageElement);
        imageElement.appendChild(overlayElement);
        overlayElement.appendChild(overlayText)
    });
    if(data.total_pages===pageNo)
    {
        LoadMoreBtn.style.display="none";
    }
    else{
        LoadMoreBtn.style.display="block";
    }
    
}
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //console.log(searchInput.value);
    const inputText=searchInput.value.trim(); 
    if(inputText!=='')
    {   page=1;
        fetchImages(inputText,page);
        
    }
    else{
        imagesContainer.innerHTML=`<h2>Please enter a query.</h2>`
    }
});


//load more images
LoadMoreBtn.addEventListener('click',(e)=>{
    fetchImages(searchInput.value.trim(),++page);
})