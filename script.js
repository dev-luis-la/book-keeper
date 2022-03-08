const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEL = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bokmarks = [

];


//show modal -- focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

//modal event listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

//validate form
function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue  || !urlValue) {
        alert('please fill up fields');
        return false;
    }
   if (!urlValue.match(regex)) {
        alert('please provide url');
        return false;
    }   
    //valid
    return true;
}
//fetch items for localstorAAGE
function fetchBookmarks(){
    if (localStorage.getItem('bookmarks')) {
        bokmarks.JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        //create bookmark array in LOCAL storage
        bokmarks =[{
            name: 'Youtube',
            url: 'https://youtube.com'
        },];
        localStorage.setItem('bookmarks', JSON.stringify(bokmarks));
    }
}

//handle form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEL.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bokmarks.push(bookmark);
    localStorage.setItem('bokmarks', JSON.stringify(bokmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

//event listener
bookmarkForm.addEventListener('submit', storeBookmark);

//onload fetch
fetchBookmarks();