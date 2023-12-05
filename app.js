// tooltip fumction for sort by views 
const toolTipText = document.getElementById('tooltipText');
function tooltip(){
    if(toolTipText.innerText=='Highest to Lowest'){
        toolTipText.innerText = 'Lowest to Highest';
    }
    else{
        toolTipText.innerText = 'Highest to Lowest';
    }
}


// categories API call 
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
            let id = category.category_id;
            const btn = `<button onclick="loadVideos(${id});" id="id${id}" class="rounded rounded-md py-2 px-5 bg-zinc-300 text-zinc-500 font-semibold toolTipText-zinc-500 hover:bg-zinc-400 hover:text-zinc-700">${categoryName}</button>`
            categoryDiv.innerHTML += btn;
        });
    }catch{
        (err) => console.log(err);
    }
}
getCategory();

// time conversion function 
function timeConverter(seconds){
    seconds = parseInt(seconds);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    return `${hours} hours ${minutes} minutes ago`;

}

// video loader
const loadVideos = async(id) => {
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await response.json();
        const videos = data.data;
        // console.log(videos);
        const videosDiv = document.getElementById('videos');
        videosDiv.innerHTML = "";
        if (videos.length == 0){
            videosDiv.classList.remove("sm:grid-cols-2","md:grid-cols-3","lg:grid-cols-4","gap-5");
            videosDiv.innerHTML = `
            <div class="flex flex-col justify-center items-center mt-10">
                <img src="./src/Icon.png" class="w-36 mb-6" alt="">
                <h1 class="text-3xl font-bold text-center w-80">Oops!! Sorry, There is no content here</h1>
            </div>
            `
        }else{
            videos.forEach(video => {
                console.log(video);
    
                // time conversion 
                let time="";
                if(video.others.posted_date==""){
                    time = "";
                }else{
                    time = timeConverter(video.others.posted_date)
                } 
    
                // badge selection 
                let badge = "";
                if(video.authors[0].verified==true){
                    badge = `<i class="fa-solid fa-certificate text-blue-700"></i>`;
                }else{
                    badge = "";
                }

                //sorting with views
                const views = video.others.views;
                if(toolTipText == 'Highest to Lowest'){

                }
    
                // single video append to the div  
                videosDiv.classList.add("sm:grid-cols-2","md:grid-cols-3","lg:grid-cols-4","gap-5");
                videosDiv.innerHTML += `
                <div>
                    <div>
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
                            <p class="text-zinc-500">${views} views</p>
                        </div>
                    </div>
                </div>`
            });
        }
        const prevBtn = document.getElementById(`id${previd}`);
        prevBtn.classList.remove('bg-red-500','text-white','hover:bg-red-500','hover:text-black');
        prevBtn.classList.add('bg-zinc-300','text-zinc-500');
        previd = id;
        const newBtn = document.getElementById(`id${previd}`);
        newBtn.classList.remove('bg-zinc-300','text-zinc-500');
        newBtn.classList.add('bg-red-500','text-white','hover:bg-red-500','hover:text-black');
        
    }catch{
        (err) => console.log(err);
    }
}
var previd = 1000;
loadVideos(previd);
