$(function() {
    $('.category-menu').smartmenus({
        showOnClick: true,
        noMouseOver: true,
        subIndicatorsPos: 'append',
        subIndicatorsText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
        subMenusMinWidth: '300px',
        mainMenuSubOffsetX: -5,
        mainMenuSubOffsetY: 5,
        subMenusSubOffsetX: -12,
        subMenusSubOffsetY: -5,
        keepInViewport: true,
    });

    $('.category-menu > li > a > span.sub-arrow').html('<i class="fa fa-angle-down" aria-hidden="true"></i>')
});

$(document).ready(function () {
    $("#search-icon").click(function() {
        $(".combobox-container").toggle();
        if($(".combobox-container").is(":visible")) {
            $("#place-search").focus();
        }
    });

    $('#wfb-banner button.search').click(function() {
        $("#search-dropdown-container").slideToggle('slow');
    });

    $('.category-menu .has-submenu').click(function(event) {
      var $category = $($(this).attr('href'));
      if (!$category.find('.plus').hasClass('minus')) {
        $category.find('.plus').click();
      }
    });

    $('.ln-letters a').click(function(event) {
      $('.ln-letters .ln-selected').removeClass('ln-selected');
      $('.alpha').html($(this).html());
      if ($(this).html() == 'ALL') {
        $('.appendix-entry').show();
      }
      else {
        $('.appendix-entry').hide();
        $('.ln-' + $(this).html().toLowerCase()).show();
      }
      $(this).addClass('ln-selected');
    });

    $('.photo-thumbnail').click(function(event) {
      var item = $(this).data("photo");
      $('.carousel-inner .item').removeClass('active');
      $('#' + item).addClass('active');
    });

    $('.label-links a').click(function(event) {
      var group = $(this).data('group');
      var label = $(this).data('label');
      var count = $(this).data('count');
      $('.carousel-thumbnails .photo-thumbnail').hide();
      $('.carousel-thumbnails .' + label).show();
      $('.label-links .' + group + '_dark').addClass(group + '_med').removeClass(group + '_dark');
      $(this).addClass(group + '_dark').removeClass(group + '_med');
      $('.carousel-inner .item').addClass('hidden').removeClass('item');
      $('.carousel-inner .' + label).addClass('item').removeClass('hidden');
      $('.carousel-inner .' + label + ' .galleria-total').html(count);
      $('.carousel-thumbnails .' + label)[0].click();
      $('.carousel-inner .' + label + ' .galleria-current').each(function(index, item) {
        $(this).html(index + 1);
      });;
    });

    $('.field-definition .read-more').click(function(event) {
      event.preventDefault();
      $('.less-text').hide();
      $('.more-text').slideDown('slow');
    });

    $('.field-definition .read-less').click(function(event) {
      event.preventDefault();
      $('.more-text').slideUp();
      $('.less-text').show();
      window.scrollTo(0,0);
    });

    $('.region_selector').change(function(event) {
      var region = $(".region_selector option:selected").data("region");
      $('.rankorder').hide();
      $('.' + region).show();
    });
});

var currentDate = function() {
  var now = new Date();
  var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  var montharray=new Array("January","February","March","April","May","June","July","August",
                           "September","October","November","December");
  return (dayarray[now.getDay()] + ", " + montharray[now.getMonth()] + " " + now.getDate());
}
