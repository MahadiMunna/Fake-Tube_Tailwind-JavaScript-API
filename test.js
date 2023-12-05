const tooltip = false;

const loadVideos = async() => {
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
        const data = await response.json();
        const videos = data.data;
        console.log(videos);
        if(tooltip){
            videos.sort((a, b) =>{
                const video1 = parseFloat(a.others.views.replace(/K/, ''), 10);
                const video2 = parseFloat(b.others.views.replace(/K/, ''), 10);
                return video2 - video1; // Sort in descending order
            })
        }else{
            videos.sort((a, b) =>{
                const video1 = parseFloat(a.others.views.replace(/K/, ''), 10);
                const video2 = parseFloat(b.others.views.replace(/K/, ''), 10);
                return video1 - video2;
            })
        }
        videos.forEach(video =>{
            const views = video.others.views;
            const viewsFloat = parseFloat(views);
            console.log(viewsFloat);
    });
    }catch(e){	
        console.log(e);
    }};
loadVideos();        

// const others =[{views: '100K', posted_date: '16278'},{views: '90K', posted_date: '16278'},{views: '95K', posted_date: '16278'}]

// const others = [
//     { views: '100K', posted_date: '16278' },
//     { views: '90K', posted_date: '16278' },
//     { views: '95K', posted_date: '16278' },
//   ];
  
//   others.sort((a, b) => {
//     const viewsA = parseFloat(a.views.replace(/K/, ''), 10);
//     const viewsB = parseFloat(b.views.replace(/K/, ''), 10);
//     return viewsB - viewsA; // Sort in descending order
//   });
  
//   console.log(others);