var myLibrary = [];
var curr = 1;
var currArr = [];

function Book(title, author, year, read){
    this.title = title;
    this.author = author;
    this.year = year
    this.read = read;
}

if ((JSON.parse(localStorage.getItem("Array"))) == null){
    myLibrary[0] = new Book("The Great Gatsby", "F. Scott Fitzgerald", "1925", true);
    myLibrary[1] = new Book("Wuthering Heights", "Emily Bronte", "1847", true);
    myLibrary[2] = new Book("Little Women", "Louisa May Alcott", "1868", false);
    myLibrary[3] = new Book("Jane Eyre", "Charlotte Bronte", "1847", true);
    myLibrary[4] = new Book("Nineteen Eighty-Four", "George Orwell", "1949", true);
    myLibrary[5] = new Book("Pride and Prejudice", "Jane Austen", "1813", true);
    myLibrary[6] = new Book("Brave New World", "Aldous Huxley", "1932", false);
    myLibrary[7] = new Book("Frankenstein", "Mary Shelley", "1818", false);
    localStorage.setItem("Array", JSON.stringify(myLibrary));
}

var display = () => {
    currArr = JSON.parse(localStorage.getItem("Array"));
    for (var i = 0; i < currArr.length; i++){
        var bookT = document.createElement("div");
        bookT.classList.add("card-header");
        bookT.innerHTML = currArr[i].title;
        var close = document.createElement("button");
        close.classList.add("close");
        close.setAttribute("id", "b" + i)
        close.addEventListener("click", (e) => {
            var index = e.target.id;
            var index = Number(index.substring(1));
            currArr.splice(index, 1);
            localStorage.setItem("Array", JSON.stringify(currArr));
            empty();
            display();
        });
        close.innerHTML = "&times;";
        bookT.appendChild(close);
        var para = document.createElement("p");
        para.innerHTML = "<br>"+currArr[i].author+"<br><br>"+currArr[i].year;
        para.classList.add("card-text");
        var box = document.createElement("input");
        box.classList.add("form-check-input", "ml-1");
        box.setAttribute("type","checkbox");
        box.checked = currArr[i].read;
        var para1 = document.createElement("p");
        para1.innerHTML = "Read";
        para1.classList.add("ml-4");
        var div = document.createElement("div");
        div.classList.add("card-body");
        div.appendChild(bookT);
        div.appendChild(para);
        div.appendChild(box);
        div.appendChild(para1);
        var div1 = document.createElement("div");
        div1.classList.add("card", "back", "col-3");
        div1.appendChild(div);
        if ((i % 4 == 0) && (i > 0)){
            curr++;
            var newItem = document.createElement("div");
            var numb = "no"+curr;
            newItem.classList.add("carousel-item", numb, "go");
            var deck = document.createElement("div");
            deck.classList.add("card-deck", "row", "go");
            var indicator = document.createElement("li");
            indicator.setAttribute("data-target", "#slideShow");
            indicator.setAttribute("data-slide-to", curr - 1);
            indicator.classList.add("go");
            var indicatorGroup = document.querySelector(".carousel-indicators");
            indicatorGroup.appendChild(indicator);
            newItem.appendChild(deck);
            var inner = document.querySelector(".carousel-inner");
            inner.appendChild(newItem);
        }
        else{
            var currentItem = document.querySelector(".no" + curr)
            var deck = currentItem.firstElementChild;
        }
        deck.appendChild(div1);
    }
}

var empty = () => {
    var stay  = document.querySelector(".stay");
    stay.innerHTML = "";
    var go = document.querySelectorAll(".go");
    for (var i = 0; i < go.length; i++) {
        go[i].remove();
      }
    curr = 1;
    var active = document.querySelector(".no1");
    active.classList.add("active");
    var active1 = document.querySelector("#liA");
    active1.classList.add("active");
}

var button = document.querySelector("#submit");
button.addEventListener("click", () => {
    currArr[currArr.length] = new Book(document.forms["form"]["title"].value, document.forms["form"]["author"].value,
    document.forms["form"]["year"].value, document.forms["form"]["check"].checked);
    localStorage.setItem("Array", JSON.stringify(currArr));
    empty();
    display();
    document.forms["form"]["title"].value = "";
    document.forms["form"]["author"].value = "";
    document.forms["form"]["year"].value = "";
    document.forms["form"]["check"].checked = false;
});

var buttonModal = document.getElementById("modalClose");
buttonModal.addEventListener("click", () => {
    document.forms["form"]["title"].value = "";
    document.forms["form"]["author"].value = "";
    document.forms["form"]["year"].value = "";
    document.forms["form"]["check"].checked = false;
});

display();