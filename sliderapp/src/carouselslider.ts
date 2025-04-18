export function carouselSlider(sliderList:any,sliderData:any) {
    let sliderContainer = document.querySelector('#devaSlider') as HTMLElement;
    let sliderType = sliderData.sliderType == '' ? 'fade' : sliderData.sliderType; 
    let sliderTotalCount = sliderList && sliderList.length > 0 ? sliderList.length : 0;
    let sliderIndex:number;
    if(sliderData.customWidth){
        sliderContainer.setAttribute("style","max-width:"+sliderData.customWidth+"px;margin:0 auto");
    }
    let width = sliderData.customWidth ? sliderData.customWidth * sliderTotalCount : window.innerWidth * sliderTotalCount;
    let definedul:any;
    let ul:any;
    let prevBtn = document.createElement("button");
        prevBtn.id = 'prevBtn';
        let nextBtn = document.createElement("button");
        nextBtn.id = 'nextBtn';
        let nextClicked:boolean = false;

        let intervalSet:any;
    
         // next Click
    nextBtn.addEventListener("click", function() {
        nextClicked = true;
        sliderIndex = sliderIndex == sliderTotalCount - 1 ? 0 : sliderIndex + 1;
        sliderAction()
    });

    let prevSlide:number = -1;
    let nextSlide:number = -1;


    const sliderForm = () =>{
        let listElem = definedul.children;
        if(!ul || !ul.children || ul.children.length == 0){
            ul = document.createElement('ul');
            console.log(listElem);
            prevSlide = sliderTotalCount - 1;
            nextSlide = sliderIndex + 1;
            ul.setAttribute("style","width:"+width+"px");
             ul.append(definedul.children[2],definedul.children[0],definedul.children[1]);
        }
    }

        const sliderAction = () =>{
            prevSlide = sliderIndex > 0 ? sliderIndex - 1 : sliderTotalCount - 1;
            nextSlide = sliderIndex == sliderTotalCount - 1 ? 0 : sliderIndex + 1;
            let widthChange = nextClicked ? sliderData.customWidth * 2 : sliderData.customWidth;
            const transform = 'translateX(-'+widthChange+'px)';
            ul.style.transform = transform;
            ul.style.webkitTransform = transform;
            ul.style.msTransform = transform;
            ul.style.transition = "all 0.2s linear";

            
        }

        const buildSlider = (sliderList:any) =>{
            let sliders = JSON.parse(JSON.stringify(sliderList))
            definedul = document.createElement('ul')
            sliders.forEach((slider:any) => {
            var list = document.createElement('li');
            list.id = slider.id;
    
            let img = '<img src='+slider.imageUrl+'>';
            definedul.setAttribute("style","width:"+width+"px");
            list.innerHTML = `${img}<div class="captionBanner"><h3>${slider.caption}</h3><button>${slider.link}</button></div>`;    
            definedul.append(list)
        });
        sliderIndex = 0;
        sliderForm();
            sliderContainer.append(ul,prevBtn,nextBtn);
            sliderAction()
        }
    
        if(sliderContainer && sliderList && sliderList.length > 0){
            buildSlider(sliderList)
        }

    }