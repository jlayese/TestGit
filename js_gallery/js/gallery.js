let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
           let getElementCss = window.getComputedStyle(image);
           let getFullImageUrl = getElementCss.getPropertyValue("background-image");
           let getImageUrlPos = getFullImageUrl.split("/img/thumbs/");
           let setNewImageUrl = getImageUrlPos[1].replace('")','');
          // alert(setNewImageUrl);
          getLatestOpenedImg = index + 1;
          //container
          let container = document.body;
          let newImageWindow = document.createElement("div");
          container.appendChild(newImageWindow); //div will pop out in inspect element
          newImageWindow.setAttribute("class", "img-window");
          newImageWindow.setAttribute("onclick", "closeImg()");
          //insert Image
          let newImg = document.createElement("img");
          newImageWindow.appendChild(newImg);
          newImg.setAttribute("src", "img/"+setNewImageUrl);
          newImg.setAttribute("id", "current-img");
          
          //check the widht of image and if loaded
          newImg.onload = function(){
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

            let newNextBtn = document.createElement("a");
            let btnNextText = document.createTextNode("Next");
            newNextBtn.appendChild(btnNextText);
            container.appendChild (newNextBtn); 
            newNextBtn.setAttribute("class", "img-btn-next");
            newNextBtn.setAttribute("onclick", "changeImg(1)"); //going forward
            newNextBtn.style.cssText = "right: "+ calcImgToEdge +"px;";
            console.log("calcImgToEdge");
  
            let newPrevBtn = document.createElement("a");
            let btnPrevText = document.createTextNode("Prev");
            newPrevBtn.appendChild(btnPrevText);
            container.appendChild (newPrevBtn);
            newPrevBtn.setAttribute("class", "img-btn-prev");
            newPrevBtn.setAttribute("onclick", "changeImg(0)"); //going backward
            newPrevBtn.style.cssText = "left: "+ calcImgToEdge +"px;";

          }
        }
    });
}
function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();

}

function changeImg(changeDir){
    document.querySelector("#current-img").remove();
    
    let getImgWindow = document.querySelector(".img-window");
    newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }else if(changeDir === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute("src", "img/img"+ calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: "+ calcImgToEdge +"px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: "+ calcImgToEdge +"px;";
    }
}