export function slider(sliderList:any,sliderData:any) {
    let sliderContainer = document.querySelector('#devaSlider') as HTMLElement;
    let sliderType = sliderData.sliderType == '' ? 'fade' : sliderData.sliderType; 
    let sliderTotalCount = sliderList && sliderList.length > 0 ? sliderList.length : 0;
    let sliderIndex:number;
    if(sliderData.customWidth){
        sliderContainer.setAttribute("style","max-width:"+sliderData.customWidth+"px;margin:0 auto");
    }
    let width = sliderData.customWidth ? sliderData.customWidth * sliderTotalCount : window.innerWidth * sliderTotalCount;
    let ul:any;
    let prevBtn = document.createElement("button");
        prevBtn.id = 'prevBtn';
        let nextBtn = document.createElement("button");
        nextBtn.id = 'nextBtn';

    const resettoprevNext = (listElem:any) =>{
             listElem[prevSlide].setAttribute("style", 'display:none');
            listElem[nextSlide].setAttribute("style", 'display:none');
    }


    const progressSlider = (initial?:string) =>{
       let listElem = ul.children;
       listElem[sliderIndex].setAttribute("style",initial ? 'transition:none' : '');
       if(sliderType == 'fade'){ 
        listElem[sliderIndex].setAttribute("class", 'fadeInAnim');
       }
       else if(sliderType == 'carousel'){
        console.log(ul);
        ul.style.transition = "all 0.2s linear";
        // if(initial){
            listElem[prevSlide].setAttribute("style", 'translateX:(-'+sliderData.customWidth+')px');
            listElem[sliderIndex].setAttribute("style", 'translateX(0%)');
            listElem[nextSlide].setAttribute("style", 'translateX('+sliderData.customWidth+')px');


            listElem[prevSlide].setAttribute("style","transform: translate3d(-1000px, 0px, 0)");
            listElem[sliderIndex].setAttribute("style", 'transform: translate3d(0, 0px, 0)');
            listElem[nextSlide].setAttribute("style", 'transform: translate3d(1000px, 0px, 0)');

            // setTimeout(() =>{
            //     resettoprevNext(listElem)
            // },2000);
        // }
        // else if(nextClicked){
            
            // let slideVal = (sliderIndex * sliderData.customWidth) + 'px';
            // ul.style.transform = "translateX(-"+slideVal+")";


        // }
       }
    }
    let prevSlide:number = -1;
    let nextSlide:number = -1;
    const sliderAction = () =>{
        let listElem = Array.from(ul.children) as HTMLLIElement[];
        if(sliderType == 'fade'){ 
        listElem.forEach((dlem:any) =>{
            dlem.className = "fadeOutAnim";
            dlem.setAttribute("style", "opacity:0;display:none");
        })
        }
        else if(sliderType == 'carousel'){
                
        }
    }

    let intervalSet:any;
    const startInterval = () =>{
        if(sliderData.sliderAuto){
            intervalSet = setInterval(() =>{
                sliderAction()
                sliderIndex = sliderIndex < (sliderTotalCount - 1) ?  sliderIndex + 1 : 0;
                progressSlider()
            },sliderData.interval)
        }
    }


    
    sliderContainer.addEventListener("mouseover", function(){ clearInterval(intervalSet)});
    sliderContainer.addEventListener("mouseout", function(){ console.log('mouseout');startInterval()});
    let nextClicked:boolean = true;
    // prev click
    prevBtn.addEventListener("click", function() {
        nextClicked = false;
        sliderAction();
        prevSlide = sliderIndex > 1 ? sliderIndex - 1 : sliderTotalCount - 1;
        sliderIndex = sliderIndex > 0 ?  sliderIndex - 1 : sliderTotalCount - 1;
        // nextSlide = sliderIndex == sliderTotalCount
        progressSlider()
    })

    // next Click
    nextBtn.addEventListener("click", function() {
        nextClicked = true;
        sliderAction();
        prevSlide = sliderIndex;
        sliderIndex = sliderIndex = sliderIndex < (sliderTotalCount - 1) ?  sliderIndex + 1 : 0;
        nextSlide = sliderIndex == sliderTotalCount - 1 ? 0 : sliderIndex + 1;
        progressSlider()
    })




    const buildSlider = (sliderList:any) =>{
        let sliders = JSON.parse(JSON.stringify(sliderList))
        
        ul = document.createElement('ul')
        sliders.forEach((slider:any) => {
        var list = document.createElement('li');
        list.id = slider.id;

        
        let img = '<img src='+slider.imageUrl+'>';
        if(sliderType == 'fade'){
            list.setAttribute("style", "opacity:0;display:none");
        }
        else if(sliderType == 'carousel'){
            ul.setAttribute("style","width:"+width+"px");
        }
        console.log(img)
        list.innerHTML = `${img}<div class="captionBanner"><h3>${slider.caption}</h3><button>${slider.link}</button></div>`;    
        ul.append(list)
    });
        sliderContainer.append(ul,prevBtn,nextBtn);
        sliderIndex = 0;
        prevSlide = sliderTotalCount - 1;
        nextSlide = sliderIndex + 1;
        progressSlider('initial');
            startInterval()
    }

    if(sliderContainer && sliderList && sliderList.length > 0){
        buildSlider(sliderList)
    }

}
