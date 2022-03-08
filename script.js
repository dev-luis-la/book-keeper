const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEL = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmark-container');

let bookmarks = [];
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
//build bookmarks
function buildBookmarks(){
    //remove deleted bookmarks
    bookmarksContainer.textContent =  '';
    //build items
    bookmarks.forEach((bookmark) => {
        const{ name, url} = bookmark;
        //items
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('tite', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        //favicon/link containert
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        //link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //append to bookmarks container
        linkInfo.append(link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });

}
//fetch items for localstorAAGE
function fetchBookmarks(){
    if (localStorage.getItem('bookmarks')) {
        bookmarks  = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        //create bookmark array in LOCAL storage
        bookmarks =[{
            name: 'Youtube',
            url: 'https://youtube.com'
        },];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}
//delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1,);
        }
    });
    //update bookmark array in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
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
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}
//event listener
bookmarkForm.addEventListener('submit', storeBookmark);
//onload fetch
fetchBookmarks();