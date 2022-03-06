const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEL = document.getElementById('webstie-url');
const bookmarksContainer = document.getElementById('bookmarks-container');



//show modal -- focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}



//modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
//handle form
function storeNookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.ariaValueMax;
    let urlValue = websiteUrlEL.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    } else {
        
    }
}

//event listener
bookmarkForm.addEventListener('submit', storeNookmark)