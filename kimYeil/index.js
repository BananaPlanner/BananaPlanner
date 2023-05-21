function resize() {
  // let textArea = document.getElementById("textForm");
  // while(textArea.clientHeight < textArea.scrollHeight){
  //   textArea.rows = textArea.rows+1;
  // }
 
  // textArea.style.height = "0px";
 
  // let scrollHeight = textArea.scrollHeight;
  // let style = window.getComputedStyle(textArea);
  // let borderTop = parseInt(style.borderTop);
  // let borderBottom = parseInt(style.borderBottom);
 
  // textArea.style.height = (scrollHeight + borderTop + borderBottom)+"px";
}

function checkLength() {
  // var textarea = document.getElementById('textForm');
  // var lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
  // console.log(textarea.style.height);
  // textarea.style.height = '1px';
  // textarea.maxLength = 200;

  // var changeHeight = textarea.scrollHeight;
  // console.log("체인지: "+changeHeight);
  // if(changeHeight>410) {
  //   var preLength = textarea.value.length;
  //   // alert("최대 글자수: "+ preLength);
  //   textarea.maxLength = preLength-1;
  //   // textarea.attr('maxLenght')
  //   console.log("410초과");
  // } else {
  //   textarea.style.height = changeHeight+ 'px';
  // }

  // console.log(textarea.style.height);

  // var textarea = document.getElementById('textForm');
  // var lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
  // var maxHeight = lineHeight * 13;

  // console.log(textarea.clientHeight)
  
  // while (textarea.clientHeight > maxHeight) {
    // textarea.value = textarea.value.slice(0, -1); // 입력 제한
  // }
}

function saveDiary() {
  const textarea = document.getElementById('textForm')
  const content = textarea.value;
  console.log(content);
  alert("저장되었습니다. "+content)
}
// window.onload = resize
// window.onresize = resize;
