let generatedSentence = document.getElementById('generatedSentence');
let generatedSentence_nl = document.getElementById('generatedSentence_nl');
let language = document.getElementById("language");
let rS_EN = "";
function get_random(list) {
  return list[Math.floor((Math.random() * list.length))];
}
function startGenerate() {
  let a1 = get_random(a);
  let s1 = get_random(s);
  let v1 = get_random(v);
  let a2 = get_random(a);
  let s2 = get_random(s);
  let k1 = get_random(k);
  let u1 = get_random(u);
  rS_EN = `A ${a1} ${s1} ${v1}s a ${a2} ${s2}, in style of a ${k1} of ${u1}.`;
  generatedSentence_nl.style.display = "none";
  generatedSentence.innerHTML = rS_EN;
  generatedSentence.style.display = "block";
  doTranslate();

}

function doTranslate()
{
  generatedSentence.style.display = "block";
  let content = rS_EN;
  if(content.length > 0){
    let sourceLang = 'en';
    let targetLang = language.value;
    if(targetLang != "en")
    {
      let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(rS_EN);
      let request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {

          var data = JSON.parse(request.responseText);
          generatedSentence.style.display = "none";
          generatedSentence_nl.innerHTML = data[0][0][0];
          generatedSentence_nl.style.display = "block";
        } else {
          generatedSentence_nl.innerHTML = "Server returned an error!";
        }
      };
      request.onerror = function() {
        generatedSentence_nl.innerHTML = "Connection lost!";
      };
      request.send();
    }else {
      generatedSentence_nl.innerHTML = "";
    }
  }
}
