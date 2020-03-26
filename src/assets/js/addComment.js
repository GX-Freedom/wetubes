import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
};

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if (response.status === 200) {
        addComment(comment);
    }
};

const handleSubmit = event => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};
let n = 0;
const deletecomment = async (comment) => {
    // console.log(conmet_btn.parentNode.firstChild)
    const videoId = window.location.href.split("/videos/")[1];
    // console.log(videoId)
    console.log(n);
    const response = await axios({
        url: `/api/${videoId}/comments`,
        method: "POST",
        data: {
            comment
        }
    });
    if (response.status === 200) {
        conmet_btn[n].parentNode.remove();
    }
    conmet_btn[n].parentNode.remove();
}

const init = async () => {
    addCommentForm.addEventListener("submit", handleSubmit);
    const conmet_btn = await document.querySelectorAll(".conmet_btn");
    if (conmet_btn.length > 0) {
        let i = 0;
        while (i < conmet_btn.length) {
            conmet_btn[i].addEventListener("click", (e) => {
                console.log(e.target.parentNode.firstChild);
                let x = e.target.parentNode.firstChild;
                deletecomment(x)
                n = i;
            })
            i++;
        }
    }
}

if (addCommentForm) {
    init();
}