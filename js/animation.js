/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var days,hours,minutes;
function spin_time(tot_time)
{
    days=parseInt(tot_time/1440);
    hours=parseInt((tot_time-(days*(1440)))/60);
    minutes=tot_time-((days*(1440))+(hours*60));
    statsSpin('#third1',minutes, 1000);
      statsSpin('#second1',hours, 1000);
      statsSpin('#first1',days, 1000);
}

function statsSpin(IDofObject, stat, duration) {
  $({countNum: $(IDofObject).text()}).animate({countNum: stat}, {
    duration: duration,
    easing:'linear',
    step: function() {
      var num = padNumber(Math.floor(this.countNum));
      $(IDofObject).text(num);
    },
    complete: function() {
      $(IDofObject).text(padNumber(this.countNum));
    }

  });
};

function padNumber( num){
  return num < 10 ? '0'+num : num;
}
/*$(function(){
    $('html').keydown(function(e){
       console.log(len);
       if(e.which==40)
           console.log("down");
       else if(e.which==38)
           console.log("up");
    });
  $('html').keypress(function(e){
       $('#keypress_con').val(e.which);
  });
});
*/
$('div.lister').on('focus', 'li', function() {
    alert("jsdhgsjg");
    $this = $(this);
    alert("gsdfhg");
    /*$this.addClass('active').siblings().removeClass();
    $this.closest('div.container').scrollTop($this.index() * $this.outerHeight());*/
}).on('keydown', 'li', function(e) {
        $this = $(this);
    if (e.keyCode === 40) {        
        $this.next().focus();
        alert("down");
        return false;
    } else if (e.keyCode === 38) {        
        $this.prev().focus();
        alert("up");
        return false;
    }
}).find('li').first().focus();