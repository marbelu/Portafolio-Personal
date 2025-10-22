; (function ($, undefined) {

$.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 400,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: 0          // offste (in px) for fixed top navigation
});
  
$(window).on("scroll",function () {
    const navbar = $('.navbar');
    if($(window).scrollTop() > 100){
        navbar.addClass("fixed");
    }
    else {
        navbar.removeClass("fixed");
    }
});

    
AOS.init();

const typed = new Typed('.typed', {
    stringsElement: '.typed-words',
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    loopCount: Infinity
});
    
$('.nav-link').on('click', function(e) {
   
    if ($('#navbarTop').hasClass('show')) {
        $('.navbar-toggler').trigger('click');
    } 
   
});

//   ProgressBar

const waypoint = new Waypoint({

    element: document.getElementsByClassName('skills'),
    handler: function(direction) {
      
      $('.skill-progress').each(function() {           
        $(this).animate({ width: $(this).attr('data-progress') + '%' }, { easing: 'linear' });
      });

      this.destroy()
    },
    offset: '55%'
  });

// Start counting

$('.statistics-number').counterUp({
    delay: 10,
    time: 1000
});

tns({
    container: '.testimonial-slider',
    items: 3,
    slideBy: 'page',
    autoplay: true,
    mouseDrag: true,
    gutter: 0,
    nav: true,
    controls: false,
    responsive: {
        0: {
            items: 1,
        },
        540: {
            items: 1,
        },
        768: {
            items: 1,
        },
        992: {
            items: 1,
        },
        1170: {
            items: 1,
        }
    }
});
    
// Handler Contact Form
    
$('#submit').on('click', function(e){
    e.preventDefault();

    const f_name = $('#name');
    const f_email = $('#email');
    const f_subject = $('#subject');
    const f_body = $('#message');

    if(validateInput($('#name')) && validateInput($('#email')) && email_test(f_email)  && validateInput($('#subject')) && validateInput($('#body'))) {
        
        $.ajax({
            
        url: 'sendmail.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            name: f_name.val(),
            email: f_email.val(),
            subject: f_subject.val(),
            body: f_body.val()
        },
        success: function(response) {
        
            alert ('Message sent successfully!');
        },
            error: function(error) {
                console.log(error);
        }
        });
    }
    else if(!email_test(f_email)) {
        alert('Please enter a correct email.');
    }
    else {
        alert('Please fill in the fields.');
    }
});
    
function validateInput(input) {
    if(input.val()=='') {
        input.css('border', '1px solid red');
        return false;
    }
    else {
        input.css('border', '');
        return true;
    }
}    
    
function email_test(input) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())){
        return true;
    }
    
    else {
        input.css('border', '1px solid red');
        return false;
    }
    }
    
// Preloader

$(window).on("load", function () {
    $(".preloader").fadeOut(300);
});

})(jQuery);