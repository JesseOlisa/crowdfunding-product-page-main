//DECLARLE VARIABELS
const backProject = document.getElementById('back-project');
const backProjectModal = document.getElementById('back-project-modal');
const closeModal = document.querySelector('.close-modal');
const successModal = document.getElementById('success-modal');

const editionContainers = document.querySelectorAll('.container');
const modalContainer = document.querySelector('.modal-container');

const submitBtns = document.querySelectorAll('.submit-btn');
const progressbar = document.querySelector('.current-progress');
const successBtn = document.getElementById('success-btn');

//CLOSE MODAL IF CLICKED OUTSIDE THE MODAL CONTAINER
window.addEventListener('click', (e)=> {
    if(e.target.classList.contains('show-modal')) {
        backProjectModal.classList.remove('show-modal');
    }
});

//DISPLAY MODAL AND CLOSE MODAL
//adding add event listener to back project button

backProject.addEventListener('click', ()=> {
    backProjectModal.classList.add('show-modal');
});

closeModal.addEventListener('click', ()=> {
    backProjectModal.classList.remove('show-modal');
});

// DISPLAY INPUT SECTION TO INPUT AMOUNT 
//adding event listener to each container
editionContainers.forEach((container) => {
    container.addEventListener('click', ()=> {
        //adding green border to the container
        
        for (let i = 0; i< editionContainers.length; i++) {
          if(editionContainers[i].classList.contains('green-border')) {
              editionContainers[i].classList.remove('green-border')
          }
          else {
              container.classList.add('green-border');
          }
        }

        //set all pledge container to none after opening pledge
        let pledgeContainers = modalContainer.querySelectorAll('.pledge-container');
        for(let i=0; i< pledgeContainers.length; i++) {
            pledgeContainers[i].style.display = 'none';
            pledgeContainers[i].classList.remove('display-animation');
        }
        
        if(container.childElementCount == 2) {
            let selectedPledge = container.querySelector('.pledge-container');
            selectedPledge.style.display = 'flex';
            //for animation
            setTimeout(function() {
                selectedPledge.classList.add('display-animation')
            }, 20);
        }
        else {
            return
        }        
    });
});




//JAVASCRIPT FOR MODAL SUBMIT BUTTONS
submitBtns.forEach((buttons) => {
    buttons.addEventListener('click', ()=> {
        // //REDUCING THE REMAINING BACKERS BY 1 EACH TIME BUTTON IS CLICKED
        /****to get the remaining backer value exclusively to the button***/
        let remainingBackersContainer = buttons.parentElement.parentElement.previousElementSibling;
        let remainingBackers =remainingBackersContainer.querySelector('#remaining-backers');
        //reducing by 1
        let remainingBackersNum = toNumberFormat(remainingBackers.innerHTML);
        if(remainingBackersNum > 0) {
            remainingBackersNum -= 1;
            //adding back to html
            remainingBackers.innerHTML = remainingBackersNum;
        }
        if ((remainingBackersNum < 1)) {
            remainingBackersContainer.parentElement.classList.add('out-of-stock');
        }
        

        //update remaining backers in homepage
        let homeRemainingBackers = document.querySelectorAll('.remaining-home-backers');
        for(let i=0;i<homeRemainingBackers.length;i++) {
            if(homeRemainingBackers[i].id == "backers-left-bamboo" && buttons.id == "bamboo-btn") {
                homeRemainingBackers[i].innerHTML = remainingBackersNum;
            }
            if(homeRemainingBackers[i].id == 'backers-left-black' && buttons.id == "black-ed-btn") {
                homeRemainingBackers[i].innerHTML = remainingBackersNum;
            }
            if(homeRemainingBackers[i].id == 'backers-left-mahogamy' && buttons.id == 'mahogamy-btn') {
                homeRemainingBackers[i].innerHTML = remainingBackersNum;
            }
        }        
      
        //update total backers
        let totalBackers = document.getElementById('total-backers');
        totalBackersNum = toNumberFormat(totalBackers.innerHTML.replace(/,/g, ""));
        totalBackersNum += 1;
        //adding back html
        totalBackersNum = totalBackersNum.toLocaleString();
        totalBackers.innerHTML = totalBackersNum;

        // GET INPUT VALUES AND UPDATE THE TOTAL
        let amountPledge = buttons.previousElementSibling.querySelector('input[type=number]').value;
        let totalPledge = document.querySelector('.total-pledge-numbers');
        let totalPledgeNumber = totalPledge.innerHTML.substring(1).replace(/,/g, '');
        // convert both values to number
        amountPledge = toNumberFormat(amountPledge);
        totalPledgeNumber = toNumberFormat(totalPledgeNumber);
        if(totalPledgeNumber < 100000) {
            //add the values together
            totalPledgeNumber += amountPledge;
            //getting the progress percent to update progress bar and covert to string
            progresspercentage = ((totalPledgeNumber/100000) * 100).toFixed(2).toString();
            
            //converting back to string format
            totalPledgeNumber = totalPledgeNumber.toLocaleString();
            //updating values in html
            totalPledge.innerHTML = `$ ${totalPledgeNumber}`;
            //updatingprogressbar
            progressbar.style.width = `${progresspercentage}%`;

            //SHOW SUCCESS MODAL
            backProjectModal.classList.remove('show-modal');
            successModal.classList.add('show-modal');
        }
        else {
            backProjectModal.classList.remove('show-modal');
        }
    });
});


// REMOVES SUCCESS MODAL
successBtn.addEventListener('click', ()=>{
    successModal.classList.remove('show-modal');
});

//BOOKMARK SECTION EVENT LISTENER
const bookmarkContainer = document.querySelector('.bookmark-container');
const bookmarkSvg = bookmarkContainer.querySelector('svg'); 
const bookmarkParagraph = bookmarkContainer.querySelector('p'); 


bookmarkSvg.addEventListener('click', ()=>{
    if (bookmarkContainer.classList.contains('bookmarked')) {
        bookmarkContainer.classList.remove('bookmarked');
        bookmarkParagraph.innerHTML = 'Bookmark';
    }
    else {
        bookmarkContainer.classList.add('bookmarked');
        bookmarkParagraph.innerHTML = 'Bookmarked';
    }
    
});

//ADDING EVENTS TO HOMEPAGE SECTION BUTTONS
const aboutProjectContainer = document.querySelector('.about-project');
const homeButtons = aboutProjectContainer.querySelectorAll('.btn');

homeButtons.forEach((homeButton) => {
    homeButton.addEventListener('click', ()=> {
        backProjectModal.classList.add('show-modal');
        if(homeButton.id == 'bamboo-reward') {
            homePageButtonDisplay('bamboo-stand-modal');
        }
        if(homeButton.id == 'black-reward') {
            homePageButtonDisplay('black-edition-modal');
        }
        if(homeButton.id == 'mahogany-reward') {
            homePageButtonDisplay('mahogany-special-modal');
        }
    })
})



// FUNCTIONS
let toNumberFormat = (value)=>{
    return Number(value);
};

let toStringFormat = (value)=> {
    value = value.toString();
};

let homePageButtonDisplay = (idname)=> {
    let selectedModal = document.getElementById(idname);
    selectedModal.classList.add('green-border');
    selectedModal.querySelector('.pledge-container').style = `display:flex; opacity:1`;
    selectedModal.querySelector('input').setAttribute('checked', true);

};

