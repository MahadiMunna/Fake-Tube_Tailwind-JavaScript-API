const getCategory = async() => {
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        // console.log(data);
        const categories = data.data;
        // console.log(categories)
        const categoryDiv = document.getElementById('category');
        categories.forEach(category => {
            const categoryName = category.category;
            const btn = `<button class="rounded rounded-md py-2 px-5 bg-zinc-300 font-semibold text-zinc-500 hover:bg-zinc-400 hover:text-zinc-700">${categoryName}</button>`
            categoryDiv.innerHTML += btn;
        });
    }catch{
        (err) => console.log(err);
    }
}
getCategory();

function tooltip(){
    text = document.getElementById('tooltipText');
    if(text.innerText=='Highest to Lowest'){
        text.innerText = 'Lowest to Highest';
    }
    else{
        text.innerText = 'Highest to Lowest';
    }
}

const loadVideos = async() => {
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
        const data = await response.json();
        const videos = data.data;
        console.log(videos);
        const videosDiv = document.getElementById('videos');
        videos.forEach(video => {
            console.log(video);
            let time="";
            if(video.others.posted_date==""){
                time = "";
            }else{
                time = timeConverter(video.others?.posted_date)
            } 
            let badge = "";
            if(video.authors[0].verified==true){
                badge = `<i class="fa-solid fa-certificate text-blue-700"></i>`;
            }else{
                badge = "";
            }
            videosDiv.innerHTML += `<div>
             <div class="w-full mx-auto">
                 <div class="w-full h-[200px] relative">
                    <img src=${video.thumbnail} class="h-full w-full rounded-md" alt="">
                    <div class="text-zinc-200 bg-black absolute bottom-2 right-2 px-1 rounded-md">
                        <span class="text-sm">${time}</span>
                    </div>
                 </div>
                 
             </div>
             <div class="flex mt-5">
                 <div class="me-3">
                     <img src=${video.authors[0].profile_picture} class="w-10 h-10 rounded-full" alt="">
                 </div>
                 <div>
                     <h4 class="text-lg font-bold">${video.title}</h4>
                     <p class="text-zinc-500">${video.authors[0].profile_name} ${badge}</p>
                     <p class="text-zinc-500">${video.others.views} views</p>
                 </div>
             </div>
         </div>`
        });
    }catch{
        (err) => console.log(err);
    }
}
loadVideos();

function timeConverter(seconds){
    seconds = parseInt(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    return `${hours} hours ${minutes} minutes ago`;

}