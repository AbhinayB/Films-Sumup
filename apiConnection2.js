var indent_k;
var predrop='url(backdrop.jpg)';
var movielist = [];


$(function(){
   if(!localStorage.getItem("listofpre_movies"))
   {
      localStorage.setItem("listofpre_movies", JSON.stringify(movielist));
   }
   else
   {
       var retrievedData = localStorage.getItem("listofpre_movies");
       movielist = JSON.parse(retrievedData);
       for (var i = 0; i < movielist.length; i++) {
            previous_data(movielist[i]);
      }
   }
});
$.ajax({
  url: "library_js509.json",
  dataType: 'json',
  async: false,
  success: function(data) {
    indent_k=data.key_ssd;
  }
});
  function createNode(element) {
    return document.createElement(element); 
  }
  
  var h = $(window).height();
  $('.glass2').css('height', h);
$(window).resize(function(){
  var w = $(window).height();
     $('.glass2').css('height', w);
 });


var tot_time=0;
function autoDrop()
{
    var text=document.getElementById('mvl').value;
    var url="https://api.themoviedb.org/3/search/movie?api_key="+indent_k+"&language=en-US&query="+text+"&page=1&include_adult=false";
    var list = document.getElementsByClassName("lister_list")[0];
    list.innerHTML="";
    var max_element=0;
fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            movies=data.results;
    return movies.map(function(movie) {  
        if(max_element<5){
      let logo=createNode('img');
      if(movie.poster_path!=null)
          logo.src="https://image.tmdb.org/t/p/w45/"+movie.poster_path;
      else
          logo.src="icon.jpeg";
      logo.style.width='7%';
      logo.style.width='46px';
      let l = createNode('li');
          l.id=movie.id;
          l.textContent='  '+movie.original_title;
          l.insertBefore(logo, l.childNodes[0]); 
          max_element+=1;
      list.appendChild(l); 
        }
    });
        });
}

function previous_data(id_img)
{
    var poster="https://api.themoviedb.org/3/movie/"+id_img+"?api_key="+indent_k;
    var lst=document.getElementById('movid');
    fetch(poster)
        .then((resp) => resp.json())
        .then(function(data) {
      let dv  = createNode('div');
          dv.style.width='140px';
          dv.style.display='inline-block';
          //title":"Industrial Symphony No. 1: The Dream of the Brokenhearted","video":false,"vote_average":5.7,"vote_count":9
      let spm = createNode('spam');
          spm.innerHTML="<p>Title:"+data.title+"</p>Rating:"+data.vote_average+"</p><p>Ratings:"+data.vote_count+"</p>";
      let cls=createNode('img');
          cls.style.width='25px';
          cls.style.height='25px';
          cls.id=data.runtime;
          cls.src="closebutton.png";
          cls.alt=id_img;
          spm.appendChild(cls);
          dv.appendChild(spm);
      let img = createNode('img');
          img.style.width='135px';
          img.style.height='205px';
          dv.appendChild(img);
          if(data.poster_path!=null)
          {
          img.src="https://image.tmdb.org/t/p/w185/"+data.poster_path; 
          img.addEventListener('load', function() { 
              $(dv).hide().appendTo(lst).fadeIn(4000);
          }, false);
      }else{
          img.src="movie.png";
          img.addEventListener('load', function() { 
              $(dv).hide().appendTo(lst).fadeIn(4000);
          }, false);
      }
      if(data.backdrop_path!=null)
          {
          var bpimg="url(https://image.tmdb.org/t/p/w1280//"+data.backdrop_path+")";
          predrop=bpimg;
          $('.glass2').css('background-image',bpimg);
      }else{
          $('.glass2').css('background-image',predrop);
      }
      if(data.runtime!=null)
      {
      tot_time=tot_time+parseInt(data.runtime);
      spin_time(tot_time);
  }
    })
        .catch(function(error) {
        alert(error);
        });
}
function adder(id_img)
{
    var poster="https://api.themoviedb.org/3/movie/"+id_img+"?api_key="+indent_k;
    var lst=document.getElementById('movid');
    fetch(poster)
        .then((resp) => resp.json())
        .then(function(data) {
      let dv  = createNode('div');
          dv.style.width='140px';
          dv.style.display='inline-block';
          //title":"Industrial Symphony No. 1: The Dream of the Brokenhearted","video":false,"vote_average":5.7,"vote_count":9
      let spm = createNode('spam');
          spm.innerHTML="<p>Title:"+data.title+"</p>Rating:"+data.vote_average+"</p><p>Ratings:"+data.vote_count+"</p>";
      let cls=createNode('img');
          cls.style.width='25px';
          cls.style.height='25px';
          cls.id=data.runtime;
          cls.alt=id_img;
          cls.src="closebutton.png";
          spm.appendChild(cls);
          dv.appendChild(spm);
      let img = createNode('img');
          img.style.width='135px';
          img.style.height='205px';
          dv.appendChild(img);
          if(data.poster_path!=null)
          {
          img.src="https://image.tmdb.org/t/p/w185/"+data.poster_path; 
          img.addEventListener('load', function() { 
              $(dv).hide().appendTo(lst).fadeIn(4000);
          }, false);
      }else{
          img.src="movie.png";
          img.addEventListener('load', function() { 
              $(dv).hide().appendTo(lst).fadeIn(4000);
          }, false);
      }
      if(data.backdrop_path!=null)
          {
          var bpimg="url(https://image.tmdb.org/t/p/w1280//"+data.backdrop_path+")";
          predrop=bpimg;
          $('.glass2').css('background-image',bpimg);
      }else{
          $('.glass2').css('background-image',predrop);
      }
      if(data.runtime!=null)
      {
      tot_time=tot_time+parseInt(data.runtime);
      spin_time(tot_time);
  }
  if(movielist.indexOf(id_img)==-1)
  {
      movielist.push(id_img);
      localStorage.setItem("listofpre_movies", JSON.stringify(movielist));
  }
    })
        .catch(function(error) {
        alert(error);
        });
}


$("#movid").on("click", "spam img", function (event) {
    $(this).parent('spam').parent('div').fadeOut(700,function(){
        $(this).parent('spam').parent('div').remove();
    });
    var index_curr=movielist.indexOf(this.alt);
    if(index_curr!=-1)
    {
    movielist.splice(index_curr, 1);
    localStorage.setItem("listofpre_movies", JSON.stringify(movielist));
    if(this.id!=null)
    {
    tot_time=tot_time-parseInt(this.id);
    spin_time(tot_time);
    }
    }
});

$(".lister_list").on("click", "li", function (event) {
    document.getElementById("mvl").value=this.textContent;
    var id_selected=this.id;
    var list = document.getElementsByClassName("lister_list")[0];
    list.innerHTML="";
    adder(id_selected);
});


$(".lister_list").on("mouseover", "li", function (event) {
    this.style.backgroundColor="rgba(255,255,255,0.8)";
});
$(".lister_list").on("mouseout", "li", function (event) {
    this.style.backgroundColor="rgba(255,255,255,0.5)";
});
